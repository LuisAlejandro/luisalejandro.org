import * as yup from "yup";
import Cryptr from "cryptr";
import { createBucketClient } from "@cosmicjs/sdk";
import { isSchemaValid, compare, verify } from "@lib/utils";

const BUCKET_SLUG =
  process.env.GYMCONTROL_COSMIC_BUCKET_SLUG || "gymcontrol-production";
const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;
const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;
const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;

export default async function getLicense(req, res) {
  const schema = yup
    .object({
      key: yup.string().required(),
    })
    .required();

  const key = req.body.key;
  const token = req.headers.authorization;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Missing authorization header" });
  }
  if (!isSchemaValid(schema, req.body)) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const decodedToken = await verify(token, ACTIVATION_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized: token" });
  }

  const cosmic = createBucketClient({
    bucketSlug: BUCKET_SLUG,
    readKey: READ_KEY,
  });

  const data = await cosmic.objects
    .find({
      type: "licenses",
      slug: decodedToken.username,
    })
    .props([
      "id",
      "slug",
      "title",
      "metadata.activation-key",
      "metadata.password",
      "created_at",
    ])
    .sort("-created_at");

  if (data.objects.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const storedPassword = data.objects[0].metadata.password;
  const username = data.objects[0].slug;

  const isValidPassword = await compare(decodedToken.password, storedPassword);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Unauthorized: password" });
  }

  if (
    decodedToken.salt === ACTIVATION_SALT &&
    decodedToken.username === username
  ) {
    const cryptr = new Cryptr(ACTIVATION_SECRET);
    const decodedKey = await verify(cryptr.decrypt(key), ACTIVATION_SALT);
    if (!decodedKey) {
      return res.status(401).json({ message: "Unauthorized: key" });
    }
    return res.status(200).json({
      type: decodedKey.type,
      name: decodedKey.name,
      expiration: decodedKey.expiration,
    });
  }
  return res.status(401).json({ message: "Unauthorized: salt" });
}
