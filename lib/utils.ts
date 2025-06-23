import * as jose from "jose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { TextEncoder } from "util";

import { JWT_SECRET } from "@constants/constants";

export const isSchemaValid = async (schema: any, body: any) => {
  try {
    const status = await schema.isValid(body);
    return status;
  } catch (error) {
    return false;
  }
};

export const isAuthorizationValid = async (header: any, body: any) => {
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

export const compare = async (param1: any, param2: any) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(param1, param2, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const verify = async (token: any, key: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
    .then((res) => {
      return res;
    })
    .catch(() => {
      return null;
    });
};
