import React from "react";
import Header from "./Header";
import Part from "./Part";

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
  return (
    <div>
      <Header course={course.name} />
      <>
        {course.parts.map(part => (
          <Part part={part.name} exercises={part.exercises} />
        ))}
      </>
    </div>
  );
};

export default Course;
