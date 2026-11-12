"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { RECAPTCHA_API_KEY } from "@constants/constants";

/**
 * Describes the form to agent runtimes that read these annotations. Agents must
 * not submit it unattended: a human writes the message and clears the captcha.
 */
const contactWebMcp = {
  toolname: "contactLuis",
  tooldescription:
    "Describes a professional inquiry form for Luis Alejandro. Human must complete reCAPTCHA and submit; agents must not submit unattended or call POST /api/contact directly.",
} as Record<string, string>;

const schema = yup
  .object({
    contactName: yup.string().min(3).max(256).required(),
    contactEmail: yup.string().email().required(),
    contactMessage: yup.string().min(3).max(1024).required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

type Status = "idle" | "sending" | "sent" | "failed";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  // The captcha token lives in state, so nothing reads a ref during render.
  // A failed attempt bumps the key to remount the widget, which is the reset.
  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [needsCaptcha, setNeedsCaptcha] = useState(false);
  const verified = !RECAPTCHA_API_KEY || Boolean(token);

  const onSubmit = async (values: FormValues) => {
    if (status === "sending" || status === "sent") return;
    // Validation runs before this point, so field errors are already visible.
    if (!verified) {
      setNeedsCaptcha(true);
      return;
    }
    setStatus("sending");

    try {
      // No token is signed here: the captcha response is the gate, and the
      // server validates the body. A client-held signing key would be public.
      const response = await axios.post("/api/contact", { ...values, token });
      if (response.data?.sent) {
        setStatus("sent");
        return;
      }
      throw new Error("not sent");
    } catch {
      setStatus("failed");
      // A failed attempt should not leave a spent captcha behind.
      setToken("");
      setCaptchaKey((key) => key + 1);
    }
  };

  return (
    <form
      className="site-contact-form"
      onSubmit={handleSubmit(onSubmit)}
      {...contactWebMcp}
    >
      <div className="site-contact-form__fields">
        <div>
          <label htmlFor="contactName">Name</label>
          <input
            id="contactName"
            autoComplete="name"
            aria-invalid={Boolean(errors.contactName)}
            aria-describedby={
              errors.contactName ? "contactName-error" : undefined
            }
            {...register("contactName")}
            {...({
              toolparamdescription:
                "Full name of the sender or hiring manager (3-256 characters).",
            } as Record<string, string>)}
          />
          <p id="contactName-error" className="site-contact-form__error">
            {errors.contactName?.message}
          </p>
        </div>

        <div>
          <label htmlFor="contactEmail">Email</label>
          <input
            id="contactEmail"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.contactEmail)}
            aria-describedby={
              errors.contactEmail ? "contactEmail-error" : undefined
            }
            {...register("contactEmail")}
            {...({
              toolparamdescription:
                "Valid email address where Luis Alejandro should reply.",
            } as Record<string, string>)}
          />
          <p id="contactEmail-error" className="site-contact-form__error">
            {errors.contactEmail?.message}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="contactMessage">What are you building?</label>
        <textarea
          id="contactMessage"
          rows={7}
          aria-invalid={Boolean(errors.contactMessage)}
          aria-describedby={
            errors.contactMessage ? "contactMessage-error" : undefined
          }
          {...register("contactMessage")}
          {...({
            toolparamdescription:
              "Contract description, job details, or inquiry text (3-1024 characters).",
          } as Record<string, string>)}
        />
        <p id="contactMessage-error" className="site-contact-form__error">
          {errors.contactMessage?.message}
        </p>
      </div>

      {RECAPTCHA_API_KEY && (
        <div className="site-contact-form__captcha">
          <ReCAPTCHA
            key={captchaKey}
            sitekey={RECAPTCHA_API_KEY}
            onChange={(value) => {
              setToken(value || "");
              if (value) setNeedsCaptcha(false);
            }}
            onExpired={() => setToken("")}
          />
        </div>
      )}

      <div className="site-contact-form__actions">
        <button
          type="submit"
          className="site-btn"
          disabled={status === "sending" || status === "sent"}
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Sent"
              : "Send message"}
        </button>

        <p role="status" className="site-note">
          {status === "sent" ? "Message sent. I will reply by email." : ""}
        </p>

        {needsCaptcha && !verified && (
          <p role="alert" className="site-contact-form__error">
            Confirm you are human above, then send.
          </p>
        )}

        {status === "failed" && (
          <p role="alert" className="site-contact-form__error">
            That did not go through. Try again, or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
