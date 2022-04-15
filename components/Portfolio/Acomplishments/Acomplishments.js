import { Stars } from 'constants/constants';
import { Section } from 'styles/GlobalComponents';

import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';


const Acomplishments = () => (
  <>
    <Section id="acomplishments" accent1>
      <Boxes>
        {Stars.map((card, index) => (
          <Box key={index}>
            <BoxNum>{`${card.number}+`}</BoxNum>
            <BoxText>{card.text}</BoxText>
          </Box>
        ))}
      </Boxes>
    </Section>
    <svg viewBox="0 0 1920 100">
      <path fill="#f8d983" d="M960,50l960-50H0L960,50z"/>
    </svg>
  </>
);

export default Acomplishments;
