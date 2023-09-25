import React from "react";

/**
 * @param {Object} props
 * @param {string} props.part
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

export default Part;
