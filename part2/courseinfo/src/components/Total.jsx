import React from "react";

/**
 * @param {Object} props
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Total = ({ exercises }) => {
  return (
    <>
      <p>Number of exercises {exercises}</p>
    </>
  );
};

export default Total;
