"use client";

import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

export default function ContactPage() {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main>
        <div className="container pb-80"></div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
