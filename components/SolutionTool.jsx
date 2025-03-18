import React from "react";
import _ from "lodash";
import solutionToolBg from "../public/resources/solutionTool.gif";

const SolutionTool = ({ fields }) => {
  const title = _.get(fields, "title", "Default Title");
  const buttonText = _.get(fields, "buttonText", "Get Started");
  const description = _.get(fields, "description", "Default description");
  const backgroundImageArray = _.get(fields, "backgroundImage", []);

  const backgroundImage = backgroundImageArray.length
    ? _.get(backgroundImageArray[0], "src", fallbackImage)
    : solutionToolBg.src;

  return (
    <div
      className="solution-tool-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content">
        <div className="title-wrapper">
          <h1 className="title">{title}</h1>
        </div>
        <div className="description-wrapper">
          <p className="description">{description}</p>
        </div>
        <div className="button-wrapper">
          <button className="button">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default SolutionTool;
