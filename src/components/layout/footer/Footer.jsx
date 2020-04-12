import React from "react";
import PropTypes from "prop-types";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  backgroundColor: "rgb(248, 249, 250)",
  fontSize: "20px",
  width: "100%",
  textAlign: "center"
};

const Footer = ({ content }) => {
  return (
    <footer style={footerStyle} className="Footer">
      { content }
    </footer>
  );
};

Footer.propTypes = {
  content: PropTypes.string.isRequired
}

export default Footer;
