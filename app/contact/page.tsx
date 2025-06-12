"use client";

import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

export default function ContactPage() {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main>
        <style jsx global>{`
          body {
            font-family: var(--font-roboto), sans-serif;
            font-size: 1.6rem;
            background-color: #f5cc6a;
            color: #222222;
            cursor: default;
            overflow-x: hidden;
          }
        `}</style>
        <div className="container pb-80"></div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
