import React from "react";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet";
import { Navibar } from "../components/Navibar";
import { RegisterForm } from "../components/RegisterForm";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="App Login">
        <Navibar />

        <RegisterForm />
      </Container>
    );
  }
}

export default Register;
