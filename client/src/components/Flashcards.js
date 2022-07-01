import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {deleteWords} from "../api/api"
 
function Flashcards(props) {
  const listOfWords = props.words;

  //sets parent state of words to new value
  function handleDeleteWord(newWords){
    props.setStateOfWordsAfterDelete(newWords)
  }


  //maps through parent state words and creates a card for every word
  function wordList() {
    return listOfWords.map((word, index) => {
      return (
        //<li key={index}>{word.word}</li>;
        <Col xs="auto" md="auto" key={index}>
          <Card
            style={{ width: "30rem", height: "22rem" }}
            bg="dark"
            text="light"
            border="primary"
            className="mb-3"
          >
            <Card.Header className="border-0 bg-dark FlashcardsWord">
              {word.word}
            </Card.Header>
            <Card.Body className="FlashcardsDefinition">
              {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
              <Card.Text>{word.definition}</Card.Text>
            </Card.Body>
            <Card.Footer className="border-0 bg-dark">
              <Button
                variant="link"
                onClick={() => {
                  deleteWords(word._id);
                  listOfWords.splice(listOfWords.indexOf(word), 1);
                  handleDeleteWord(listOfWords)
                }}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  }

  return (
    wordList()
  );
}

export { Flashcards };
