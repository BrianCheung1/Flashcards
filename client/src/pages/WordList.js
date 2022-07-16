import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import { getWords, createWords, getWord, updateWord } from "../api/api";
import { Cardform } from "../components/Cardform";
import { Flashcards } from "../components/Flashcards";
import { Navibar } from "../components/Navibar";
import { BsCardText } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Navigate } from "react-router-dom";

class WordList extends React.Component {
  //variables we want to store to mongodb
  constructor(props) {
    super(props);
    let data = [];
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

  setStateOfWordsParentUpdated = (updatedWord, wordData) => {
    updateWord(updatedWord);
    let prevData = this.state.words;
    let updatedDataIndex = this.state.words.indexOf(wordData);
    prevData[updatedDataIndex] = updatedWord;
    this.setState({
      words: prevData,
    });
  };

  render() {
    return (
      <Container fluid className="App">
        <Helmet>
          <title>Flashcards</title>
          <link
            rel="icon"
            type="image/png"
            href="/public/favicon"
            sizes="16x16"
          />
        </Helmet>
        <Navibar />
        <Row className="Cardform">
          <Col md={6}>
            <div className="CardformTitle">
              Add a card <BsCardText />
            </div>
            <Cardform
              setStateOfWordInParent={this.setStateOfWordParent} //setStateofWordInparent is a prop in Cardform that takes in value from handleWordChange
              setStateOfDefinitionInParent={this.setStatOfDefinitionParent} //setStateofDefintionInparent is a prop in Cardform that takes in value from handleDefintionChange
              setStateOfWordsInParent={this.setStateOfWordsParent} //setStateofWordsInParent is a prop in Cardform that take sin value from handleWordsSubmit
            ></Cardform>
          </Col>
        </Row>
        <Row>
          <Row>
            <div className="FlashcardsTitle">
              Word List <AiOutlineUnorderedList />
            </div>
          </Row>
          <Row className="AllFlashcards" xs="auto" md="auto">
            {this.state.words.map((word) => {
              return (
                <Flashcards
                  key={word._id}
                  word={word.word}
                  definition={word.definition}
                  id={word._id}
                  words={this.state.words}
                  wordData={word}
                  setStateOfWordsAfterDelete={this.setStateofWordsParentDelete}
                  setStateOfWordInParent={this.setStateOfWordParent} //setStateofWordInparent is a prop in Cardform that takes in value from handleWordChange
                  setStateOfDefinitionInParent={this.setStatOfDefinitionParent} //setStateofDefinitionInparent is a prop in Cardform that takes in value from handleDefinitionChange
                  setStateOfWordsInParentUpdated={
                    this.setStateOfWordsParentUpdated
                  } //setStateofWordsInParent is a prop in Cardform that take sin value from handleWordsSubmit
                ></Flashcards>
              );
            })}
          </Row>
        </Row>
      </Container>
    );
  }
}

export default WordList;
