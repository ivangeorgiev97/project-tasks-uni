import React from "react";

const content = "Ivan Georgiev - 1601681030";
const footerStyle = {
  position: "fixed",
  bottom: 0,
  backgroundColor: "rgb(248, 249, 250)",
  fontSize: "20px",
  width: "100%",
  textAlign: "center"
};

const Footer = () => {
  return (
    <footer style={footerStyle} className="Footer">
      { content }
    </footer>
  );
};

export default Footer;
