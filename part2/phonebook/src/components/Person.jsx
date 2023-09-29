import React from "react";

/**
 * @typedef {Object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} number
 */

/**
 * @param {Object} props
 * @param {Person} props.person
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.handleDeleteClick
 *
 * @returns {React.ReactElement}
 * */
const Person = ({ person, handleDeleteClick }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <button onClick={handleDeleteClick}>delete</button>
      </p>
    </>
  );
};

export default Person;
