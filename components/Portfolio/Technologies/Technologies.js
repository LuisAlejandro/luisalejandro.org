import { Section, SectionDivider, SectionText, SectionTitle } from "styles/GlobalComponents";
import { Skills } from 'constants/constants';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from "./TechnologiesStyles";


const Technologies = () => (
  <Section id="skills">
    <SectionDivider divider />
    <SectionTitle>On my toolbox</SectionTitle>
    <SectionText>
      These are my preferred technologies when it comes to implementing your solutions.
    </SectionText>
    <List>
      {Skills.map((Skill) => (
        <ListItem key={Skill.slug}>
          <picture>
            <Skill.Component size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>{Skill.title}</ListTitle>
            <ListParagraph>
              <Skill.Description />
            </ListParagraph>
          </ListContainer>
        </ListItem>
      ))}
    </List>
    <SectionDivider colorAlt />
  </Section>
);


export default Technologies;
