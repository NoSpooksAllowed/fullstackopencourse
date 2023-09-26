import React from "react";

/**
 * @param {Object} props
 * @param {string} props.newFilterName
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.handleFilterNameChange
 * @returns {React.ReactElement}
 */
const Filter = ({ newFilterName, handleFilterNameChange }) => {
  return (
    <div>
      filter shown with <input value={newFilterName} onChange={handleFilterNameChange} />
    </div>
  );
};

export default Filter;
