import React from "react";

/**
 * @param {Object} props
 * @param {React.FormEventHandler<HTMLFormElement>} props.addPerson
 * @param {string} props.newName
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.handleNameChange
 * @param {string} props.newNumber
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.handleNumberChange
 *
 * @returns {React.ReactElement}
 */
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
