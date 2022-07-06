import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa"
import {IoLogInSharp} from "react-icons/io5"

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
            <FaGithubSquare size={25}/>
          </Nav.Link>

          <Nav.Link href="#" onClick={goToLogin}>
            <IoLogInSharp size={32}/>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Navibar };
