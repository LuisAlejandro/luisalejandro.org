import { Stars } from 'constants/constants';
import { Section, SectionDivider } from 'styles/GlobalComponents';

import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';


const Acomplishments = () => (
  <Section id="acomplishments">
    <Boxes>
      {Stars.map((card, index) => (
        <Box key={index}>
          <BoxNum>{`${card.number}+`}</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
    <SectionDivider />
  </Section>
);

export default Acomplishments;
