import * as jose from "jose";
import { TextEncoder } from "util";

import { JWT_SECRET } from "@constants/constants";

export const isSchemaValid = async (schema, body) => {
  try {
    const status = await schema.isValid(body);
    return status;
  } catch (error) {
    return false;
  }
};

export const isAuthorizationValid = async (header, body) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const jwt = header.replace("Bearer ", "");
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: "luisalejandro.org",
      audience: "private",
    });
    const status = JSON.stringify(payload) === JSON.stringify(body);
    return status;
  } catch (error) {
    console.log(error);
    return false;
  }
};
