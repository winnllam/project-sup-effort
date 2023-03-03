import React, { Component } from "react";
import Header from "./components/Header/Header";
import Explore from "./containers/Explore";
import Monaco from "./containers/Monaco";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Explore />
      </div>
    );
  }
}
export default App;
