import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";

const Header = () => {
  const store = useStore();
  const user = store.getState().users.currentUser;
  const headerTitle = "Tasks uni project";
  const leftLinks = [
      // { id: 1, path: "/", text: "Home", isVisible: true },
      { id: 2, path: "/tasks", text: "Tasks", isVisible: true },
      { id: 3, path: "/users", text: "Users", isVisible: true },
    ];
   const rightLinks = [
      {
        id: 4,
        path: "/registration",
        text: "Registration",
        isVisible: user && Object.keys(user).length === 0,
      },
      {
        id: 5,
        path: "/login",
        text: "Login",
        isVisible: user && Object.keys(user).length === 0,
      },
      {
        id: 5,
        path: "/logout",
        text: "Logout",
        isVisible: user && Object.keys(user).length !== 0,
      },
    ];

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

export default Header;
