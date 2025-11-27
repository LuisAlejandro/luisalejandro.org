"use client";

import { ENV_NAME, META_PIXEL_ID } from "@constants/constants";

export const trackPixelEvent = (eventName: string, data = {}) => {
  if (META_PIXEL_ID && ENV_NAME !== "local") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.trackCustom(eventName, data);
      });
  }
};
