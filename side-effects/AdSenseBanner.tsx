"use client";

import { ADSENSE_PUBLISHER_ID, ENV_NAME } from "@constants/constants";
import { Adsense } from "@ctrl/react-adsense";
import { trackPixelEvent } from "@lib/pixel";
import { useEffect } from "react";

interface AdSenseBannerProps {
  slotId: string;
  className?: string;
  format?: string;
}

export default function AdSenseBanner({
  slotId,
  className = "",
  format = "auto",
}: AdSenseBannerProps) {
  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement instanceof HTMLIFrameElement) {
        trackPixelEvent("ClickAdSense", { slotId });
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [slotId]);

  if (!ADSENSE_PUBLISHER_ID || !slotId || ENV_NAME === "local") {
    return null;
  }

  return (
    <div className={`inline-block align-top w-full my-12 ${className}`}>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {/* AdSense Responsive Banner using @ctrl/react-adsense */}
          <Adsense
            client={ADSENSE_PUBLISHER_ID}
            slot={slotId}
            style={{ display: "block" }}
            format={format}
            responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
