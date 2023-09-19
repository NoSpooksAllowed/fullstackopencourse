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
 * @param {Object} props
 * @param {Array<string>} props.anecdotes
 * @param {Array<number>} props.votes
 * @returns {React.ReactElement}
 * */
const MostVotesAnecdote = ({ anecdotes, votes }) => {
  /**
   * @param {Array<number>} arr
   * @returns {number}
   */
  const findMaxIndex = arr => {
    if (arr.length === 0) {
      return -1; // Return -1 for an empty array
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        maxIndex = i;
      }
    }

    return maxIndex;
  };

  const maxIndex = findMaxIndex(votes);

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
    </>
  );
};

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
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  /**
   * @param {number} selected
   * @param {CallableFunction} setSelected
   * @returns {React.MouseEventHandler}
   */
  const selectAnecdote = (selected, setSelected) => {
    return () => {
      selected = Math.floor(Math.random() * anecdotes.length);
      setSelected(selected);
    };
  };

  /**
   * @param {number} selected
   * @param {Array<number>} votes
   * @param {CallableFunction} setVotes
   * @returns {React.MouseEventHandler}
   */
  const voteAnecdote = (selected, votes, setVotes) => {
    return () => {
      const updatedVotes = [...votes];
      updatedVotes[selected] += 1;
      setVotes(updatedVotes);
    };
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdote(selected, votes, setVotes)} text="vote" />
      <Button handleClick={selectAnecdote(selected, setSelected)} text="next anecdote" />
      <MostVotesAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
