import React from "react";

/**
 * @param {Object} props
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Total = ({ exercises }) => {
  return (
    <>
      <p>
        <b>total of {exercises} exercises</b>
      </p>
    </>
  );
};

export default Total;
