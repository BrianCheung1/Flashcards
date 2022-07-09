import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
var bcrypt = require("bcryptjs");

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  var salt = bcrypt.genSaltSync(10);
  let navigate = useNavigate();

  const routeLogin = () => {
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
    registerUser(user);
    e.target.reset();
    setShow(true);
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
            <Button variant="primary" type="submit" onClick={routeLogin}>
              Login
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer position="top-end" className="ToastBackground">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>Account Created Successfully</Toast.Header>
          <Toast.Body>Please Login</Toast.Body>
        </Toast>
      </ToastContainer>
    </Col>
  );
}
export { RegisterForm };
