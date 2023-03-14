import React from "react";
import styles from "./Edit.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal, Button } from "react-bootstrap";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className={styles.problem}>
        <Modal
          show={this.state.isOpen}
          onHide={this.closeModal}
          class={styles.editModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Test Case</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <input type={Text}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div class={styles.title}>FizzBuzz</div>

        <div class={styles.desc}>
          <div class={styles.subtitle}>Problem Description</div>
          <div class={styles.descBox}>
            <textarea id={styles.problemDesc} name="desc">
              It was a dark and stormy night when I wanted to code FizzBuzz...
            </textarea>
            <button class={styles.button}>Save</button>
          </div>
        </div>

        <div class={styles.starterCode}>
          <div class={styles.subtitle}>Starter Code</div>
          <div class={styles.codeBox}>
            <textarea id={styles.code} name="starter">
              TODO REPLACE WITH MONACO
            </textarea>
            <button class={styles.button}>Save</button>
          </div>
        </div>

        <div class={styles.tests}>
          <Row>
            <Col md={10}>
              <div class={styles.subtitle}>Test Cases</div>
            </Col>
            <Col md={2}>
              <div class={styles.newTest}>
                <button class={styles.button} id={styles.new}>
                  New
                </button>
              </div>
            </Col>
          </Row>

          <div class={styles.testsBox}>
            <div class={styles.oneTest}>
              <b>Test #</b> <br />
              <i>Test Description</i> <br />
              <b>Input:</b> 5 <br />
              <b>Output:</b> Fizz <br />
              <button class={styles.button} onClick={this.openModal}>
                Edit
              </button>
            </div>
            <div class={styles.oneTest}>
              <b>Test #</b> <br />
              <i>Test Description</i> <br />
              <b>Input:</b> 5 <br />
              <b>Output:</b> Fizz <br />
              <button class={styles.button} onClick={this.openModal}>
                Edit
              </button>
            </div>
            <div class={styles.oneTest}>
              <b>Test #</b> <br />
              <i>Test Description</i> <br />
              <b>Input:</b> 5 <br />
              <b>Output:</b> Fizz <br />
              <button class={styles.button} onClick={this.openModal}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
