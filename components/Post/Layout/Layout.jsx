import Footer from "@components/Blog/Footer/Footer";
import Header from "@components/Blog/Header/Header";

import Meta from "../meta";
import { Container } from "./LayoutStyles";

export const Layout = ({ children, metadata }) => {
  return (
    <Container>
      <Meta data={metadata} />
      <Header />
      <main
        style={{
          backgroundColor: "#fff",
          paddingBottom: "200px",
        }}
      >
        {children}
      </main>
      <div id="modal-container">
        <div id="modal-overlay">
          <div id="modal-vertical-offset">
            <div id="modal">
              <div id="modal-close">
                <span className="sprite"></span>
              </div>
              <div id="modal-content"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};
