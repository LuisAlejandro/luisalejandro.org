import Cryptr from "cryptr";
import jwt from "jsonwebtoken";

/**
 * Legacy key conversion (KTD13).
 *
 * Pre-WMK1 keys were a Cryptr-encrypted JWT carrying {type, name, expiration}. They are read-only
 * here: a legacy key is converted into a new-format license record and re-signed, never trusted for
 * a new entitlement directly.
 */

export type LegacyKeyPayload = {
  type: string;
  name: string;
  expiration: string;
};

/** decodeLegacyKey unwraps a legacy key. Returns null when it is not a readable legacy artifact. */
export function decodeLegacyKey(key: string): LegacyKeyPayload | null {
  const secret = process.env.WHOLMASTER_ACTIVATION_SECRET;
  const salt = process.env.WHOLMASTER_ACTIVATION_SALT;
  if (!secret || !salt) return null;

  let decoded: unknown;
  try {
    const cryptr = new Cryptr(secret);
    const inner = cryptr.decrypt(key);
    decoded = jwt.verify(inner, salt);
  } catch {
    return null;
  }
  if (!decoded || typeof decoded !== "object") return null;
  const payload = decoded as Record<string, unknown>;
  return {
    type: typeof payload.type === "string" ? payload.type : "",
    name: typeof payload.name === "string" ? payload.name : "",
    expiration:
      typeof payload.expiration === "string" ? payload.expiration : "",
  };
}

/** isLegacyPremium reports whether a legacy key granted premium at all. */
export function isLegacyPremium(payload: LegacyKeyPayload): boolean {
  return payload.type === "premium";
}
