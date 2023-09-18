import React from "react";
import { useState } from "react";

/**
 *  @param {Object} props
 *  @returns {React.ReactElement}
 * */
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {number} props.value
 * @returns {React.ReactElement}
 */
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const Statistics = ({ good, neutral, bad }) => {
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

  const all = totalFeedbackCount([good, bad, neutral]);

  if (all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={countAverage([good, bad, neutral])} />
          <StatisticsLine
            text="positive"
            value={countPercentage(good, totalFeedbackCount([good, bad, neutral]))}
          />
        </tbody>
      </table>
    </>
  );
};

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
