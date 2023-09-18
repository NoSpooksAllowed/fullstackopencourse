import React from "react";
import { useState } from "react";

/**
 *  @param {Object} props
 *  @param {React.MouseEventHandler} props.handleClick
 *  @param {string} props.text
 *
 *  @returns {React.ReactElement}
 * */
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  /**
   * @param {number} counter
   * @param {CallableFunction} setFunc
   * @returns {React.MouseEventHandler}
   */
  const handleClick = (counter, setFunc) => {
    return () => {
      counter = Math.floor(Math.random() * anecdotes.length);
      setFunc(counter);
    };
  };

  console.log(selected);
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleClick(selected, setSelected)} text="next anecdote" />
    </div>
  );
};

export default App;
