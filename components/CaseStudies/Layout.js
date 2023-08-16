import Meta from "./meta";

import { Container } from "./LayoutStyles";

export const Layout = ({ children }) => {
  return (
    <Container>
      <Meta />
      <main>{children}</main>
    </Container>
  );
};
