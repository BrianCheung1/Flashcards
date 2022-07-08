import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";
var bcrypt = require("bcryptjs");

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  let navigate = useNavigate();

  const routeHome = () => {
    let path = "/";
    navigate(path);
  };

  const routeRegister = () => {
    let path = "/Register";
    navigate(path);
  };

  async function handleWordsSubmit(e) {
    e.preventDefault();
    let user = {
      username: username,
      password: password,
    };
    axios({
      method: "get",
      url: "/login",
      params: user,
    }).then((res) => {
      setHash(res.data.password);
    });
    let match = bcrypt.compareSync(password, hash);
  }

  return (
    <Col xs={8} md={5} lg={3}>
      <Form onSubmit={(e) => handleWordsSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Row xs="auto" md="auto">
          <Col>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={routeRegister}>
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}
export { LoginForm };
