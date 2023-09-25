import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

/**
 * @typedef {Object} Part
 * @property {string} name - The name of the part.
 * @property {number} exercises - The number of exercises in the part.
 */

/**
 * @param {Object} props
 * @param {Object} props.course
 * @param {string} props.course.name
 * @param {Array<Part>} props.course.parts
 * @returns {React.ReactElement}
 */
const Course = ({ course }) => {
  let sum = 0;
  course.parts.map(part => {
    sum += part.exercises;
  });

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map(part => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
      <Total exercises={sum} />
    </div>
  );
};

export default Course;
