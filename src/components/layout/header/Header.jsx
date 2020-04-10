import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <header className="Header">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Tasks Uni Project</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#tasks">Tasks</Nav.Link>
          <Nav.Link href="#users">Users</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#register">Register</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
