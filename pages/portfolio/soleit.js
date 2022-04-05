import { ParallaxProvider } from "react-scroll-parallax";

import ToutContent from "@/components/CaseStudies/ToutContent";
import CardCollection from "@/components/CaseStudies/CardCollection";
import ToutOverlap from "@/components/CaseStudies/ToutOverlap";
import BigTextLittleText from "@/components/CaseStudies/BigTextLittleText";
import VerticalLine from "@/components/CaseStudies/VerticalLine";
import CardSlider from "@/components/CaseStudies/CardSlider";
import Pullout from "@/components/CaseStudies/Pullout";
import Header from "@/components/CaseStudies/Header";
import Footer from "@/components/CaseStudies/Footer";
import { Layout } from '@/components/CaseStudies/Layout';


const Soleit = () => {
  return (
    <Layout>
      <div id="cases">
        <Header />
        <ParallaxProvider>
          <div className="cases-content">
            <div className="w-screen h-screen page-hero" />
            <ToutContent textDirection="toutContent w-full my-0 mb-4 mx-auto py-20 sm:py-0 flex flex-col-reverse sm:flex-row text-left sm:text-right" />
            <ToutContent textDirection="toutContent w-full my-0 mb-4 mx-auto py-20 sm:py-0 flex flex-col-reverse sm:flex-row-reverse text-left" />
            <div className="bg-green w-full">
              <ToutContent textDirection="toutContent w-full my-0 mx-auto py-20 sm:py-0 flex flex-col-reverse sm:flex-row text-left sm:text-right bg-green" />
            </div>
            <div className="bg-purple w-full">
              <ToutContent textDirection="toutContent w-full my-0 mx-auto py-20 sm:py-0 flex flex-col-reverse sm:flex-row-reverse text-left bg-purple" />
            </div>
            <div className="w-full toutContent mx-auto">
              <ToutOverlap
                toutOverlapContent="tout-overlap mx-auto my-0 bg-left"
                totuOverlapText="toutCopy--overlap w-full ml-auto sm:w-1/2 bg-green"
              />
            </div>
            <BigTextLittleText />
            <VerticalLine />
            <ToutOverlap
              toutOverlapContent="toutContent tout-overlap mx-auto my-0 bg-right "
              totuOverlapText="toutCopy--overlap mr-auto w-full sm:w-1/2 bg-orange"
            />
            <div className="flex w-full">
              <CardCollection />
            </div>
            <CardSlider />
            <Pullout pulloutBackground="bg-green" />
          </div>
        </ParallaxProvider>
        <Footer />
      </div>
    </Layout>
  );
};

export default Soleit;
