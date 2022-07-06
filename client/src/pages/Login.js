import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";
import { Helmet } from "react-helmet";
import { Navibar } from "../components/Navibar";
import { LoginForm} from "../components/LoginForm"


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="App Login">
        <Navibar />
        <Row>
          <Col>
          <LoginForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
