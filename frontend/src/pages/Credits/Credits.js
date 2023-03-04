import React from "react";
import creditsStyle from "./Credits.module.css";
import credits from "../../assets/credits.svg";

const Credits = () => {
  return (
    <div className={creditsStyle.credits}>
      <img src={credits} alt="Credits" class={creditsStyle.graphics} />
      <h2 id={creditsStyle.title}>Credits</h2>
      <ul>
        <li>All images from Undraw.co</li>
        <li>All icons from Flaticon.co</li>
      </ul>
    </div>
  );
};

export default Credits;
