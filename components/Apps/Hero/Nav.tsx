import Link from "next/link";

import { LeftSection } from "@components/Portfolio/Hero/LeftSection";

const Nav = () => (
  <>
    <LeftSection>
      <span className="button1">
        <Link
          legacyBehavior
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
