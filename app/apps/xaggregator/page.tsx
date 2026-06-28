"use client";

import XaggregatorTool from "@components/Apps/Xaggregator/XaggregatorTool";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

export default function XaggregatorPage() {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        lang="es"
        className="px-4 py-8 lg:px-8"
      >
        <XaggregatorTool />
      </main>
      <Footer />
    </div>
  );
}
