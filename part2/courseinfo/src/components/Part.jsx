import React from "react";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.exercises
 * @returns {React.ReactElement}
 */
const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

export default Part;
