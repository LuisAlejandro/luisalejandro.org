import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Meta from "../meta";
import { Container } from "./LayoutStyles";

export const Layout = ({ children }) => {
  return (
    <Container itemScope="" itemType="http://schema.org/Blog">
      <meta itemProp="name" content="xxxx" />
      <meta itemProp="url" content="xxxx" />
      <meta itemProp="headline" content="xxxx" />
      <meta itemProp="description about" content="xxxx" />
      <meta itemProp="keywords" content="xxxx" />
      <meta itemProp="image" content="xxxx" />
      <meta itemProp="inLanguage" content="en" />
      <Meta />
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
