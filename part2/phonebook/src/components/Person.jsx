import React from "react";

/**
 * @typedef {Object} Person
 * @property {number} id
 * @property {string} name
 */

/**
 * @param {Object} props
 * @param {Person} props.person
 *
 * @returns {React.ReactElement}
 * */
const Person = ({ person }) => {
  return (
    <>
      <p>{person.name} </p>
    </>
  );
};

export default Person;
