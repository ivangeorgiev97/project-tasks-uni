import React from "react";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Header = ({ headerTitle, leftLinks, rightLinks, onLogout }) => {
  const finalLeftLinks = leftLinks.map((leftLink) =>
    leftLink.isVisible ? (
      <Link key={leftLink.id} className="nav-link" to={leftLink.path}>
        {leftLink.text}
      </Link>
    ) : null
  );
  const finalRightLinks = rightLinks.map((rightLink) =>
    rightLink.isVisible && !rightLink.isLogout ? (
      <Link key={rightLink.id} className="nav-link" to={rightLink.path}>
        {rightLink.text}
      </Link>
    ) : rightLink.isVisible && rightLink.isLogout ? (
      <span key={rightLink.id} className="nav-link btn" onClick={onLogout}>
        {rightLink.text}
      </span>
    ) : null
  );

  return (
    <header className="Header">
      <Navbar bg="light" variant="light">
        <Link className="navbar-brand" to="/">
          {headerTitle}
        </Link>
        <Nav className="mr-auto">{finalLeftLinks}</Nav>
        <Nav>{finalRightLinks}</Nav>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  leftLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isVisible: PropTypes.bool.isRequired,
      isLogout: PropTypes.bool.isRequired
    })
  )
}

export default Header;
