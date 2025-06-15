"use client";

import { useEffect } from "react";

export default function BlogCategoryClient() {
  useEffect(() => {
    const share_buttons = document.querySelectorAll(
      "#content > .preview > .bg > ul.socialbar > .share > button, #featured > article > .bg > ul.socialbar > .share > button"
    );

    share_buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const pid = button.getAttribute("data-ident");
        const share_dialog = document.querySelectorAll(
          "#post-" + pid + " > .bg > .socialpop"
        );
        const post_bg = document.querySelectorAll("#post-" + pid + " > .bg");

        button.classList.toggle("active");
        if (share_dialog.length > 0) share_dialog[0].classList.toggle("show");
        if (post_bg.length > 0) post_bg[0].classList.toggle("dark");
      });
    });
  }, []);

  return null; // This component only provides side effects
}
