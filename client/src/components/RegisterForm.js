import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";
var bcrypt = require("bcryptjs");

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var salt = bcrypt.genSaltSync(10);
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/Login";
    navigate(path);
  };

  function handleWordsSubmit(e) {
    var hash = bcrypt.hashSync(password, salt);

    e.preventDefault();
    let user = {
      username: username,
      password: hash,
    };
    axios.post("/register", user);
    e.target.reset();
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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
          <Form.Text className="text-muted">
            Passwords are encrypted before being saved
          </Form.Text>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group> */}
        <Row xs="auto" md="auto">
          <Col>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}
export { RegisterForm };
