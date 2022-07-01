import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import {
  getTest,
  getWords,
  createWords,
  deleteWords,
  getWord,
} from "../api/api";
import { Cardform } from "../components/Cardform";
import { Flashcards } from "../components/Flashcards";
import axios from "axios";

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

  //sets the state of words called by Cardform component
  //creates word with backend api
  //gets the database data with ID component and add it to state
  setStateOfWordsParent = (newWords) => {
    createWords(newWords).then((res) => {
      getWord(res.data.insertedId).then((res) => {
        this.setState({
          words: this.state.words.concat(res.data),
        });
      });
    });
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

  //sets the state of words called by FlashCards component
  setStateofWordsParentDelete = (newWords) => {
    this.setState({
      words: newWords,
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
          <Row className="AllFlashcards" xs="auto" md="auto">
            <Flashcards
              words={this.state.words}
              setStateOfWordsAfterDelete={this.setStateofWordsParentDelete}
            ></Flashcards>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default WordList;
