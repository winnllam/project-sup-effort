import React from "react";
import problemStyles from "./Problems.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import { HashLink as Link } from "react-router-hash-link";
import * as problemService from "../../services/api/Problems.js";

class Problems extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth0;

    this.state = {
      problems: [],
      emailVerified: user.email_verified,
    };

    problemService.getProblems().then((res) => {
      this.setState({ problems: res });
    });
  }

  render() {
    const { problems, emailVerified } = this.state;
    let problemList;
    if (emailVerified) {
      problemList = problems.map((problem) => (
        <Link
          to="/coding"
          state={{ number: problem.number }}
          className={`${problemStyles.problem}
            ${problem.difficulty === "easy" ? problemStyles.easy : ""} 
            ${problem.difficulty === "medium" ? problemStyles.medium : ""} 
            ${problem.difficulty === "hard" ? problemStyles.hard : ""}`}
          key={problem.number}
        >
          <div className={problemStyles.info}>
            <h2>
              {problem.number}. {problem.name}
            </h2>
            <p>{problem.description}</p>
          </div>
        </Link>
      ));
    } else {
      problemList = problems.map((problem) => (
        <div
          className={`${problemStyles.problem}
            ${problem.difficulty === "easy" ? problemStyles.easy : ""} 
            ${problem.difficulty === "medium" ? problemStyles.medium : ""} 
            ${problem.difficulty === "hard" ? problemStyles.hard : ""}`}
          key={problem.number}
        >
          <div className={problemStyles.info}>
            <h2>
              {problem.number}. {problem.name}
            </h2>
            <p>{problem.description}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className={problemStyles.problems}>
        <div id={problemStyles.header}>Problem Catalog</div>
        {problemList}
      </div>
    );
  }
}

export default withAuth0(Problems);
