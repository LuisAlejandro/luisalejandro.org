import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Meta from "./meta";

import { Container } from "./LayoutStyles";

export const Layout = ({
  children
}: any) => {
  return (
    
    <Container>
      <Meta />
      <Header />
      
      <main>{children}</main>
      <Footer />
    </Container>
  );
};
