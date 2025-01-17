import { createBucketClient } from "@cosmicjs/sdk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const BUCKET_SLUG = process.env.GYMCONTROL_COSMIC_BUCKET_SLUG;
const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;
const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;
const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default async function getToken(req, res) {
  const slug = req.body.user;
  const password = req.body.password;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
      "created_at",
    ])
    .sort("-created_at");

  if (data.objects.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const storedPassword = data.objects[0].metadata.password;
  const username = data.objects[0].slug;

  bcrypt.compare(password, storedPassword, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result) {
      const token = jwt.sign(
        { username, password, salt: ACTIVATION_SALT },
        ACTIVATION_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Unauthorized" });
  });
  return res.status(200);
}
