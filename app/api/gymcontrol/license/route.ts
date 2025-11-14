import { createBucketClient } from "@cosmicjs/sdk";
import { compare, isSchemaValid, verify } from "@lib/utils";
import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { logError } from "@lib/logger";

const BUCKET_SLUG =
  process.env.GYMCONTROL_COSMIC_BUCKET_SLUG || "gymcontrol-production";

const READ_KEY = process.env.GYMCONTROL_COSMIC_READ_KEY;

const ACTIVATION_SECRET = process.env.GYMCONTROL_ACTIVATION_SECRET;

const ACTIVATION_SALT = process.env.GYMCONTROL_ACTIVATION_SALT;

type DecodedToken = {
  username: string;
  password: string;
  salt: string;
};

type DecodedKey = {
  type: string;
  name: string;
  expiration: string;
};

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
      key: yup.string().required(),
    })
    .required();

  try {
    const body = await request.json();
    const key = body.key;
    const token = request.headers.get("authorization");

    if (!token) {
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

    const decodedToken = (await verify(
      token,
      ACTIVATION_SECRET || ""
    )) as DecodedToken;
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Unauthorized: token" },
        { status: 401, headers: corsHeaders }
      );
    }

    const cosmic = createBucketClient({
      bucketSlug: BUCKET_SLUG,
      readKey: READ_KEY || "",
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
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const storedPassword = data.objects[0].metadata.password;
    const username = data.objects[0].slug;

    const isValidPassword = await compare(
      decodedToken.password,
      storedPassword
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Unauthorized: password" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (
      decodedToken.salt === ACTIVATION_SALT &&
      decodedToken.username === username
    ) {
      const cryptr = new Cryptr(ACTIVATION_SECRET || "");
      const decodedKey = (await verify(
        cryptr.decrypt(key),
        ACTIVATION_SALT || ""
      )) as DecodedKey;
      if (!decodedKey) {
        return NextResponse.json(
          { message: "Unauthorized: key" },
          { status: 401, headers: corsHeaders }
        );
      }
      return NextResponse.json(
        {
          type: decodedKey.type,
          name: decodedKey.name,
          expiration: decodedKey.expiration,
        },
        { headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { message: "Unauthorized: salt" },
      { status: 401, headers: corsHeaders }
    );
  } catch (error) {
    logError("gymcontrol-license-api", error, {
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      hasActivationSecret: !!ACTIVATION_SECRET,
      hasActivationSalt: !!ACTIVATION_SALT,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
