"use client";

import CookieConsent from "react-cookie-consent";

export default function CookieConsentWrapper() {
  return (
    <CookieConsent
      buttonText="Got it!"
      style={{
        display: "flex",
        background: "#505859",
        color: "#fff",
        padding: "1.2em",
        position: "fixed",
        right: "1em",
        bottom: "1em",
        fontSize: "16px",
        lineHeight: "1.5em",
        maxWidth: "24em",
        borderRadius: "5px",
        zIndex: 9999,
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "baseline",
        opacity: "0.9",
        transition: "opacity 1s ease",
      }}
      contentStyle={{
        margin: "0 0 1em 0",
      }}
      buttonStyle={{
        background: "#6c7777",
        color: "#fff",
        borderColor: "transparent",
        borderRadius: "5px",
        padding: ".4em .8em",
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "700",
        borderWidth: "2px",
        borderStyle: "solid",
        textAlign: "center",
        margin: "0",
        minWidth: "140px",
      }}
      customButtonWrapperAttributes={{
        style: {
          textAlign: "center",
          display: "inline",
          width: "100%",
        },
      }}
      disableStyles={true}
      location="none"
      hideOnAccept={false}
      onAccept={() => {
        const elm = document.querySelector<HTMLElement>(".CookieConsent")!;
        elm.style.opacity = "0";
      }}
    >
      This website uses cookies to ensure you get the best experience on our
      website.
    </CookieConsent>
  );
}
