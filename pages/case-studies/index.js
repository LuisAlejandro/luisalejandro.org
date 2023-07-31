import { CaseStudiesStyles } from 'styles/globals';
import Projects from '@components/Portfolio/Projects/Projects';
import Gallery from '@components/Portfolio/Gallery/Gallery';
import { Layout } from '@components/Portfolio/Layout/Layout';


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
