import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   //setMatch(bcrypt.compareSync(password, hash));
  //   console.log(match)
  // }, [hash]);

  let navigate = useNavigate();

  const routeHome = () => {
    let path = "/home";
    navigate(path);
  };

  const routeRegister = () => {
    let path = "/Register";
    navigate(path);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login/Password Not Found
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={props.onHide}>Try Again</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  async function handleWordsSubmit(e) {
    e.preventDefault();
    let user = {
      username: username,
      password: password,
    };

    loginUser(user).then((res) => {
      if (res == true) {
        routeHome();
      } else {
        setModalShow(true);
      }
    });
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Col>
  );
}
export { LoginForm };
