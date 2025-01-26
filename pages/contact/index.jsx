import Contact from "@components/Portfolio/Contact/Contact";
import { Layout } from "@components/Portfolio/Layout/Layout";
import { PortfolioStyles } from "@styles/globals";

const Portfolio = () => {
  return (
    <Layout>
      <PortfolioStyles />
      <div className="container pb-40"></div>
      <Contact transparentSection />
    </Layout>
  );
};

export default Portfolio;
