import React from "react";
import styles from "./Test-Case.module.css";
import Accordion from "react-bootstrap/Accordion";
import { useRef } from "react";

class TestCase extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     const itemsRef = useRef(null);

  //     const testList = [];
  //     for (let i = 0; i < 10; i++) {
  //       testList.push({
  //         id: i,
  //         desc: "Desc",
  //         input: 5,
  //         output: "Fizz",
  //       });
  //     }
  //   }

  //   getMap() {
  //     if (!this.itemsRef.current) {
  //       // Initialize the Map on first usage.
  //       itemsRef.current = new Map();
  //     }
  //     return itemsRef.current;
  //   }

  //   editTestCase(testId) {
  //     const map = getMap();
  //     const node = map.get(itemId);
  //     node.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "center",
  //     });
  //   }
  editTest() {}

  render() {
    return (
      <div className={styles.testCase}>
        <Accordion defaultActiveKey="0" class={styles.oneTest}>
          <Accordion.Item eventKey="0" id={1}>
            <Accordion.Header>
              <div class={styles.testHeader}>Test Case #1</div>
            </Accordion.Header>
            <Accordion.Body>
              <div class={styles.testBody}>
                <b>Input:</b>{" "}
                <input
                  type="text"
                  value={5}
                  class={styles.inputBox}
                  readOnly={true}
                ></input>{" "}
                <br />
                <b>Output:</b>{" "}
                <input
                  type="text"
                  value={"Fizz"}
                  class={styles.inputBox}
                  readOnly={true}
                ></input>{" "}
                <br />
              </div>
              <button class={styles.button}>Edit</button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}

export default TestCase;
