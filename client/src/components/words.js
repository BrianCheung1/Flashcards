import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import "../App.css";

class Words extends React.Component {
  //Test to see if we can connect to backend server
  //   componentDidMount() {
  //     axios.get("/test").then((res) => {
  //       console.log(`Connected to backend Data:`, res);
  //     });
  //   }

  //variables we want to store to mongodb
  constructor(props) {
    let data = [];
    super(props);
    this.state = {
      word: "",
      defintion: "",
      words: data,
    };
  }

  //retrieves list of words from database on page load
  componentDidMount() {
    axios.get("/words").then((res) => {
      let terms = res.data;
      terms.map((word) => {
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
            style={{ width: "18rem", height: "14rem" }}
            bg="dark"
            text="light"
            border="primary"
            className="mb-3"
          >
            <Card.Header className="border-0">{word.word}</Card.Header>
            <Card.Body className="Flashcards">
              {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
              <Card.Text>{word.defintion}</Card.Text>
            </Card.Body>
            <Card.Footer className="border-0">
              <Button variant="link" 
              onClick={()=> {
                axios.delete(`/words/${word._id}`)
                this.state.words.splice(word, 1)
                this.setState({
                    words: this.state.words
                })
              }}
              >Link</Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  }
  //When user clicks sumbit, the word and defintion are transfered to to the backend
  //The backend then transfers it to the database
  submitHandler = (e) => {
    e.preventDefault();

    let something = {
      word: this.state.word,
      defintion: this.state.defintion,
    };

    axios.post("words/add", something).then(
      this.setState({
        words: this.state.words.concat(something),
      })
    );

    e.target.reset(); //resets the form to placeholders
  };

  render() {
    return (
      <Container fluid className="App">
        <Container>
          <Row className="Cardform">
            <Col>
              <div className="CardformTitle">Add a card</div>
              <Form onSubmit={this.submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {/* <Form.Label>Word</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Enter word"
                    onChange={(e) => {
                      this.setState({
                        word: e.target.value,
                      });
                      // console.log(this.state.word);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {/* <Form.Label>Definition</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Enter Defintion"
                    onChange={(e) => {
                      this.setState({
                        defintion: e.target.value,
                      });
                      //console.log(this.state.defintion);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create Card
                </Button>
              </Form>
            </Col>
          </Row>

          <Row className="Flashcards">
            <div className="FlashcardsTitle">Word List</div>
            {this.wordsList()}
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Words;
