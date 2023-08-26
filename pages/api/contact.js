import * as yup from "yup";

import { isAuthorizationValid, isSchemaValid } from "@lib/utils";
import { initLeadWorkflow, verifyCaptcha } from "@lib/contactForm";

export default async function contact(req, res) {
  const schema = yup
    .object({
      contactName: yup.string().required(),
      contactEmail: yup.string().required(),
      contactMessage: yup.string().required(),
      token: yup.string().required(),
    })
    .required();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Missing authorization header" });
  }
  if (!isAuthorizationValid(req.headers.authorization, req.body)) {
    return res.status(401).json({ error: "Invalid authorization" });
  }
  if (!isSchemaValid(schema, req.body)) {
    return res.status(400).json({ error: "Invalid body" });
  }
  if (!await verifyCaptcha(req.body.token)) {
    return res.status(403).json({ error: "Invalid captcha" });
  }
  try {
    await initLeadWorkflow(req.body);
    return res.status(200).json({ sent: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
