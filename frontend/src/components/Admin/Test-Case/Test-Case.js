import React from "react";
import styles from "./Test-Case.module.css";
import Accordion from "react-bootstrap/Accordion";

class TestCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testList: props.testsList,
    };
  }
  saveTest = (testId) => (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const id = this.state.testList.findIndex(function (test) {
      return test.id === testId;
    });
    const newList = this.state.testList;
    newList[id].isEditing = false;
    newList[id].input = formJson.input;
    newList[id].output = formJson.output;
    this.setState({ testList: newList });
  };

  editTest(testId) {
    const id = this.state.testList.findIndex(function (test) {
      return test.id === testId;
    });
    const newList = this.state.testList;
    newList[id].isEditing = true;
    this.setState({ testList: newList });
  }

  render() {
    return (
      <div className={styles.testCase}>
        <Accordion defaultActiveKey="0" class={styles.oneTest}>
          {this.state.testList.map((test) => (
            <Accordion.Item key={test.id} eventKey={test.id} id={test.id}>
              <Accordion.Header>
                <div class={styles.testHeader}>Test Case #{test.id}</div>
              </Accordion.Header>
              <Accordion.Body>
                <div class={styles.testBody}>
                  <form onSubmit={this.saveTest(test.id)}>
                    <b>Input:</b>{" "}
                    <input
                      type={Text}
                      defaultValue={test.input}
                      class={styles.inputBox}
                      readOnly={!test.isEditing}
                      name="input"
                    ></input>{" "}
                    <br />
                    <b>Output:</b>{" "}
                    <input
                      type={Text}
                      defaultValue={test.output}
                      class={styles.inputBox}
                      readOnly={!test.isEditing}
                      name="output"
                    ></input>{" "}
                    <br />
                    {!test.isEditing && (
                      <button
                        class={styles.button}
                        onClick={() => this.editTest(test.id)}
                      >
                        Edit
                      </button>
                    )}
                    {test.isEditing && (
                      <button class={styles.button} type="submit">
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
