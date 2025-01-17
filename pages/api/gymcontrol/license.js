import { createBucketClient } from "@cosmicjs/sdk";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const BUCKET_SLUG = process.env.GYMCONTROL_COSMIC_BUCKET_SLUG;
const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;
const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;
const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default async function lastPosts(req, res) {
  const key = req.body.key;
  const token = req.body.token;
  const cryptr = new Cryptr(ACTIVATION_SECRET);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const decodedToken = jwt.verify(
    token,
    ACTIVATION_SECRET,
    (err, decodedToken) => {
      if (err) {
        console.error("Token verification failed");
        return null;
      } else {
        return decodedToken;
      }
    }
  );

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

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

  bcrypt.compare(decodedToken.password, storedPassword, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (
      result &&
      decodedToken.salt === ACTIVATION_SALT &&
      decodedToken.username === username
    ) {
      const decodedKey = jwt.verify(
        cryptr.decrypt(key),
        ACTIVATION_SALT,
        (err, decodedKey) => {
          if (err) {
            console.error("Token verification failed");
            return null;
          } else {
            return decodedKey;
          }
        }
      );

      if (!decodedKey) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res
        .status(200)
        .json({
          type: decodedKey.type,
          name: decodedKey.name,
          expiration: decodedKey.expiration,
        });
    }
    return res.status(401).json({ message: "Unauthorized" });
  });
}
