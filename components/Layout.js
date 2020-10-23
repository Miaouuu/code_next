// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";

export default (props) => (
  <div className="layout">
    <Header />
    <div className="content">
      <div>
        <p>Oui</p>
      </div>
    </div>
    <Footer />
  </div>
);
