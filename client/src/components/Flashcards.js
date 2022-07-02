import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteWords } from "../api/api";

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

  //maps through parent state words and creates a card for every word
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
          <Button
            variant="link"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </Button>
        )}
      </Col>
    );
  }

  return wordList();
}

export { Flashcards };
