import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Navibar() {
  let navigate = useNavigate();

  const goToLogin = () => {
    let path = "/login";
    navigate(path);
  };

  const goToHome = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      fixed="top"
      className="NavbarBackground"
    >
      <Container fluid>
        <Navbar.Brand href="#" onClick={goToHome}>
          Flashlet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link
            href="https://github.com/BrianCheung1/Flashcards"
            target="_blank"
          >
            Github
          </Nav.Link>

          <Nav.Link href="#" onClick={goToLogin}>
            Login
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Navibar };
