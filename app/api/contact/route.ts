import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { initLeadWorkflow, verifyCaptcha } from "@lib/contactForm";
import { isAuthorizationValid, isSchemaValid } from "@lib/utils";

export async function POST(request: NextRequest) {
  const schema = yup
    .object({
      contactName: yup.string().required(),
      contactEmail: yup.string().required(),
      contactMessage: yup.string().required(),
      token: yup.string().required(),
    })
    .required();

  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 400 }
      );
    }

    if (!isAuthorizationValid(authHeader, body)) {
      return NextResponse.json(
        { error: "Invalid authorization" },
        { status: 401 }
      );
    }

    if (!isSchemaValid(schema, body)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    if (!(await verifyCaptcha(body.token))) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 403 });
    }

    await initLeadWorkflow(body);
    return NextResponse.json({ sent: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
