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
 * not submit it unattended: a human writes the brief and clears the captcha.
 */
const contactWebMcp = {
  toolname: "contactLuis",
  tooldescription:
    "Describes a professional inquiry form for Luis Alejandro. Human must complete reCAPTCHA and submit; agents must not submit unattended or call POST /api/contact directly.",
} as Record<string, string>;

export const NEEDS = [
  "Web development",
  "AI for teams",
  "AI in products",
  "Integrations",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "ASAP",
  "1–3 months",
  "Later this year",
  "Just exploring",
] as const;

const schema = yup
  .object({
    contactName: yup.string().trim().min(3).max(256).required(),
    contactEmail: yup.string().trim().email().required(),
    company: yup.string().trim().max(160).default(""),
    needs: yup.array(yup.string().required()).default([]),
    timeline: yup.string().default(""),
    contactMessage: yup.string().trim().min(3).max(1024).required(),
    nda: yup.boolean().default(false),
    consent: yup
      .boolean()
      .oneOf([true], "Please accept the privacy terms to send the brief.")
      .required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;
type Status = "idle" | "sending" | "sent" | "failed";

/**
 * The brief, mirrored as data. It is the reference's signature move: what the
 * form will send is visible as it is typed, so nothing about the payload is a
 * surprise.
 */
function BriefDraft({ values }: { values: Partial<FormValues> }) {
  const draft = {
    from: values.contactName || null,
    email: values.contactEmail || null,
    company: values.company || null,
    needs: values.needs?.length ? values.needs : null,
    timeline: values.timeline || null,
    nda: Boolean(values.nda),
    words: values.contactMessage
      ? values.contactMessage.trim().split(/\s+/).length
      : null,
  };
  const required = [
    values.contactName,
    values.contactEmail,
    values.contactMessage,
  ];
  const filled = required.filter(Boolean).length;

  return (
    <aside className="site-brief-draft" aria-label="Brief preview">
      <p className="site-note">
        <span className="text-ink">brief.json</span> draft
      </p>
      <pre aria-live="polite">{JSON.stringify(draft, null, 2)}</pre>
      <p className="site-note text-ink-muted">
        Required {filled}/{required.length} · compiled locally · sent only on
        submit
      </p>
    </aside>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { needs: [], timeline: "", nda: false, consent: false },
  });

  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [needsCaptcha, setNeedsCaptcha] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const verified = !RECAPTCHA_API_KEY || Boolean(token);

  // A snapshot refreshed on every field change: the draft panel and the chips
  // render from state, so no render-time subscription to the form is needed.
  const [values, setValues] = useState<Partial<FormValues>>({});
  const refresh = () => setValues(getValues());

  const toggleNeed = (need: string) => {
    const current = values.needs ?? [];
    setValue(
      "needs",
      current.includes(need)
        ? current.filter((n) => n !== need)
        : [...current, need],
      { shouldDirty: true }
    );
    refresh();
  };

  const onSubmit = async (data: FormValues) => {
    if (status === "sending" || status === "sent") return;
    if (!verified) {
      setNeedsCaptcha(true);
      return;
    }
    setStatus("sending");

    try {
      // No token is signed here: the captcha response is the gate, and the
      // server validates the body. A client-held signing key would be public.
      const response = await axios.post("/api/contact", { ...data, token });
      if (response.data?.sent) {
        setStatus("sent");
        return;
      }
      throw new Error("not sent");
    } catch {
      setStatus("failed");
      setToken("");
      setCaptchaKey((key) => key + 1);
    }
  };

  if (status === "sent") {
    return (
      <div className="site-brief-done" role="status">
        <p className="site-note text-ink-muted">200 OK · brief received</p>
        <p className="site-h2">Thanks. I&apos;ll be in touch.</p>
        <p>
          Expect a reply at your inbox within 3 business days, usually with a
          couple of questions and a slot for a call.
        </p>
        <p>
          Meanwhile,{" "}
          <a href="/blog" className="site-link">
            read the blog
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="site-contact-form"
      onSubmit={handleSubmit(onSubmit)}
      {...contactWebMcp}
    >
      <div className="site-contact-form__fields">
        <div>
          <label htmlFor="contactName">
            <span className="site-note">01</span> Your name · Required
          </label>
          <input
            id="contactName"
            autoComplete="name"
            aria-invalid={Boolean(errors.contactName)}
            aria-describedby={
              errors.contactName ? "contactName-error" : undefined
            }
            {...register("contactName", { onChange: refresh })}
            {...({
              toolparamdescription:
                "Full name of the sender or hiring manager (3-256 characters).",
            } as Record<string, string>)}
          />
          <p id="contactName-error" className="site-contact-form__error">
            {errors.contactName ? "Please enter your name." : ""}
          </p>
        </div>

        <div>
          <label htmlFor="contactEmail">
            <span className="site-note">02</span> Email · Required
          </label>
          <input
            id="contactEmail"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.contactEmail)}
            aria-describedby={
              errors.contactEmail ? "contactEmail-error" : undefined
            }
            {...register("contactEmail", { onChange: refresh })}
            {...({
              toolparamdescription:
                "Valid email address where Luis Alejandro should reply.",
            } as Record<string, string>)}
          />
          <p id="contactEmail-error" className="site-contact-form__error">
            {errors.contactEmail
              ? "Please enter a valid email address, like ada@agency.studio."
              : ""}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="company">
          <span className="site-note">03</span> Agency or company · Optional
        </label>
        <input
          id="company"
          autoComplete="organization"
          {...register("company", { onChange: refresh })}
        />
      </div>

      <fieldset className="site-contact-form__chips">
        <legend>
          <span className="site-note">04</span> What do you need? · Pick any
        </legend>
        <div className="site-chips">
          {NEEDS.map((need) => {
            const on = (values.needs ?? []).includes(need);
            return (
              <button
                key={need}
                type="button"
                aria-pressed={on}
                onClick={() => toggleNeed(need)}
                className={`site-chip${on ? " site-chip--on" : ""}`}
              >
                {need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="site-contact-form__chips">
        <legend>
          <span className="site-note">05</span> Timeline · Pick one
        </legend>
        <div className="site-chips">
          {TIMELINES.map((option) => {
            const on = values.timeline === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setValue("timeline", on ? "" : option, { shouldDirty: true });
                  refresh();
                }}
                className={`site-chip${on ? " site-chip--on" : ""}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contactMessage">
          <span className="site-note">06</span> The brief · Required
        </label>
        <textarea
          id="contactMessage"
          rows={6}
          aria-invalid={Boolean(errors.contactMessage)}
          aria-describedby={
            errors.contactMessage ? "contactMessage-error" : undefined
          }
          placeholder="What you're building, for whom, and when it needs to land."
          {...register("contactMessage", { onChange: refresh })}
          {...({
            toolparamdescription:
              "Contract description, job details, or inquiry text (3-1024 characters).",
          } as Record<string, string>)}
        />
        <p id="contactMessage-error" className="site-contact-form__error">
          {errors.contactMessage
            ? "Please write a few words about the project."
            : ""}
        </p>
      </div>

      <div className="site-contact-form__checks">
        <label className="site-check">
          <input type="checkbox" {...register("nda", { onChange: refresh })} />
          <span>Send me an NDA before we go into detail.</span>
        </label>
        <label className="site-check">
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I agree that my data is used only to reply to me, as described in
            the{" "}
            <a href="/privacy" className="site-link">
              privacy page
            </a>
            . Required
          </span>
        </label>
        <p id="consent-error" className="site-contact-form__error">
          {errors.consent?.message ?? ""}
        </p>
      </div>

      <BriefDraft values={values} />

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
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send the brief"}
          <span aria-hidden="true" className="site-btn__arrow">
            →
          </span>
        </button>
        <p className="site-note text-ink-muted">Reply within 3 business days</p>
      </div>

      {needsCaptcha && !verified && (
        <p role="alert" className="site-contact-form__error">
          Confirm you are human above, then send the brief.
        </p>
      )}

      {status === "failed" && (
        <p role="alert" className="site-contact-form__error">
          Something went wrong on the way. Nothing is lost: copy your text and
          write to luis@luisalejandro.org.
        </p>
      )}
    </form>
  );
}
