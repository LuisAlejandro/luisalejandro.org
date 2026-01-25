import { Button1 } from "@components/Portfolio/Hero/Button1";
import { LeftSection } from "@components/Portfolio/Hero/LeftSection";
import { ResumeLink } from "@components/Portfolio/Hero/ResumeLink";

const Nav = () => (
  <>
    <LeftSection>
      <Button1>
        <ResumeLink rel="tag nofollow noreferrer" href="/apps/agoras">
          Back
        </ResumeLink>
      </Button1>
    </LeftSection>
  </>
);

export default Nav;
