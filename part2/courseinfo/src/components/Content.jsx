import React from "react";
import Part from "./Part";

/**
 * @typedef {Object} Part
 * @property {string} name - The name of the part.
 * @property {number} exercises - The number of exercises in the part.
 */

/**
 * @param {Object} props
 * @param {Array<Part>} props.parts
 * @returns {React.ReactElement}
 */
const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

export default Content;
