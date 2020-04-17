import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="Layout">
      <Header />
      <div className="container"></div>
      <Footer content="Ivan Georgiev - 1601681030" />
    </div>
  );
};

export default Layout;
