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
      <Part part={props[0].name} exercises={props[0].exercises} />
      <Part part={props[1].name} exercises={props[1].exercises} />
      <Part part={props[2].name} exercises={props[2].exercises} />
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
      <p>Number of exercises {props.total}</p>
    </>
  );
};

/**
 * @returns {import("react").ReactElement}
 */
const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  return (
    <div>
      <Header course={course} />
      <Content {...[part1, part2, part3]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
