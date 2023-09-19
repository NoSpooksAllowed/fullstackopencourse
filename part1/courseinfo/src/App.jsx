import React from "react";

/**
 * @param {Object} props
 * @param {string} props.course
 * @returns {React.ReactElement}
 *
 */
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

/**
 * @param {Object} props
 * @param {string} props.part
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

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

/**
 * @param {Object} props
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Total = ({ exercises }) => {
  return (
    <>
      <p>Number of exercises {exercises}</p>
    </>
  );
};

/**
 * @returns {React.ReactElement}
 *
 */
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        exercises={
          course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;
