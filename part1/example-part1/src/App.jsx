import React from "react";
import { useState } from "react";

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const Hello = ({ name, age }) => {
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
 * @returns {React.ReactElement}
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
 * @returns {React.ReactElement}
 */
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const History = props => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  /** @type Array<string> */
  const arr = [];
  const [allClicks, setAll] = useState(arr);

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

      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
