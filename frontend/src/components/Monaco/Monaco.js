import React, { useState, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { MutatingDots } from "react-loader-spinner";
import monacoStyles from "./Monaco.module.css";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";
import { SocketContext } from "../../context/socket.js";

const width = "100%";

const Monaco = ({ lobby, user, language, number }) => {
  const [editorCode, setEditorCode] = useState(null);
  const [methodName, setMethodName] = useState("");
  const [height, setHeight] = useState("70vh");
  const [code, setCode] = useState(null);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [setSpinner, setSetSpinner] = useState(false);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join-room", lobby);
    if (number !== null) {
      if (sessionStorage.getItem("cur" + language + lobby) !== null) {
        setCode(sessionStorage.getItem("cur" + language + lobby));
      } else {
        problemService
          .getStarterCode(number, language)
          .then((res) => {
            setCode(res.code);
            setMethodName(res.methodName);
            sessionStorage.setItem("cur" + language + lobby, res.code);
            sessionStorage.setItem(
              language + "MethodName" + lobby,
              res.methodName
            );
          })
          .catch((error) => {
            setCode("Language not supported!");
          });
      }
    }
  }, [language, lobby, number]);

  const handleEditorDidMount = (editor, monaco) => {
    setEditorCode(editor);
  };

  const runPython = (total, tests) => {
    let addTests = editorCode?.getValue();
    addTests = addTests.concat("\r\npassCounter = 0");

    for (let i = 0; i < total; i++) {
      // what the function call looks like using the test input
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall = methodName + '("' + tests[i].input + '")';
        output = '"' + tests[i].output + '"';
      } else {
        functionCall = methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      // calling the function and save results
      addTests = addTests.concat(
        "\r\ntestCallResult = str(" + functionCall + ")"
      );
      // print out info line about pass/fail
      addTests = addTests.concat(
        "\r\nprint('Expected: " +
          output +
          "; Actual: ' + testCallResult + '; Pass: ', str(" +
          output +
          ") == testCallResult)"
      );
      // increase pass counter if passed
      addTests = addTests.concat(
        "\r\nif str(" + output + ") == testCallResult: passCounter += 1"
      );
    }
    addTests = addTests.concat(
      "\r\nprint('Passed: ' + str(passCounter) + '/" + total + "')"
    );

    return addTests;
  };

  const runJavascript = (total, tests) => {
    let addTests = editorCode?.getValue();
    addTests = addTests.concat("\r\nlet passCounter = 0;");

    for (let i = 0; i < total; i++) {
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall = methodName + '("' + tests[i].input + '")';
        output = "'" + tests[i].output + "'";
      } else {
        functionCall = methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      addTests = addTests.concat("\r\ntestCallResult = " + functionCall + ";");
      addTests = addTests.concat(
        '\r\nconsole.log("Expected: ' +
          output +
          '; Actual: " + testCallResult + "; Pass: " + (' +
          output +
          "=== testCallResult));"
      );
      addTests = addTests.concat(
        "\r\nif (" + output + " === testCallResult) { passCounter++; }"
      );
    }

    addTests = addTests.concat(
      '\r\nconsole.log("Passed: " + passCounter + "/' + total + '")'
    );

    return addTests;
  };

  const runJava = (total, tests) => {
    let main =
      "public class mainClass { \r\npublic static void main(String args[]) { \r\nSolution sol = new Solution();";
    main = main.concat("\r\nint passCounter = 0;");
    for (let i = 0; i < total; i++) {
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall = "sol." + methodName + '("' + tests[i].input + '")';
        output = '"' + tests[i].output + '"';
      } else {
        functionCall = "sol." + methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      // print out comparisons
      main = main.concat(
        '\r\nSystem.out.println("Expected: ' +
          tests[i].output +
          '; Actual: " + ' +
          functionCall +
          ' + "; Pass: " + (' +
          output +
          " == " +
          functionCall +
          "));"
      );

      // increase counter if test passed
      main = main.concat(
        "\r\nif (" + output + " == " + functionCall + ") { passCounter++; }"
      );
    }

    main = main.concat(
      '\r\nSystem.out.println("Passed: " + passCounter + "/' + total + '");'
    );
    main = main.concat("}}");

    let solutionCode = editorCode?.getValue();
    main = main.concat("\r\n" + solutionCode);
    return main;
  };

  const submit = () => {
    setSetSpinner(true);
    problemService.getTestCases(number, 0, 100).then((res) => {
      const total = res.total;
      const tests = res.test;

      let addTests = "";
      if (language === "python") {
        addTests = runPython(total, tests);
      } else if (language === "java") {
        addTests = runJava(total, tests);
      } else if (language === "javascript") {
        addTests = runJavascript(total, tests);
      }

      compilerService.executeCode(addTests, language).then((test) => {
        const result = test.output.split(/\r?\n/);
        setHeight("35vh");
        setResults(result);
        setShowResults(true);
        setSetSpinner(false);
      });
    });
  };

  const handleEditorChange = (value, event) => {
    socket.emit("send-code", socket.id, value, lobby, language, user);
    sessionStorage.setItem("cur" + language + lobby, editorCode?.getValue());
  };

  return (
    <div>
      {setSpinner && (
        <div className={monacoStyles.spinnerOverlay}>
          <div className={monacoStyles.spinner}>
            <MutatingDots
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperclassName=""
              visible={true}
            />
          </div>
        </div>
      )}
      <Editor
        height={height}
        width={width}
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
      {showResults ? (
        <div className={monacoStyles.testResults}>
          <h2>Test Results</h2>
          {results.map((test) => (
            <p key={test}>{test}</p>
          ))}
        </div>
      ) : null}
      <div className={monacoStyles.buttonBar}>
        <button onClick={submit} className={monacoStyles.submitBtn}>
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default Monaco;
