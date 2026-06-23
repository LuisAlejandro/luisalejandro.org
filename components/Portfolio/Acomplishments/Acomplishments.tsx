import { Stars } from "@constants/constants";

import { Section } from "@components/common/Layout/Section";
import { WaveDivider } from "@components/common/Layout/WaveDivider";

import { Box } from "./Box";
import { BoxNum } from "./BoxNum";
import { BoxText } from "./BoxText";
import { Boxes } from "./Boxes";

const Acomplishments = () => (
  <>
    <Section id="acomplishments" accent1 smallpadding>
      <Boxes>
        {Stars.map((card, index) => (
          <Box key={index}>
            <BoxNum>{`${card.number}+`}</BoxNum>
            <BoxText>{card.text}</BoxText>
          </Box>
        ))}
      </Boxes>
    </Section>
    <WaveDivider fill="#f8d983" />
  </>
);

export default Acomplishments;
