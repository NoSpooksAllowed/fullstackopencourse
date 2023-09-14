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

  /**
   * @param {Array<number>} nums
   * @returns number
   */
  const totalFeedbackCount = nums => {
    return nums.reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);
  };

  /**
   * @param {Array<number>} nums
   * @returns number
   */
  const countAverage = nums => totalFeedbackCount(nums) / nums.length;

  /**
   * @param {number} good
   * @param {number} all
   * @returns number
   */
  const countPercentage = (good, all) => (all ? (good / all) * 100 : 0);

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
        <p>all {totalFeedbackCount([good, bad, neutral])}</p>
        <p>average {countAverage([good, bad, neutral])}</p>
        <p>positive {countPercentage(good, totalFeedbackCount([good, bad, neutral]))}</p>
      </div>
    </div>
  );
};

export default App;
