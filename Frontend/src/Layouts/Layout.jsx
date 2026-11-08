import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;