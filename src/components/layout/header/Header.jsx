import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ headerTitle, leftLinks, rightLinks }) => {
  const finalLeftLinks = leftLinks.map((leftLink) =>
    leftLink.isVisible ? (
      <Link key={leftLink.id} className="nav-link" to={leftLink.path}>
        {leftLink.text}
      </Link>
    ) : null
  );
  const finalRightLinks = rightLinks.map((rightLink) =>
    rightLink.isVisible ? (
      <Link key={rightLink.id} className="nav-link" to={rightLink.path}>
        {rightLink.text}
      </Link>
    ) : null
  );

  return (
    <header className="Header">
      <Navbar bg="light" variant="light">
        <Link className="navbar-brand" to="/">
          {headerTitle}
        </Link>
        <Nav className="mr-auto">
          {finalLeftLinks}
        </Nav>
        <Nav>
          {finalRightLinks}
        </Nav>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  leftLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isVisible: PropTypes.bool.isRequired,
    }).isRequired
  ),
  rightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isVisible: PropTypes.bool.isRequired,
    }).isRequired
  ),
};

export default Header;
