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
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
