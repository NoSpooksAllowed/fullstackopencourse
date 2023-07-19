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
 * @returns {import("react").ReactElement}
 */
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);

  const setToZero = () => setCounter(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
};

export default App;
