import Meta from "./meta";

import { Container } from "./LayoutStyles";

export const Layout = ({
  children
}: any) => {
  return (
    
    <Container>
      <Meta />
      
      <main>{children}</main>
    </Container>
  );
};
