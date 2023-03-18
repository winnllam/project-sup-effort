import React from "react";
import styles from "./Edit.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestCase from "../Test-Case/Test-Case";
import { Modal, Button } from "react-bootstrap";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTest: false,
      testsList: [],
    };

    for (let i = 0; i < 10; i++) {
      this.state.testsList.push({
        id: i,
        desc: "Desc",
        input: 5,
        output: "Fizz",
        isEditing: false,
      });
    }
  }

  openNewTestModal = () => this.setState({ newTest: true });
  closeNewTestModal = (e) => {
    this.setState({ newTest: false });
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const newList = this.state.testsList;

    newList.push({
      id: 20,
      desc: "some desc",
      input: formJson.input,
      output: formJson.output,
      isEditing: false,
    });
    this.setState({ testList: newList });
  };

  render() {
    return (
      <div className={styles.problem}>
        <Modal
          show={this.state.newTest}
          onHide={this.closeNewTestModal}
          class={styles.editModal}
        >
          <form onSubmit={this.closeNewTestModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Test Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class={styles.modalTitle}>Input</div>
              <input
                type={Text}
                placeholder={"Expected input"}
                class={styles.inputBox}
                name="input"
              ></input>
              <div class={styles.modalTitle}>Output</div>
              <input
                type={Text}
                placeholder={"Expected output"}
                class={styles.inputBox}
                name="output"
              ></input>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
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
                <button
                  class={styles.button}
                  id={styles.new}
                  onClick={this.openNewTestModal}
                >
                  New
                </button>
              </div>
            </Col>
          </Row>

          <div class={styles.testsBox}>
            <TestCase testsList={this.state.testsList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
