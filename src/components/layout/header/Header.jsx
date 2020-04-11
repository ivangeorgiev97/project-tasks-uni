import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Tasks Uni Project</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" exact to="/">
            Home
          </Link>
          <Link className="nav-link" to="/tasks">
            Tasks
          </Link>
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to="/registration">
            Registration
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
