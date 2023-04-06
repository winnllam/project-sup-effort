import React from "react";
import problemStyles from "./Problems.module.css";
import * as problemService from "../../services/api/Problems.js";

class Problems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problems: [],
      total: 0,
      page: 0,
      limit: 10,
    };

    problemService
      .getProblems(this.state.page, this.state.limit)
      .then((res) => {
        this.setState({ problems: res.problems, total: res.total });
      });
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      problemService
        .getProblems(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            problems: res.problems,
            total: res.total,
          });
        });
    });
  };

  prevPage = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      problemService
        .getProblems(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            problems: res.problems,
            total: res.total,
          });
        });
    });
  };

  render() {
    const { problems, page, limit, total } = this.state;

    let problemList = problems.map((problem) => (
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

    return (
      <div className={problemStyles.problems}>
        <div id={problemStyles.header}>Problem Catalog</div>
        <div>
          {problemList.length > 0 && <div>{problemList}</div>}
          {page > 0 && (
            <button
              className={problemStyles.button}
              id={problemStyles.prevButton}
              onClick={this.prevPage}
            >
              Previous
            </button>
          )}
          {total - page * limit > limit && (
            <button
              className={problemStyles.button}
              id={problemStyles.nextButton}
              onClick={this.nextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Problems;
