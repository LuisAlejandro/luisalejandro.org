"use client";

import { useEffect } from "react";

export default function BlogClient() {
  useEffect(() => {
    const share_buttons = document.querySelectorAll(
      "#content > .preview > .bg ul.socialbar > .share > button, #featured-preview > .preview > .bg ul.socialbar > .share > button, #featured > article > .bg ul.socialbar > .share > button"
    );

    share_buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const pid = button.getAttribute("data-ident");
        const share_dialog = document.querySelectorAll(
          "#post-" + pid + " .socialpop"
        );
        const post_bg = document.querySelectorAll("#post-" + pid + " > .bg");

        button.classList.toggle("active");

        for (let i = 0; i < share_dialog.length; i++) {
          share_dialog[i].classList.toggle("show");
        }

        for (let i = 0; i < post_bg.length; i++) {
          post_bg[i].classList.toggle("dark");
        }
      });
    });
  }, []);

  return (
    <style jsx global>{`
      .socialpop.show {
        display: inline-block !important;
      }

      .bg.dark {
        box-shadow:
          1px 0 0 0 rgb(190, 190, 190) inset,
          -1px 1px 0 0 rgb(190, 190, 190) inset,
          0 -350px 0 0 rgba(0, 0, 0, 0.3) inset !important;
      }
    `}</style>
  );
}
