import React from "react";

/**
 * @param {Object} props
 * @param {string} props.course
 * @returns {React.ReactElement}
 *
 */
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

export default Header;
