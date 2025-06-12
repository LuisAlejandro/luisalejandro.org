import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export const Layout = ({ children }: any) => {
  return (
    <div
      itemScope={true}
      itemType="http://schema.org/Blog"
      className="bg-[#ddd] w-full my-0 mx-auto"
    >
      <Header />
      <main className="bg-white pb-200px">{children}</main>
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
    </div>
  );
};
