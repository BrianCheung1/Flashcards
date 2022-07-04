import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Cardform(props) {
  const wordWord = props.word;
  const wordDefinition = props.definition;
  const [show, setShow] = useState(false);

  //changes the word state of the parent class
  function handleWordChange(word) {
    props.setStateOfWordInParent(word);
  }

  //changes the definition state of the aprent class
  function handleDefinitionChange(definition) {
    props.setStateOfDefinitionInParent(definition);
  }

  function handleWordsChange(words) {
    props.setStateOfWordsInParent(words);
  }
  //When user clicks sumbit, the word and definition are transfered to to the backend
  //The backend then transfers it to the database
  function handleWordsSubmit(e) {
    e.preventDefault();
    let newWords = {
      word: wordWord,
      definition: wordDefinition,
    };
    handleWordsChange(newWords);
    e.target.reset();
  }

  return (
    <Form onSubmit={(e) => handleWordsSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label>Word</Form.Label> */}
        <Form.Control
          type="text"
          placeholder="Enter word"
          onChange={(e) => {
            handleWordChange(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label>Definition</Form.Label> */}
        <Form.Control
          type="text"
          placeholder="Enter Defintion"
          onChange={(e) => {
            handleDefinitionChange(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => setShow(true)}>
        Create Card
      </Button>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Flashcard Created</Toast.Body>
        </Toast>
      </ToastContainer>
    </Form>
  );
}

export { Cardform };
