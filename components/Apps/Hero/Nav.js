import Link from "next/link";
import { LeftSection } from "./HeroStyles";

const Nav = () => (
  <>
    <LeftSection>
      <span className="button1">
        <Link
          rel="tag nofollow noreferrer"
          href="/apps/agoras"
          style={{ 
            margin: "50px 0 0 0",
           }}
        >
          Back
        </Link>
      </span>
    </LeftSection>
  </>
);

export default Nav;
