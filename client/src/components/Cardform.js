import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Cardform(props) {
  const wordWord = props.word;
  const wordDefinition = props.definition;

  //changes the word state of the parent class
  function handleWordChange(word) {
    props.setStateOfWordInParent(word);
  }

  //changes the definition state of the aprent class
  function handleDefinitionChange(definition) {
    props.setStateOfDefinitionInParent(definition);
  }

  //When user clicks sumbit, the word and definition are transfered to to the backend
  //The backend then transfers it to the database
  function handleWordsSubmit(e) {
    e.preventDefault();
    let newWords = {
      word: wordWord,
      definition: wordDefinition,
    };
    props.setStateOfWordsInParent(newWords);
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
      <Button variant="primary" type="submit">
        Create Card
      </Button>
    </Form>
  );
}

export { Cardform };
