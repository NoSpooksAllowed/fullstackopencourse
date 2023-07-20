import React from "react";
import { useState } from "react";

/**
 * @returns {import("react").ReactElement}
 */
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Hello = ({ name, age }) => {
  /**
   * @returns {Number}
   */
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

/**
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

/**
 * @returns {import("react").ReactElement}
 */
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(" ")}</p>
    </div>
  );
};

export default App;
