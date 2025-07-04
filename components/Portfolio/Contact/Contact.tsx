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
      console.error(error);
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
        nomargin
        nopadding
        fullwidth
        className={cn("pb-0", dark ? "!bg-gray-5" : "")}
      >
        <SectionTitle wide>Contact</SectionTitle>
        <SectionText wide>
          Ask me anything! I might? be available for hire
        </SectionText>
        <form
          className="w-full lg:max-w-[80%] mx-auto relative mb-5 p-8 lg:p-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col mx-0 lg:w-4/12 lg:mx-4">
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

              <p className="block mx-1 h-6 text-sm leading-normal font-main font-normal text-red-500">
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

              <p className="block mx-1 h-6 text-sm leading-normal font-main font-normal text-red-500">
                {errors.contactEmail?.message}
              </p>
              {RECAPTCHA_API_KEY && (
                <div className="my-5 flex justify-start lg:justify-end">
                  {/* @ts-ignore */}
                  <ReCAPTCHA
                    theme="light"
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_API_KEY}
                    onChange={() => setIsVerified(true)}
                    onExpired={() => setIsVerified(false)}
                    onErrored={() => setIsVerified(false)}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col mx-0 lg:w-8/12 lg:mx-4">
              <label
                htmlFor="contactMessage"
                className="block m-1 text-lg leading-normal font-main font-light"
              >
                Message
              </label>

              <textarea
                id="contactMessage"
                className="block my-1 px-3 py-1.5 w-full h-40 rounded-xl bg-white border-transparent text-lg leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400 resize-none"
                {...register("contactMessage")}
              ></textarea>

              <p className="block mx-1 h-6 text-sm leading-normal font-main font-normal text-red-500">
                {errors.contactMessage?.message}
              </p>

              <div className="flex flex-row justify-end lg:justify-start">
                <button
                  type="submit"
                  className={cn(
                    "flex items-center justify-center text-3xl font-light h-16 leading-5 mb-20 px-1.5 py-0.5 rounded-2xl w-36 font-main transition-colors duration-300 ease-out simple-3d-button-gradient",
                    {
                      // Primary state
                      "bg-slate-400 text-neutral-600 hover:bg-slate-300 active:pt-0.5 active:pb-0.5 active:mt-1 active:mb-[76px] cursor-pointer":
                        !buttonDisabled && !waiting && !isSent && !errorState,
                      // Waiting state
                      "bg-yellow-200 text-neutral-500 cursor-not-allowed":
                        !buttonDisabled && waiting,
                      // Success state
                      "bg-green-300 text-neutral-600 hover:bg-green-300 active:bg-slate-300 cursor-pointer":
                        !buttonDisabled && isSent,
                      // Error state
                      "bg-red-300 text-neutral-600 hover:bg-red-300 cursor-not-allowed":
                        errorState,
                      // Disabled state
                      "bg-neutral-300 text-neutral-500 cursor-not-allowed":
                        buttonDisabled,
                    }
                  )}
                  disabled={!!buttonDisabled}
                >
                  Send
                </button>
                {isSent && (
                  <AiFillCheckCircle className="ml-4 h-16 text-3xl text-gray-800" />
                )}
                {waiting && (
                  <AiOutlineLoading className="ml-4 h-16 text-3xl text-gray-800 animate-spin" />
                )}
                {errorState && (
                  <AiFillCloseCircle className="ml-4 h-16 text-3xl text-gray-800" />
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
