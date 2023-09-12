import React from "react";

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 *
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
 * @returns {React.ReactElement}
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
 * @returns {React.ReactElement}
 */
const Content = props => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const Total = props => {
  return (
    <>
      <p>Number of exercises {props.exercises}</p>
    </>
  );
};

/**
 * @returns {React.ReactElement}
 *
 */
const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
};

export default App;
