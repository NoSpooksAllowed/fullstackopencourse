import React from "react";
import { useState } from "react";

/**
 *  @param {Object} props
 *  @returns {React.ReactElement}
 * */
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /**
   * @param {number} counter
   * @param {CallableFunction} setFunc
   * @returns {CallableFunction}
   */
  const handleClick = (counter, setFunc) => {
    return () => {
      setFunc(counter + 1);
    };
  };
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClick(good, setGood)} text="good" />
      <Button handleClick={handleClick(neutral, setNeutral)} text="neutral" />
      <Button handleClick={handleClick(bad, setBad)} text="bad" />
      <h2>statistics</h2>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  );
};

export default App;
