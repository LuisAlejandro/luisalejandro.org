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

const param = (description: string) =>
  ({ toolparamdescription: description }) as Record<string, string>;

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

/** The numbered label row every field shares: index, name, requirement. */
function FieldLabel({
  num,
  label,
  hint,
}: {
  num: string;
  label: string;
  hint: string;
}) {
  return (
    <>
      <span className="site-note site-accent">{num}</span>
      <span className="site-note text-ink">{label}</span>
      <span className="site-note">{hint}</span>
    </>
  );
}

/** One JSON value, coloured by kind the way the reference's readout is. */
function JsonValue({ value }: { value: unknown }) {
  if (value === null)
    return <span className="site-contact-readout__null">null</span>;
  if (typeof value === "boolean" || typeof value === "number")
    return <span className="site-accent">{String(value)}</span>;
  return <span className="text-ink">{JSON.stringify(value)}</span>;
}

/**
 * The brief, mirrored as data: what the form will send is visible as it is
 * typed, so nothing about the payload is a surprise.
 */
function Readout({ values }: { values: Partial<FormValues> }) {
  const draft: [string, unknown][] = [
    ["from", values.contactName || null],
    ["email", values.contactEmail || null],
    ["company", values.company || null],
    ["needs", values.needs?.length ? values.needs : null],
    ["timeline", values.timeline || null],
    ["nda", Boolean(values.nda)],
    [
      "words",
      values.contactMessage
        ? values.contactMessage.trim().split(/\s+/).length
        : null,
    ],
  ];
  const required = [
    values.contactName,
    values.contactEmail,
    values.contactMessage,
    values.consent,
  ];
  const filled = required.filter(Boolean).length;
  const ready = filled === required.length;

  return (
    <aside
      className="site-contact-readout"
      aria-label="Brief preview"
      data-reveal="up"
    >
      <div className="site-contact-readout__bar site-note">
        <span className="text-ink">brief.json</span>
        <span className="site-contact-readout__status" data-ready={ready}>
          {ready ? "ready" : "draft"}
        </span>
      </div>
      <div className="site-contact-readout__code" aria-live="polite">
        <div>{"{"}</div>
        {draft.map(([key, value], index) => (
          <div key={key} className="site-contact-readout__ln">
            <span>&quot;{key}&quot;</span>: <JsonValue value={value} />
            {index < draft.length - 1 ? "," : ""}
          </div>
        ))}
        <div>{"}"}</div>
      </div>
      <div className="site-contact-readout__meter" aria-hidden="true">
        <span style={{ width: `${(filled / required.length) * 100}%` }} />
      </div>
      <p className="site-contact-readout__foot site-note">
        <span>
          Required {filled}/{required.length}
        </span>
        <span>Compiled locally · sent only on submit</span>
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

  // A snapshot refreshed on every field change: the readout and the chips
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

  return (
    <div className="site-grid site-contact-brief">
      {status === "sent" ? (
        <div className="site-contact-done" role="status">
          <p className="site-note site-accent">200 OK · brief received</p>
          <p className="site-h2">Thanks. I&apos;ll be in touch.</p>
          <p className="site-lead-type">
            Expect a reply at your inbox within 3 business days, usually with a
            couple of questions and a slot for a call.
          </p>
          <a href="/blog" className="site-btn site-btn--ghost">
            <span>Meanwhile, read the blog</span>
          </a>
        </div>
      ) : (
        <form
          className="site-contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          {...contactWebMcp}
        >
          <div className="site-contact-field" data-reveal="up">
            <label htmlFor="contactName" className="site-contact-field__label">
              <FieldLabel num="01" label="Your name" hint="Required" />
            </label>
            <input
              id="contactName"
              className="site-contact-field__input"
              autoComplete="name"
              placeholder="e.g. Grace Hopper"
              aria-invalid={Boolean(errors.contactName)}
              aria-describedby={
                errors.contactName ? "contactName-error" : undefined
              }
              {...register("contactName", { onChange: refresh })}
              {...param(
                "Full name of the sender or hiring manager (3-256 characters)."
              )}
            />
            {errors.contactName && (
              <p id="contactName-error" className="site-contact-field__error">
                Please enter your name.
              </p>
            )}
          </div>

          <div className="site-contact-field" data-reveal="up">
            <label htmlFor="contactEmail" className="site-contact-field__label">
              <FieldLabel num="02" label="Email" hint="Required" />
            </label>
            <input
              id="contactEmail"
              type="email"
              className="site-contact-field__input"
              autoComplete="email"
              placeholder="e.g. grace@company.dev"
              aria-invalid={Boolean(errors.contactEmail)}
              aria-describedby={
                errors.contactEmail ? "contactEmail-error" : undefined
              }
              {...register("contactEmail", { onChange: refresh })}
              {...param(
                "Valid email address where Luis Alejandro should reply."
              )}
            />
            {errors.contactEmail && (
              <p id="contactEmail-error" className="site-contact-field__error">
                Please enter a valid email address, like grace@company.dev.
              </p>
            )}
          </div>

          <div className="site-contact-field" data-reveal="up">
            <label htmlFor="company" className="site-contact-field__label">
              <FieldLabel num="03" label="Agency or company" hint="Optional" />
            </label>
            <input
              id="company"
              className="site-contact-field__input"
              autoComplete="organization"
              placeholder="e.g. Compiler Labs Inc."
              {...register("company", { onChange: refresh })}
            />
          </div>

          <fieldset className="site-contact-field" data-reveal="up">
            <legend className="site-contact-field__label">
              <FieldLabel num="04" label="What do you need?" hint="Pick any" />
            </legend>
            <div className="site-contact-chips">
              {NEEDS.map((need) => {
                const on = (values.needs ?? []).includes(need);
                return (
                  <button
                    key={need}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleNeed(need)}
                    className="site-pill"
                  >
                    {need}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="site-contact-field" data-reveal="up">
            <legend className="site-contact-field__label">
              <FieldLabel num="05" label="Timeline" hint="Pick one" />
            </legend>
            <div className="site-contact-chips">
              {TIMELINES.map((option) => {
                const on = values.timeline === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setValue("timeline", on ? "" : option, {
                        shouldDirty: true,
                      });
                      refresh();
                    }}
                    className="site-pill"
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="site-contact-field" data-reveal="up">
            <label
              htmlFor="contactMessage"
              className="site-contact-field__label"
            >
              <FieldLabel num="06" label="The brief" hint="Required" />
            </label>
            <textarea
              id="contactMessage"
              rows={5}
              className="site-contact-field__input site-contact-field__input--area"
              placeholder="What are you building, for whom, and what makes it hard? Links to a repo or a Figma file are welcome."
              aria-invalid={Boolean(errors.contactMessage)}
              aria-describedby={
                errors.contactMessage ? "contactMessage-error" : undefined
              }
              {...register("contactMessage", { onChange: refresh })}
              {...param(
                "Contract description, job details, or inquiry text (3-1024 characters)."
              )}
            />
            {errors.contactMessage && (
              <p
                id="contactMessage-error"
                className="site-contact-field__error"
              >
                Please write a few words about the project.
              </p>
            )}
          </div>

          <div className="site-contact-checks" data-reveal="up">
            <label className="site-contact-check">
              <input
                type="checkbox"
                {...register("nda", { onChange: refresh })}
              />
              <span>Send me an NDA before we go into detail.</span>
            </label>
            <label className="site-contact-check">
              <input
                type="checkbox"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                {...register("consent", { onChange: refresh })}
              />
              <span>
                I agree that my data is used only to reply to me, as described
                in the{" "}
                <a href="/privacy" className="site-link site-link--inline">
                  privacy policy
                </a>
                . <span className="site-note">Required</span>
              </span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="site-contact-field__error">
                {errors.consent.message}
              </p>
            )}
          </div>

          {RECAPTCHA_API_KEY && (
            <div className="site-contact-captcha">
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

          <div className="site-contact-submit" data-reveal="up">
            <button
              type="submit"
              className="site-btn"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending" ? "Sending…" : "Send the brief"}
              </span>
              <span aria-hidden="true" className="site-btn__arrow">
                →
              </span>
            </button>
            <p className="site-note">Reply within 3 business days</p>
          </div>

          {needsCaptcha && !verified && (
            <p role="alert" className="site-contact-field__error">
              Confirm you are human above, then send the brief.
            </p>
          )}

          {status === "failed" && (
            <p role="alert" className="site-contact-field__error">
              Something went wrong on the way. Nothing is lost: copy your text
              and write to{" "}
              <a
                href="mailto:luis@luisalejandro.org"
                className="site-link site-link--inline"
              >
                luis@luisalejandro.org
              </a>
              .
            </p>
          )}
        </form>
      )}

      {status !== "sent" && <Readout values={values} />}
    </div>
  );
}
