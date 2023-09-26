import React from "react";
import Person from "./Person";

/**
 * @typedef {Object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} number
 */

/**
 * @param {Object} props
 * @param {Array<Person>} props.persons
 *
 * @returns {React.ReactElement}
 * */
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
