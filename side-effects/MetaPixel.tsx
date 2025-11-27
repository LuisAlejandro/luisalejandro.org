"use client";

import { ENV_NAME, META_PIXEL_ID } from "@constants/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pixel, setPixel] = useState<any>(null);

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        if (!META_PIXEL_ID || ENV_NAME === "local") {
          return;
        }

        // Initialize pixel
        const options = {
          autoConfig: true,
          debug: false,
        };

        ReactPixel.init(META_PIXEL_ID, undefined, options);
        setPixel(ReactPixel);
      });
  }, []);

  useEffect(() => {
    if (!pixel || !META_PIXEL_ID || ENV_NAME === "local") {
      return;
    }

    // Track page views on route changes
    pixel.pageView();
  }, [pathname, searchParams, pixel]);

  return null;
}
