import React from "react";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  backgroundColor: "rgb(248, 249, 250)",
  fontSize: "20px",
  width: "100%"
};

const Footer = () => {
  return (
    <footer style={footerStyle} className="Footer">
      Ivan Georgiev - 1601681030
    </footer>
  );
};

export default Footer;
