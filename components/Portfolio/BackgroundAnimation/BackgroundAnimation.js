import { useEffect } from "react";

import Portfolio from "assets/images/portfolio.svg";
import Blog from "assets/images/blog.svg";
import Contact from "assets/images/contact.svg";
import Easter from "assets/images/easter.svg";
import Donations from "assets/images/donations.svg";

const BackgroundAnimation = () => {
  useEffect(() => {
    const portfolioPos = { x: 0, y: 0 };
    const blogPos = { x: 0, y: 0 };
    const donationsPos = { x: 0, y: 0 };
    const easterPos = { x: 0, y: 0 };
    const contactPos = { x: 0, y: 0 };

    const movePortfolio = function (x, y) {
      const el = document.querySelector("#portfolio-bg > .container-portfolio");
      if (!el) return;
      portfolioPos.x = (x / window.innerWidth).toFixed(2);
      portfolioPos.y = (y / window.innerHeight).toFixed(2);
      el.style.transform = `translate(${10 * portfolioPos.x + 0}px, ${
        10 * portfolioPos.y + 0
      }px) rotateZ(30deg)`;
    };

    const moveBlog = function (x, y) {
      const el = document.querySelector("#portfolio-bg > .container-blog");
      if (!el) return;
      blogPos.x = (x / window.innerWidth).toFixed(2);
      blogPos.y = (y / window.innerHeight).toFixed(2);
      el.style.transform = `translate(${30 * blogPos.x - 450}px, ${
        30 * blogPos.y + 50
      }px) rotateZ(-30deg)`;
    };

    const moveContact = function (x, y) {
      const el = document.querySelector("#portfolio-bg > .container-contact");
      if (!el) return;
      donationsPos.x = (x / window.innerWidth).toFixed(2);
      donationsPos.y = (y / window.innerHeight).toFixed(2);
      el.style.transform = `translate(${-10 * donationsPos.x - 450}px, ${
        -10 * donationsPos.y - 300
      }px) rotateZ(-50deg)`;
    };

    const moveEaster = function (x, y) {
      const el = document.querySelector("#portfolio-bg > .container-easter");
      if (!el) return;
      easterPos.x = (x / window.innerWidth).toFixed(2);
      easterPos.y = (y / window.innerHeight).toFixed(2);
      el.style.transform = `translate(${-20 * easterPos.x - 250}px, ${
        -20 * easterPos.y + 250
      }px) rotateZ(20deg)`;
    };

    const moveDonations = function (x, y) {
      const el = document.querySelector("#portfolio-bg > .container-donations");
      if (!el) return;
      contactPos.x = (x / window.innerWidth).toFixed(2);
      contactPos.y = (y / window.innerHeight).toFixed(2);
      el.style.transform = `translate(${-30 * contactPos.x + 0}px, ${
        10 * contactPos.y + 100
      }px) rotateZ(150deg)`;
    };

    const mousemoveCallback = (e) => {
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
    <div id="portfolio-bg">
      <Portfolio className="container-portfolio" />
      <Blog className="container-blog" />
      <Contact className="container-contact" />
      <Easter className="container-easter" />
      <Donations className="container-donations" />
    </div>
  );
};

export default BackgroundAnimation;
