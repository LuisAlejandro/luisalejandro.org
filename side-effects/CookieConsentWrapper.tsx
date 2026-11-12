"use client";

import CookieConsent from "react-cookie-consent";

/**
 * A small pill in the corner rather than a card over the page. Copy, storage
 * and the accept action are unchanged; only the size and placement moved.
 */
export default function CookieConsentWrapper() {
  return (
    <CookieConsent
      buttonText="Got it"
      disableStyles
      location="none"
      hideOnAccept={false}
      style={{
        position: "fixed",
        right: "0.75rem",
        bottom: "0.75rem",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        maxWidth: "21rem",
        padding: "0.5rem 0.5rem 0.5rem 0.85rem",
        borderRadius: "999px",
        border: "1px solid #0e0e0d52",
        background: "#f4f4f0",
        color: "#0e0e0d",
        fontSize: "0.78rem",
        lineHeight: "1.35",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
      contentStyle={{ margin: 0, flex: "1 1 12rem" }}
      buttonStyle={{
        border: 0,
        borderRadius: "999px",
        padding: "0.35rem 0.8rem",
        background: "#d61f3a",
        color: "#f4f4f0",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        justifySelf: "end",
      }}
      customButtonWrapperAttributes={{ style: { margin: 0 } }}
      onAccept={() => {
        const elm = document.querySelector<HTMLElement>(".CookieConsent");
        if (elm) elm.style.opacity = "0";
      }}
    >
      Cookies, for analytics.
    </CookieConsent>
  );
}
