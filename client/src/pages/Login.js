import React from "react";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet";
import { Navibar } from "../components/Navibar";
import { LoginForm } from "../components/LoginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="App Login">
        <Navibar />
        <LoginForm />
      </Container>
    );
  }
}

export default Login;
