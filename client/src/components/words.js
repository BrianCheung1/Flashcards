import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

class Words extends React.Component {
  //Test to see if we can connect to backend server
  //   componentDidMount() {
  //     axios.get("/test").then((res) => {
  //       console.log(`Connected to backend Data:`, res);
  //     });
  //   }

  //variables we want to store to mongodb
  constructor(props) {
    let data1 = []
    super(props);
    this.state = {
      word: "",
      defintion: "",
      words: data1,
    };
  }

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
  wordsList() {
    return this.state.words.map((word) => {
        return (
            <Col md="auto">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{word.word}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle> */}
                <Card.Text>{word.defintion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
    })
  }
  //When user clicks sumbit, the word and defintion are transfered to to the backend
  //The backend then transfers it to the database
  submitHandler = (e) => {
    e.preventDefault();

    let something = {
        word: this.state.word, 
        defintion: this.state.defintion
    }

    axios
      .post("words/add", something)
      .then(this.setState({
          words: this.state.words.concat(something),
        }));

    e.target.reset();
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Form onSubmit={this.submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Word</Form.Label>
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
                <Form.Label>Definition</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
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
        <Row>
        {this.wordsList()}
        </Row>
      </Container>
    );
  }
}

export default Words;
