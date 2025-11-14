import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { createBucketClient } from "@cosmicjs/sdk";
import { logError } from "@lib/logger";
import { compare, isAuthorizationValid, isSchemaValid } from "@lib/utils";
import jwt from "jsonwebtoken";

const BUCKET_SLUG =
  process.env.GYMCONTROL_COSMIC_BUCKET_SLUG || "gymcontrol-production";

const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;

const WRITE_KEY = process.env.GYMCONTROL_COSMIC_WRITE_KEY;

const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;

const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const schema = yup
    .object({
      user: yup.string().required(),
      password: yup.string().required(),
      identifier: yup.string().required(),
    })
    .required();

  try {
    const body = await request.json();
    const slug = body.user;
    const password = body.password;
    const identifier = body.identifier;
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isSchemaValid(schema, body)) {
      return NextResponse.json(
        { error: "Invalid body" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isAuthorizationValid(authHeader, body)) {
      return NextResponse.json(
        { error: "Invalid authorization" },
        { status: 401, headers: corsHeaders }
      );
    }

    const cosmic = createBucketClient({
      bucketSlug: BUCKET_SLUG,
      readKey: READ_KEY || "",
      writeKey: WRITE_KEY || "",
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
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const username = data.objects[0].slug;
    const entryId = data.objects[0].id;
    const storedPassword = data.objects[0].metadata.password;
    const storedIdentifier = data.objects[0].metadata.identifier;

    const isValidPassword = await compare(password, storedPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Unauthorized: password" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (!storedIdentifier) {
      await cosmic.objects.updateOne(entryId, {
        metadata: {
          ...data.objects[0].metadata,
          identifier,
        },
      });
    } else if (storedIdentifier !== identifier) {
      return NextResponse.json(
        { message: "Unauthorized: identifier" },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = jwt.sign(
      { username, password, salt: ACTIVATION_SALT },
      ACTIVATION_SECRET || "",
      { expiresIn: "5min" }
    );

    return NextResponse.json({ token }, { headers: corsHeaders });
  } catch (error) {
    logError("gymcontrol-token-api", error, {
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      hasWriteKey: !!WRITE_KEY,
      hasActivationSecret: !!ACTIVATION_SECRET,
      hasActivationSalt: !!ACTIVATION_SALT,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
