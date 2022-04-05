import Fade from "react-reveal/Fade";

import ToutText from "./ToutText";
import ToutHeader from "./ToutHeader";
import Cta from "./Cta";


const ToutContentSlider = () => (
  <div className="toutCopy w-full sm:w-1/2">
    <Fade bottom>
      <ToutHeader />
      <ToutText />
      <Cta />
    </Fade>
  </div>
);


export default ToutContentSlider;
