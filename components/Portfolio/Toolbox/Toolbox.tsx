import { Skills } from "@constants/constants";

import { Section } from "@components/common/Layout/Section";
import { SectionText } from "@components/common/Layout/SectionText";
import { SectionTitle } from "@components/common/Layout/SectionTitle";

import List from "./List";
import ListContainer from "./ListContainer";
import ListItem from "./ListItem";
import ListParagraph from "./ListParagraph";
import ListTitle from "./ListTitle";

const Toolbox = () => (
  <Section className="mt-15" smallpadding>
    <SectionTitle>On my toolbox</SectionTitle>
    <SectionText>
      These are my preferred technologies when it comes to implementing your
      solutions.
    </SectionText>
    <List>
      {Skills.map((Skill) => (
        <ListItem key={Skill.slug}>
          <picture>
            <Skill.Component size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>{Skill.title}</ListTitle>
            <ListParagraph>{Skill.description}</ListParagraph>
          </ListContainer>
        </ListItem>
      ))}
    </List>
  </Section>
);

export default Toolbox;
