import OnVisible from "react-on-visible";

import ToutContent from "./ToutContent";


const ToutContentSlider = () => (
  <OnVisible
    visibleClassName="appear"
    percent={80}
    className="w-full relative toutContent-bg-purple"
  >
    <ToutContent textDirection="toutContent w-full text-left flex-row-reverse text-white" />
  </OnVisible>
);


export default ToutContentSlider;
