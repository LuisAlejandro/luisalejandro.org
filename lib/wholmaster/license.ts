import crypto from "crypto";

/**
 * Wholmaster license artifacts.
 *
 * A key and a certificate share one encoding:
 *   <PREFIX>.<base64url payload>.<base64url ed25519 signature>
 * where the signature covers "<PREFIX>.<payload>". The prefix is inside the signature, so a key can
 * never verify as a certificate. This must stay byte-identical to the desktop verifier in
 * wholmaster `src/backend/internal/license/artifact.go`.
 */

export const KEY_PREFIX = "WMK1";
export const CERT_PREFIX = "WMC1";

export type LicenseKeyPayload = {
  kid: string;
  lid: string;
  tier: string;
  seats: number;
  mm: number;
  to: string;
};

export type CertificatePayload = {
  kid: string;
  lid: string;
  fp: string[];
  seat: number;
  iat: number;
};

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

/** signingKey reads the private key from the server environment. Never a NEXT_PUBLIC_ value. */
export function signingKey(): { kid: string; privateKey: crypto.KeyObject } {
  const kid = process.env.WHOLMASTER_LICENSE_KID;
  const raw = process.env.WHOLMASTER_LICENSE_SIGNING_KEY;
  if (!kid || !raw) {
    throw new Error("Wholmaster license signing is not configured");
  }
  const privateKey = crypto.createPrivateKey({
    key: Buffer.from(raw, "base64"),
    format: "der",
    type: "pkcs8",
  });
  return { kid, privateKey };
}

/** publicKeyOf derives the public key from a private key, for the desktop's embedded verifier. */
export function publicKeyOf(privateKey: crypto.KeyObject): string {
  const der = crypto
    .createPublicKey(privateKey)
    .export({ format: "der", type: "spki" });
  return Buffer.from(der).toString("base64");
}

export function signArtifact(
  prefix: string,
  payload: unknown,
  privateKey: crypto.KeyObject
): string {
  const body =
    prefix + "." + base64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const signature = crypto.sign(null, Buffer.from(body, "utf8"), privateKey);
  return body + "." + base64url(signature);
}

export function signLicenseKey(
  payload: LicenseKeyPayload,
  privateKey: crypto.KeyObject
): string {
  return signArtifact(KEY_PREFIX, payload, privateKey);
}

export function signCertificate(
  payload: CertificatePayload,
  privateKey: crypto.KeyObject
): string {
  return signArtifact(CERT_PREFIX, payload, privateKey);
}

/** verifyArtifact checks the shape, the prefix and the signature, then decodes the payload. */
export function verifyArtifact<T>(
  prefix: string,
  artifact: string,
  publicKey: crypto.KeyObject
): T | null {
  const parts = artifact.split(".");
  if (parts.length !== 3 || parts[0] !== prefix) return null;
  let ok = false;
  try {
    ok = crypto.verify(
      null,
      Buffer.from(parts[0] + "." + parts[1], "utf8"),
      publicKey,
      fromBase64url(parts[2])
    );
  } catch {
    return null;
  }
  if (!ok) return null;
  try {
    return JSON.parse(fromBase64url(parts[1]).toString("utf8")) as T;
  } catch {
    return null;
  }
}

export function verifyLicenseKey(
  artifact: string,
  publicKey: crypto.KeyObject
): LicenseKeyPayload | null {
  const payload = verifyArtifact<LicenseKeyPayload>(
    KEY_PREFIX,
    artifact,
    publicKey
  );
  if (!payload || typeof payload.lid !== "string") return null;
  return payload;
}

/** fingerprintMatch applies the desktop rule: a majority of the stored hashes, at least two stored. */
export function fingerprintMatch(
  stored: string[] | undefined,
  local: string[] | undefined
): boolean {
  if (!Array.isArray(stored) || stored.length < 2) return false;
  if (!Array.isArray(local)) return false;
  const present = new Set(local);
  let matched = 0;
  for (const hash of stored) {
    if (present.has(hash)) matched++;
  }
  return matched * 2 > stored.length;
}
