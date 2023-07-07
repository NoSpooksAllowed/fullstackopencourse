import React from "react";

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Header = props => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Part = props => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Content = props => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Total = props => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </>
  );
};

/**
 * @returns {import("react").ReactElement}
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
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
