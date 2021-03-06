import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

function Navibar() {
  let navigate = useNavigate();

  const goToLogin = () => {
    let path = "/login";
    if (localStorage.getItem("session_id")) {
      localStorage.removeItem("session_id");
      navigate(path);
    } else {
      navigate(path);
    }
  };

  const goToHome = () => {
    let path = "/login";
    if (localStorage.getItem("session_id")) {
      path = "/home";
      navigate(path);
    } else {
      path = "/login";
      navigate(path);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
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
            <FaGithubSquare size={25} />
          </Nav.Link>

          <Nav.Link href="#" onClick={goToLogin}>
            <FaSignInAlt size={25} />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Navibar };
