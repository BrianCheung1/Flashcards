import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "../App.css";
import { getTest, getWords, createWords } from "../api/api";
import { Cardform } from "../components/Cardform";

class WordList extends React.Component {
  //variables we want to store to mongodb
  constructor(props) {
    let data = [];
    super(props);
    this.state = {
      word: "",
      definition: "",
      words: data,
    };
  }

  //retrieves list of words from database on page load
  componentDidMount() {
    getWords().then((res) => {
      res.map((word) => {
        this.setState({
          words: this.state.words.concat(word),
        });
      });
    });
  }

  //displays each word in the database onto a card
  wordsList() {
    return this.state.words.map((word) => {
      return (
        <Col xs="auto" md="auto">
          <Card
          style={{width:"30rem", height:"20rem"}}
            bg="dark"
            text="light"
            border="primary"
            className="mb-3 Flashcard"
          >
            <Card.Header className="border-0 FlashcardsWord">
              {word.word}
            </Card.Header>
            <Card.Body className="FlashcardsDefinition">
              {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
              <Card.Text>
                {word.definition}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="border-0">
              <Button
                variant="link"
                onClick={() => {
                  axios.delete(`/words/${word._id}`);
                  this.state.words.splice(word, 1);
                  this.setState({
                    words: this.state.words,
                  });
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

  //sets the state of words called by Cardform component
  setStateOfWordsParent = (newWords) => {
    createWords(newWords).then(
      this.setState({
        words: this.state.words.concat(newWords),
      })
    );
  };

  //sets the state of word called by Cardform component
  setStateOfWordParent = (newWord) => {
    this.setState({
      word: newWord,
    });
  };

  //sets the state of defintion called by Cardform component
  setStatOfDefinitionParent = (newDefinition) => {
    this.setState({
      definition: newDefinition,
    });
  };

  render() {
    return (
      <Container fluid className="App">
        <Row className="Cardform">
          <Col md={6}>
            <div className="CardformTitle">Add a card</div>
            <Cardform
              setStateOfWordInParent={this.setStateOfWordParent} //setStateofWordInparent is a prop in Cardform that takes in value from handleWordChange
              setStateOfDefinitionInParent={this.setStatOfDefinitionParent} //setStateofDefintionInparent is a prop in Cardform that takes in value from handleDefintionChange
              word={this.state.word} //word is a prop in Cardform it takes in a value this.state.word to be used in Cardform
              definition={this.state.definition} //defintion is a prop in Cardform it takes in a value this.state.definition to be used in Cardform
              setStateOfWordsInParent={this.setStateOfWordsParent} //setStateofWordsInParent is a prop in Cardform that take sin value from handleWordsSubmit
            ></Cardform>
          </Col>
        </Row>
        <Row>
            <Row>
            <div className="FlashcardsTitle">Word List</div>
            </Row>
            <Row className="AllFlashcards">
          {this.wordsList()}
          </Row>
        </Row>
      </Container>
    );
  }
}

export default WordList;
