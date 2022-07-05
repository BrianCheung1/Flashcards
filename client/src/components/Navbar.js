import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navibar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      fixed="top"
      className="NavbarBackground"
    >
      <Container fluid>
        <Navbar.Brand href="/">Flashlet</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link
            href="https://github.com/BrianCheung1/Flashcards"
            target="_blank"
          >
            Github
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Navibar };
