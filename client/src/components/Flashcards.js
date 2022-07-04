import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteWords } from "../api/api";
import Form from "react-bootstrap/Form";

function Flashcards(props) {
  const wordWord = props.word;
  const wordWords = props.words;
  const wordDefinition = props.definition;
  const wordId = props.id;
  const wordData = props.wordData;
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDefinition, setDraftDefinition] = useState("");

  //sets parent state of words to new value
  function handleDeleteWord(wordData) {
    wordWords.splice(wordWords.indexOf(wordData), 1);
    props.setStateOfWordsAfterDelete(wordWords);
  }

  //changes the word state of the parent class
  function handleWordChange(word) {
    props.setStateOfWordInParent(word);
    setDraftName(word);
  }

  //changes the definition state of the aprent class
  function handleDefinitionChange(definition) {
    props.setStateOfDefinitionInParent(definition);
    setDraftDefinition(definition);
  }

  function handleWordsChange(words) {
    props.setStateOfWordsInParentUpdated(words);
  }

  //When user clicks sumbit, the word and definition are transfered to to the backend
  //The backend then transfers it to the database
  function handleWordsSubmit(e) {
    let newWords = {
      id: wordId,
      word: draftName,
      definition: draftDefinition,
    };
    handleWordsChange(newWords);
  }

  //Creates a card with word and defintion
  //Delete button to delete it off the database
  //Edit button to update the word or defintion and update on database
  function wordList() {
    return (
      //<li key={index}>{word.word}</li>;

      <Col xs="auto" md="auto">
        {!isEditing && (
          <Card
            style={{ width: "35rem", height: "22rem" }}
            bg="dark"
            text="light"
            border="primary"
            className="mb-3"
          >
            <Card.Header className="border-0 bg-dark FlashcardsWord">
              {wordWord}
            </Card.Header>
            <Card.Body className="FlashcardsDefinition">
              {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
              <Card.Text>{wordDefinition}</Card.Text>
            </Card.Body>
            <Card.Footer className="border-0 bg-dark">
              <Button
                variant="link"
                onClick={() => {
                  handleDeleteWord(wordData);
                  deleteWords(wordId);
                }}
              >
                Delete
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setDraftName(wordWord);
                  setDraftDefinition(wordDefinition);
                }}
              >
                Edit
              </Button>
            </Card.Footer>
          </Card>
        )}
        {isEditing && (
          <Card
            style={{ width: "35rem", height: "22rem" }}
            bg="dark"
            text="light"
            border="primary"
            className="mb-3"
          >
            <Card.Header className="border-0 bg-dark FlashcardsWord">
              <Form.Control
                type="text"
                placeholder={draftName}
                onChange={(e) => {
                  handleWordChange(e.target.value);
                }}
              />
            </Card.Header>
            <Card.Body className="FlashcardsDefinition">
              {/* <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle> */}
              <Form.Control
                type="text"
                placeholder={draftDefinition}
                onChange={(e) => {
                  handleDefinitionChange(e.target.value);
                }}
              />
            </Card.Body>
            <Card.Footer className="border-0 bg-dark">
              <Button
                variant="link"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="link"
                onClick={(e) => {
                  setIsEditing(!isEditing);
                  handleWordsSubmit(e);
                }}
              >
                Save
              </Button>
            </Card.Footer>
          </Card>
        )}
      </Col>
    );
  }

  return wordList();
}

export { Flashcards };
