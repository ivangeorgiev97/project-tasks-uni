import React from "react";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  backgroundColor: "rgb(248, 249, 250)",
  fontSize: "20px",
  width: "100%",
  textAlign: "center"
};

const Footer = props => {
  return (
    <footer style={footerStyle} className="Footer">
      { props.content }
    </footer>
  );
};

export default Footer;
