import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Cardform(props) {
  const [show, setShow] = useState(false);
  const [testWord, setTestWord] = useState("");
  const [testDef, setTestDef] = useState("");

  function handleWordsChange(words) {
    props.setStateOfWordsInParent(words);
  }
  //When user clicks sumbit, the word and definition are transfered to to the backend
  //The backend then transfers it to the database
  function handleWordsSubmit(e) {
    setShow(true);
    e.preventDefault();
    let newWords = {
      word: testWord,
      definition: testDef,
    };
    handleWordsChange(newWords);
    setTestWord("");
    setTestDef("");
    e.target.reset();
  }

  return (
    <Form onSubmit={(e) => handleWordsSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label>Word</Form.Label> */}
        <Form.Control
          type="text"
          required
          placeholder="Enter word"
          onChange={(e) => {
            setTestWord(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label>Definition</Form.Label> */}
        <Form.Control
          as="textarea"
          rows={5}
          required
          placeholder="Enter Defintion"
          onChange={(e) => {
            setTestDef(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Card
      </Button>
      <ToastContainer position="top-end" className="ToastBackground">
        <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
          <Toast.Body>Flashcard Created</Toast.Body>
        </Toast>
      </ToastContainer>
    </Form>
  );
}

export { Cardform };
