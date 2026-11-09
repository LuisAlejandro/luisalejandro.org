import crypto from "crypto";

import { createBucketClient } from "@cosmicjs/sdk";

import {
  fingerprintMatch,
  signCertificate,
  type CertificatePayload,
} from "./license";

/**
 * Seat accounting for Wholmaster licenses, stored on Cosmic `licenses` objects.
 *
 * ponytail: seat assignment is read-modify-write on a single JSON list, so two simultaneous
 * activations can lose one write. That is a known ceiling; the upgrade path is a store with
 * conditional writes. The U5 concurrency gate must pass before this ships to customers.
 */

export const RELEASE_LIMIT_PER_YEAR = 2;
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export type Activation = {
  fp: string[];
  secretHash: string;
  label: string;
  at: number;
  seat: number;
};

export type LicenseRecord = {
  id: string;
  lid: string;
  tier: string;
  seats: number;
  maxMajor: number;
  status: string;
  licensedTo: string;
  activations: Activation[];
  releases: number[];
};

function client(write: boolean) {
  const readKey = process.env.WHOLMASTER_COSMIC_READ_KEY || "";
  const writeKey = process.env.WHOLMASTER_COSMIC_WRITE_KEY || "";
  return createBucketClient({
    bucketSlug: process.env.WHOLMASTER_COSMIC_BUCKET_SLUG || "",
    readKey,
    writeKey: write ? writeKey : "",
  });
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || value.trim() === "") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** findLicenseByLid loads the license record that owns this license id. */
export async function findLicenseByLid(
  lid: string
): Promise<LicenseRecord | null> {
  const cosmic = client(false);
  const data = await cosmic.objects
    .find({ type: "licenses", "metadata.license-id": lid })
    .props(["id", "slug", "title", "metadata"])
    .limit(1);

  const object = data.objects?.[0];
  if (!object) return null;
  return toRecord(object);
}

/** findLicenseBySlug loads the legacy record by the customer's username. */
export async function findLicenseBySlug(
  slug: string
): Promise<LicenseRecord | null> {
  const cosmic = client(false);
  const data = await cosmic.objects
    .find({ type: "licenses", slug })
    .props(["id", "slug", "title", "metadata"])
    .limit(1);

  const object = data.objects?.[0];
  if (!object) return null;
  return toRecord(object);
}

function toRecord(object: any): LicenseRecord {
  const meta = object.metadata ?? {};
  return {
    id: object.id,
    lid: meta["license-id"] ?? "",
    tier: meta["tier"] ?? "gym",
    seats: Number(meta["seats"] ?? 2),
    maxMajor: Number(meta["max-major"] ?? 1),
    status: meta["status"] ?? "active",
    licensedTo: meta["licensed-to"] ?? object.title ?? "",
    activations: parseJson<Activation[]>(meta["activations"], []),
    releases: parseJson<number[]>(meta["releases"], []),
  };
}

/** writeLicense persists the mutable parts of a license record. */
export async function writeLicense(
  objectId: string,
  record: LicenseRecord
): Promise<void> {
  const cosmic = client(true);
  await cosmic.objects.updateOne(objectId, {
    metadata: {
      "license-id": record.lid,
      tier: record.tier,
      seats: record.seats,
      "max-major": record.maxMajor,
      status: record.status,
      "licensed-to": record.licensedTo,
      activations: JSON.stringify(record.activations),
      releases: JSON.stringify(record.releases),
    },
  });
}

export type ActivateOutcome =
  | { ok: true; certificate: string; seat: number; record: LicenseRecord }
  | { ok: false; code: string; status: number; used?: number; seats?: number };

export type ActivateInput = {
  record: LicenseRecord;
  lid: string;
  kid: string;
  fp: string[];
  label: string;
  secret: string;
  privateKey: any;
};

/**
 * activate grants a seat for this machine. Re-activating a machine that already holds a seat is
 * idempotent and consumes nothing, so a reinstall costs no seat when the fingerprint still matches.
 */
export async function activate(input: ActivateInput): Promise<ActivateOutcome> {
  const { record } = input;
  if (record.status !== "active") {
    return { ok: false, code: "not_active", status: 409 };
  }

  const existing = record.activations.find((a) =>
    fingerprintMatch(a.fp, input.fp)
  );
  const seat =
    existing?.seat ??
    (record.activations.length < record.seats
      ? record.activations.length + 1
      : null);

  if (seat === null) {
    return {
      ok: false,
      code: "seats_exhausted",
      status: 409,
      used: record.activations.length,
      seats: record.seats,
    };
  }

  if (!existing) {
    record.activations.push({
      fp: input.fp,
      secretHash: hashSecret(input.secret),
      label: input.label,
      at: Date.now(),
      seat,
    });
    await writeLicense(record.id, record);
  }

  const payload: CertificatePayload = {
    kid: input.kid,
    lid: input.lid,
    fp: input.fp,
    seat,
    iat: Date.now(),
  };
  return {
    ok: true,
    certificate: signCertificate(payload, input.privateKey),
    seat,
    record,
  };
}

export type DeactivateOutcome =
  | { ok: true; record: LicenseRecord }
  | { ok: false; code: string; status: number };

/** deactivate frees one seat, rate-limited per license, and requires that seat's install secret. */
export async function deactivate(
  record: LicenseRecord,
  fp: string[],
  secret: string
): Promise<DeactivateOutcome> {
  const index = record.activations.findIndex((a) => fingerprintMatch(a.fp, fp));
  if (index === -1) {
    return { ok: false, code: "not_activated", status: 404 };
  }
  if (record.activations[index].secretHash !== hashSecret(secret)) {
    return { ok: false, code: "invalid_secret", status: 401 };
  }
  const now = Date.now();
  const recent = record.releases.filter((at) => now - at < YEAR_MS);
  if (recent.length >= RELEASE_LIMIT_PER_YEAR) {
    return { ok: false, code: "release_limit_reached", status: 429 };
  }
  record.activations.splice(index, 1);
  record.releases = [...recent, now];
  await writeLicense(record.id, record);
  return { ok: true, record };
}

export function hashSecret(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}
