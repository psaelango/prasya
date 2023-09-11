import React from "react";
import "./Rasagulla.css";
import data from "./data.json";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";

class Rasagulla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currAlphaIndex: 0,
      showModal: false,
      selectedImage: {},
      failAudio: 1,
    };
    this.alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.failMsgs = [
      "Oops! May be next Birthday...",
      "Seriously, you want this!!!",
      "Okayyy. Time to go for some shopping!",
      "Ouch... Is that what you really want!!!",
      "I'm Sorry... I'll defintely get you this later...",
      "Can you please adjust with something I bought for now!",
    ];
  }
  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    const path = pathArray[1] && pathArray[1].toUpperCase();
    const pathIndex = this.alphabets.indexOf(path);
    if (pathIndex > -1) {
      this.setState({ currAlphaIndex: pathIndex });
    }
  }
  failMsg() {
    const index = Math.floor(Math.random() * 5);
    return this.failMsgs[index];
  }
  modalBody(image) {
    return (
      <Row>
        <Col>
          <img src={"/images/" + image.name} style={{ width: "10rem" }} />
        </Col>
        <Col>
          {image.reason ? <h3>{image.reason}</h3> : <h3>{this.failMsg()}</h3>}
        </Col>
      </Row>
    );
  }
  modalFooter(image) {
    const alphabetIndex = this.state.currAlphaIndex;
    return image.reason ? (
      <Button
        variant="secondary"
        onClick={() => {
          this.setState({
            showModal: false,
            currAlphaIndex: alphabetIndex + 1,
          });
        }}
      >
        Next Gift!
      </Button>
    ) : (
      <Button
        variant="secondary"
        onClick={() => {
          this.setState({ showModal: false });
        }}
      >
        Close
      </Button>
    );
  }
  giftModal() {
    const image = this.state.selectedImage;
    return (
      <Modal
        show={this.state.showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>{image.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.modalBody(image)}</Modal.Body>
        <Modal.Footer>{this.modalFooter(image)}</Modal.Footer>
      </Modal>
    );
  }
  renderAlphabet() {
    const currAlphabet = this.alphabets[this.state.currAlphaIndex];
    return (
      <div id="alphabet-container">
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src={"/images/" + currAlphabet + ".jpg"} />
        </Card>
      </div>
    );
  }
  renderCard(image) {
    return (
      <Card style={{ width: "13rem" }}>
        <Card.Img variant="top" src={"/images/" + image.name} />
        <Card.Body>
          <Card.Title>
            <button
              className="btn"
              onClick={() => {
                this.setState({ showModal: true, selectedImage: image });
                if (image.gift) {
                  const win = document.getElementById("rasagulla");
                  console.log("win = ", win);
                  win.play();
                } else {
                  const failAudioCurrent = this.state.failAudio;
                  const fail = document.getElementById(
                    `fail${failAudioCurrent}`
                  );
                  const failAudioNew =
                    failAudioCurrent < 16 ? failAudioCurrent + 1 : 1;
                  this.setState({ failAudio: failAudioNew });
                  console.log("fail = ", fail);
                  fail.play();
                }
              }}
            >
              {image.title}
            </button>
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
  renderGifts() {
    const currAlphabet = this.alphabets[this.state.currAlphaIndex];
    console.log(currAlphabet);
    const list = data[currAlphabet].map((image, index) => (
      <div key={index} id="gift">
        {this.renderCard(image)}
      </div>
    ));
    return <div id="gift-list">{list}</div>;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Row>
            <Col xs={4}>{this.renderAlphabet()}</Col>
            <Col xs={8}>{this.renderGifts()}</Col>
          </Row>
        </header>
        {this.giftModal()}
      </div>
    );
  }
}

export default Rasagulla;
