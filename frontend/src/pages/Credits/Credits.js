import React from "react";
import creditsStyle from "./Credits.module.css";
import credits from "../../assets/credits.svg";

const Credits = () => {
  return (
    <div className={creditsStyle.credits}>
      <img src={credits} alt="Credits" className={creditsStyle.graphics} />
      <h2 id={creditsStyle.title}>Credits</h2>
      <ul>
        <li>All images from Undraw.co</li>
        <li>All icons from Flaticon.co</li>
        <li>
          Deployment on DigitalOcean from{" "}
          <a href="https://gist.github.com/sjosephrw/5bc7efbf4c332070165c61dba253288d">
            Traversy Media
          </a>
        </li>
        <li>
          MongoDB auto increment sequence from{" "}
          <a href="https://stackoverflow.com/questions/62281421/mongodb-auto-increment-sequence">
            Stackoverflow
          </a>
        </li>
        <li>
          Axios API call setup for React from{" "}
          <a href="https://medium.com/@sirpeas/api-endpoints-in-a-react-project-86a7f1572bbc">
            Medium
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Credits;
