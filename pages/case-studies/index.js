import Projects from "@components/Portfolio/Projects/Projects";
import Gallery from "@components/Portfolio/Gallery/Gallery";
import { Layout } from "@components/Portfolio/Layout/Layout";
import { CaseStudiesStyles } from "@styles/globals";

const Cases = () => {
  return (
    <Layout>
      <CaseStudiesStyles />
      <Projects />
      <Gallery />
    </Layout>
  );
};

export default Cases;
