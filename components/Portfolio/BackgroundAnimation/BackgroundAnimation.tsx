import { useEffect } from "react";

import Blog from "@assets/images/blog.svg";
import Contact from "@assets/images/contact.svg";
import Donations from "@assets/images/donations.svg";
import Easter from "@assets/images/easter.svg";
import Portfolio from "@assets/images/portfolio.svg";

const BackgroundAnimation = () => {
  useEffect(() => {
    const portfolioPos = { x: 0, y: 0 };
    const blogPos = { x: 0, y: 0 };
    const donationsPos = { x: 0, y: 0 };
    const easterPos = { x: 0, y: 0 };
    const contactPos = { x: 0, y: 0 };

    const movePortfolio = function (x: any, y: any) {
      const el = document.querySelector(
        "#portfolio-bg > .container-portfolio"
      ) as HTMLElement;
      if (!el) return;

      portfolioPos.x = Number((x / window.innerWidth).toFixed(2));

      portfolioPos.y = Number((y / window.innerHeight).toFixed(2));

      el.style.transform = `translate(${10 * portfolioPos.x + 0}px, ${
        10 * portfolioPos.y + 0
      }px) rotateZ(30deg)`;
    };

    const moveBlog = function (x: any, y: any) {
      const el = document.querySelector(
        "#portfolio-bg > .container-blog"
      ) as HTMLElement;
      if (!el) return;

      blogPos.x = Number((x / window.innerWidth).toFixed(2));

      blogPos.y = Number((y / window.innerHeight).toFixed(2));

      el.style.transform = `translate(${30 * blogPos.x - 450}px, ${
        30 * blogPos.y + 50
      }px) rotateZ(-30deg)`;
    };

    const moveContact = function (x: any, y: any) {
      const el = document.querySelector(
        "#portfolio-bg > .container-contact"
      ) as HTMLElement;
      if (!el) return;

      contactPos.x = Number((x / window.innerWidth).toFixed(2));

      contactPos.y = Number((y / window.innerHeight).toFixed(2));

      el.style.transform = `translate(${-10 * contactPos.x - 450}px, ${
        -10 * contactPos.y - 300
      }px) rotateZ(-50deg)`;
    };

    const moveEaster = function (x: any, y: any) {
      const el = document.querySelector(
        "#portfolio-bg > .container-easter"
      ) as HTMLElement;
      if (!el) return;

      easterPos.x = Number((x / window.innerWidth).toFixed(2));

      easterPos.y = Number((y / window.innerHeight).toFixed(2));

      el.style.transform = `translate(${-20 * easterPos.x - 250}px, ${
        -20 * easterPos.y + 250
      }px) rotateZ(20deg)`;
    };

    const moveDonations = function (x: any, y: any) {
      const el = document.querySelector(
        "#portfolio-bg > .container-donations"
      ) as HTMLElement;
      if (!el) return;

      donationsPos.x = Number((x / window.innerWidth).toFixed(2));

      donationsPos.y = Number((y / window.innerHeight).toFixed(2));

      el.style.transform = `translate(${-30 * donationsPos.x + 0}px, ${
        10 * donationsPos.y + 100
      }px) rotateZ(150deg)`;
    };

    const mousemoveCallback = (e: any) => {
      movePortfolio(e.clientX, e.clientY);
      moveBlog(e.clientX, e.clientY);
      moveContact(e.clientX, e.clientY);
      moveEaster(e.clientX, e.clientY);
      moveDonations(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", mousemoveCallback);

    return () => {
      document.removeEventListener("mousemove", mousemoveCallback);
    };
  }, []);

  return (
    <div
      id="portfolio-bg"
      className="hidden lg:block relative -top-[50px] -right-[50px]"
    >
      <Portfolio
        className="container-portfolio absolute bottom-0 right-0 h-[500px] w-[500px]"
        style={{
          transform: "translate(0px, 0px) rotateZ(30deg)",
        }}
      />
      <Blog
        className="container-blog absolute bottom-0 right-0 h-[250px] w-[250px]"
        style={{
          transform: "translate(-450px, 50px) rotateZ(-30deg)",
        }}
      />
      <Contact
        className="container-contact absolute bottom-0 right-0 h-[150px] w-[150px]"
        style={{
          transform: "translate(-450px, -300px) rotateZ(-50deg)",
        }}
      />
      <Easter
        className="container-easter absolute bottom-0 right-0 h-[300px] w-[300px]"
        style={{
          transform: "translate(-250px, 250px) rotateZ(20deg)",
        }}
      />
      <Donations
        className="container-donations absolute bottom-0 right-0 h-[170px] w-[170px]"
        style={{
          transform: "translate(0px, 100px) rotateZ(150deg)",
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
