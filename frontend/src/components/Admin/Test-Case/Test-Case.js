import React from "react";
import styles from "./Test-Case.module.css";
import Accordion from "react-bootstrap/Accordion";
import * as problemService from "../../../services/api/Problems.js";

class TestCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testList: props.testsList,
      problemId: props.problemId,
    };

    this.state.testList.forEach((element) => {
      element.isEditing = false;
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.testsList !== state.testList) {
      return {
        testList: props.testsList,
        problemId: props.problemId,
      };
    }
    return null;
  }

  saveTest = (testId) => (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    problemService
      .updateTest(this.state.problemId, testId, formJson.input, formJson.output)
      .then((res) => {
        this.setState({ testList: res.tests }, () => {
          this.state.testList.forEach((element) => {
            element.isEditing = false;
          });
        });
      });
  };

  editTest(testId) {
    const id = this.state.testList.findIndex(function (test) {
      return test.number === testId;
    });
    const newList = this.state.testList;
    newList[id].isEditing = true;
    this.setState({ testList: newList });
  }

  render() {
    return (
      <div className={styles.testCase}>
        <Accordion defaultActiveKey="0" className={styles.oneTest}>
          {this.state.testList.map((test) => (
            <Accordion.Item
              key={test.number}
              eventKey={test.number}
              id={test.number}
            >
              <Accordion.Header>
                <div className={styles.testHeader}>
                  Test Case #{test.number}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className={styles.testBody}>
                  <form onSubmit={this.saveTest(test.number)}>
                    <b>Input:</b>{" "}
                    <input
                      type={Text}
                      defaultValue={test.input}
                      className={styles.inputBox}
                      readOnly={!test.isEditing}
                      name="input"
                    ></input>{" "}
                    <br />
                    <b>Output:</b>{" "}
                    <input
                      type={Text}
                      defaultValue={test.output}
                      className={styles.inputBox}
                      readOnly={!test.isEditing}
                      name="output"
                    ></input>{" "}
                    <br />
                    {!test.isEditing && (
                      <button
                        className={styles.button}
                        onClick={() => this.editTest(test.number)}
                      >
                        Edit
                      </button>
                    )}
                    {test.isEditing && (
                      <button className={styles.button} type="submit">
                        Save
                      </button>
                    )}
                  </form>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default TestCase;
