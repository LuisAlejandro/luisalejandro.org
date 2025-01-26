import * as yup from "yup";
import jwt from "jsonwebtoken";
import { createBucketClient } from "@cosmicjs/sdk";
import { isAuthorizationValid, isSchemaValid, compare } from "@lib/utils";

const BUCKET_SLUG =
  process.env.GYMCONTROL_COSMIC_BUCKET_SLUG || "gymcontrol-production";
const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;
const WRITE_KEY = process.env.GYMCONTROL_COSMIC_WRITE_KEY;
const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;
const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;

export default async function getToken(req, res) {
  const schema = yup
    .object({
      user: yup.string().required(),
      password: yup.string().required(),
      identifier: yup.string().required(),
    })
    .required();

  const slug = req.body.user;
  const password = req.body.password;
  const identifier = req.body.identifier;

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
  if (!isAuthorizationValid(req.headers.authorization, req.body)) {
    return res.status(401).json({ error: "Invalid authorization" });
  }

  const cosmic = createBucketClient({
    bucketSlug: BUCKET_SLUG,
    readKey: READ_KEY,
    writeKey: WRITE_KEY,
  });

  const data = await cosmic.objects
    .find({
      type: "licenses",
      slug,
    })
    .props([
      "id",
      "slug",
      "title",
      "metadata.activation-key",
      "metadata.password",
      "metadata.identifier",
      "created_at",
    ])
    .sort("-created_at");

  if (data.objects.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const username = data.objects[0].slug;
  const entryId = data.objects[0].id;
  const storedPassword = data.objects[0].metadata.password;
  const storedIdentifier = data.objects[0].metadata.identifier;

  const isValidPassword = await compare(password, storedPassword);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Unauthorized: password" });
  }

  if (!storedIdentifier) {
    await cosmic.objects.updateOne(entryId, {
      metadata: {
        ...data.objects[0].metadata,
        identifier,
      },
    });
  } else if (storedIdentifier !== identifier) {
    return res.status(401).json({ message: "Unauthorized: identifier" });
  }

  const token = jwt.sign(
    { username, password, salt: ACTIVATION_SALT },
    ACTIVATION_SECRET,
    { expiresIn: "5min" }
  );

  return res.status(200).json({ token });
}
