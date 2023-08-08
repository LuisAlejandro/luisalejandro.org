import { useEffect } from "react";
import Script from "next/script";

import { RECAPTCHA_API_KEY } from "@constants/constants";
import { Section, SectionTitle, SectionText } from "@styles/GlobalComponents";
import { blurHandler, submitHandler } from "./Form";

const Contact = () => {
  useEffect(() => {
    // Listen to all blur events
    document.addEventListener("blur", blurHandler, true);
    // Check all fields on submit
    document.addEventListener("submit", submitHandler, false);

    // everything is fully loaded, don't use me if you can use DOMContentLoaded
    window.addEventListener("load", () => {
      if (RECAPTCHA_API_KEY) {
        window.grecaptcha.render(document.getElementById("re-captcha"), {
          sitekey: RECAPTCHA_API_KEY,
          theme: "light",
          callback: () => {
            window.recaptchaState = window.grecaptcha.getResponse();
            if (window.recaptchaState.length != 0) {
              var id = "re-captcha";
              var field = document.getElementById(id);

              // Remove error class to field
              field.classList.remove("error");

              // Remove ARIA role from the field
              field.removeAttribute("aria-describedby");

              // Check if an error message is in the DOM
              var message = document.querySelector(
                ".error-message#error-for-" + id + ""
              );
              if (!message) return;

              // If so, hide it
              message.innerHTML = "";
              message.style.display = "none";
              message.style.visibility = "hidden";
            }
          },
        });
      }
    });
  }, []);

  return (
    <>
      <Section id="contact">
        <SectionTitle main>Contact</SectionTitle>
        <SectionText>
          Ask me anything! I might? be available for hire
        </SectionText>
        <div className="container">
          <form
            className="validate"
            name="contact-form"
            action="/.netlify/functions/portfolio-contact-form"
            method="post"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact-name"
                    name="contact-name"
                    minLength="3"
                    maxLength="256"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="contact-email"
                    name="contact-email"
                    minLength="6"
                    maxLength="256"
                    title="The domain portion of the email address is invalid (the portion after the @)."
                    pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                    required
                  />
                </div>
                <div className="form-group">
                  <div id="re-captcha"></div>
                </div>
                <div className="row">
                  <div className="col-lg-8 waiting">
                    <div className="loader">Waiting...</div>
                  </div>
                  <div className="col-lg-4">
                    <button
                      type="submit"
                      className="suscribe btn btn-custom-red float-right d-lg-block"
                      name="contact-subscribe"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    className="form-control"
                    id="contact-message"
                    name="contact-message"
                    minLength="3"
                    maxLength="1024"
                    required
                  ></textarea>
                </div>
                <div className="responses clear">
                  <div className="response mc-status"></div>
                </div>
              </div>
              <div className="col-lg-12 d-lg-none">
                <div hidden aria-hidden="true">
                  <input type="hidden" id="bot-field" name="bot-field" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Section>
      <Script
        src="/scripts/validity-polyfill.js"
        strategy="beforeInteractive"
      />
      {RECAPTCHA_API_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};

export default Contact;
