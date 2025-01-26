import axios from "axios";
import * as yup from "yup";
import * as jose from "jose";
import cn from "classnames";

import { useRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AiFillCheckCircle,
  AiOutlineLoading,
  AiFillCloseCircle,
} from "react-icons/ai";

import { JWT_SECRET, RECAPTCHA_API_KEY } from "@constants/constants";
import {
  Section,
  SectionTitle,
  SectionText,
} from "@components/Portfolio/Contact/ContactStyles";

const Contact = ({
  transparentSection
}: any) => {
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

  const recaptchaRef = useRef();
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
      <Section id="contact" transparent={transparentSection}>
        <SectionTitle main>Contact</SectionTitle>
        <SectionText>
          Ask me anything! I might? be available for hire
        </SectionText>
        
        <form
          className="w-full max-w-[1040px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <div className="flex flex-col lg:flex-row">
            
            <div className="flex flex-col mx-6 lg:w-4/12 lg:mx-4">
              
              <label
                htmlFor="contactName"
                className="block m-1 text-3xl leading-normal font-main font-light"
              >
                Name
              
              </label>
              
              <input
                id="contactName"
                className="block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-3xl leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactName")}
              />
              
              <p className="block mx-1 h-[25px] text-2xl leading-normal font-main font-normal text-red-500">
                {errors.contactName?.message}
              
              </p>
              
              <label
                htmlFor="contactEmail"
                className="block m-1 text-3xl leading-normal font-main font-light "
              >
                Email
              
              </label>
              
              <input
                id="contactEmail"
                className="block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-3xl leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactEmail")}
              />
              
              <p className="block mx-1 h-[25px] text-2xl leading-normal font-main font-normal text-red-500">
                {errors.contactEmail?.message}
              
              </p>
              <ReCAPTCHA
                className="recaptcha my-5"
                theme="light"
                ref={recaptchaRef}
                sitekey={RECAPTCHA_API_KEY}
                onChange={() => setIsVerified(true)}
                onExpired={() => setIsVerified(false)}
                onErrored={() => setIsVerified(false)}
              />
            
            </div>
            
            <div className="flex flex-col mx-6 lg:w-8/12 lg:mx-4">
              
              <label
                htmlFor="contactMessage"
                className="block m-1 text-3xl leading-normal font-main font-light"
              >
                Message
              
              </label>
              
              <textarea
                id="contactMessage"
                className="textarea block my-1 px-3 py-1.5 w-full rounded-xl bg-white border-transparent text-3xl leading-normal font-main font-light focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
                {...register("contactMessage")}
              
              ></textarea>
              
              <p className="block mx-1 h-[25px] text-2xl leading-normal font-main font-normal text-red-500">
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
                  disabled={buttonDisabled}
                >
                  Send
                
                </button>
                {isSent && (
                  
                  <AiFillCheckCircle className="ml-4 h-[6.5rem] text-5xl text-[#333]" />
                )}
                {waiting && (
                  
                  <AiOutlineLoading className="ml-4 h-[6.5rem] text-5xl text-[#333] animate-spin" />
                )}
                {errorState && (
                  
                  <AiFillCloseCircle className="ml-4 h-[6.5rem] text-5xl text-[#333]" />
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
