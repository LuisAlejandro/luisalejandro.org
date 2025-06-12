import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import cn from "classnames";
import * as jose from "jose";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading,
} from "react-icons/ai";
import * as yup from "yup";

import { JWT_SECRET, RECAPTCHA_API_KEY } from "@constants/constants";

import { Section } from "@components/common/Layout/Section";
import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

const Contact = ({ dark }: { dark?: boolean }) => {
  const schema = yup
    .object({
      contactName: yup.string().min(3).max(256).required(),
      contactEmail: yup.string().email().required(),
      contactMessage: yup.string().min(3).max(1024).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const recaptchaRef = useRef<any>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const onSubmit = async (data: any) => {
    if (!isVerified || waiting || isSent) return;
    setWaiting(true);
    const status = await sendForm(data);

    if (!status) {
      setBackendError(true);
      setWaiting(false);
      setTimeout(() => {
        setBackendError(false);
        recaptchaRef.current.reset();
        setIsVerified(false);
      }, 5000);
    } else {
      setIsSent(true);
      setWaiting(false);
      setTimeout(() => {
        setIsSent(false);
        recaptchaRef.current.reset();
        setIsVerified(false);
      }, 5000);
    }
  };

  const sendForm = async (data: any) => {
    try {
      const token = await recaptchaRef.current.getValue();
      const secret = new TextEncoder().encode(JWT_SECRET);
      const jwt = await new jose.SignJWT({ ...data, token })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer("luisalejandro.org")
        .setAudience("private")
        .setExpirationTime("10m")
        .sign(secret);

      const response = await axios.post(
        "/api/contact",
        { ...data, token },
        {
          headers: { authorization: `Bearer ${jwt}` },
        }
      );
      if (response.data.sent) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const errorState =
    backendError ||
    errors.contactName ||
    errors.contactEmail ||
    errors.contactMessage;
  const buttonDisabled = !isVerified || errorState;

  return (
    <>
      <Section
        id="contact"
        nopadding
        nomargin
        fullwidth
        className={dark ? "!bg-custom-light-gray" : ""}
      >
        <style jsx global>{`
          #contact {
            padding-bottom: 0;
          }

          #contact form {
            position: relative;
            margin-bottom: 20px;
          }

          #contact form button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            font-weight: 200;
            height: 64px;
            line-height: 20px;
            margin: 0 0 80px 0;
            padding: 3px 5px 7px 5px;
            box-shadow:
              0 -6px 0 rgba(255, 255, 255, 0.3) inset,
              0 -5px 0 rgba(0, 0, 0, 0.3) inset,
              -1px 0 0 rgba(0, 0, 0, 0.3) inset,
              1px 1px 0 rgba(0, 0, 0, 0.3) inset;
            background-image: radial-gradient(
              ellipse closest-side at 50% 50%,
              rgba(255, 255, 255, 0.4),
              rgba(255, 255, 255, 0)
            );
            transition: background-color 0.4s ease-out;
            border-radius: 15px;
            width: 150px;
          }

          #contact form .button-active:active {
            padding: 3px 5px;
            margin: 4px 0 76px 0;
            box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.2) inset;
          }

          #contact form textarea {
            resize: none;
            height: 160px !important;
          }

          #contact form .recaptcha div {
            width: min-content;
            float: right;
          }
          .button-primary {
            background-color: #abb7b7;
            color: #5a5a5a;
            cursor: pointer;
          }
          .button-primary:hover {
            background-color: #c0cece;
            color: #5a5a5a;
          }
          .button-primary:active {
            background-color: #c0cece;
          }

          .button-disabled-primary {
            background-color: #c3c3c3;
            color: #979797;
            cursor: not-allowed;
          }
          .button-disabled-primary:hover {
            background-color: #c3c3c3;
            color: #979797;
          }

          .button-waiting-primary {
            background-color: #f9e09c;
            color: #979797;
            cursor: not-allowed;
          }
          .button-waiting-primary:hover {
            background-color: #f9e09c;
            color: #979797;
          }

          .button-success-primary {
            background-color: #a0d989;
            color: #5a5a5a;
            cursor: pointer;
          }
          .button-success-primary:hover {
            background-color: #a0d989;
            color: #5a5a5a;
          }
          .button-success-primary:active {
            background-color: #c0cece;
          }

          .button-error-primary {
            background-color: #d98989;
            color: #5a5a5a;
            cursor: not-allowed;
          }
          .button-error-primary:hover {
            background-color: #d98989;
            color: #5a5a5a;
          }
          .button-error-primary:active {
            background-color: #c0cece;
          }
        `}</style>
        <SectionTitle main>Contact</SectionTitle>
        <SectionText>
          Ask me anything! I might? be available for hire
        </SectionText>
        <form
          className="w-full max-w-260 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col mx-6 lg:w-4/12 lg:mx-4">
              <label
                htmlFor="contactName"
                className="block m-1 text-lg leading-normal font-main font-light"
              >
                Name
              </label>

              <input
                id="contactName"
                className="block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-lg leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactName")}
              />

              <p className="block mx-1 h-25px text-2xl leading-normal font-main font-normal text-red-500">
                {errors.contactName?.message}
              </p>

              <label
                htmlFor="contactEmail"
                className="block m-1 text-lg leading-normal font-main font-light "
              >
                Email
              </label>

              <input
                id="contactEmail"
                className="block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-lg leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactEmail")}
              />

              <p className="block mx-1 h-25px text-2xl leading-normal font-main font-normal text-red-500">
                {errors.contactEmail?.message}
              </p>
              {RECAPTCHA_API_KEY && (
                // @ts-ignore
                <ReCAPTCHA
                  className="recaptcha my-5"
                  theme="light"
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_API_KEY}
                  onChange={() => setIsVerified(true)}
                  onExpired={() => setIsVerified(false)}
                  onErrored={() => setIsVerified(false)}
                />
              )}
            </div>

            <div className="flex flex-col mx-6 lg:w-8/12 lg:mx-4">
              <label
                htmlFor="contactMessage"
                className="block m-1 text-lg leading-normal font-main font-light"
              >
                Message
              </label>

              <textarea
                id="contactMessage"
                className="textarea block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-lg leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactMessage")}
              ></textarea>

              <p className="block mx-1 h-25px text-2xl leading-normal font-main font-normal text-red-500">
                {errors.contactMessage?.message}
              </p>

              <div className="flex flex-row justify-start">
                <button
                  type="submit"
                  className={cn("font-main font-light", {
                    "button-primary button-active": !buttonDisabled,
                    "button-waiting-primary": !buttonDisabled && waiting,
                    "button-success-primary button-active":
                      !buttonDisabled && isSent,
                    "button-error-primary": errorState,
                    "button-disabled-primary": buttonDisabled,
                  })}
                  disabled={!!buttonDisabled}
                >
                  Send
                </button>
                {isSent && (
                  <AiFillCheckCircle className="ml-4 h-6_5rem text-5xl text-gray-800" />
                )}
                {waiting && (
                  <AiOutlineLoading className="ml-4 h-6_5rem text-5xl text-gray-800 animate-spin" />
                )}
                {errorState && (
                  <AiFillCloseCircle className="ml-4 h-6_5rem text-5xl text-gray-800" />
                )}
              </div>
            </div>
          </div>
        </form>

        <svg viewBox="0 0 1920 37">
          <path
            fill="#444"
            fillOpacity="0.5"
            d="M0,5.1l210,10.1l473.3-8.6l511.4,7.4L1710,0l210,5.1v32.4H0V5.1z"
          />
          <path
            fill="#333"
            d="M0,37.5V20.6l255,16.9l939.7-33.9L1665,6.4l255,14.2v16.9H0z"
          />
        </svg>
      </Section>
    </>
  );
};

export default Contact;
