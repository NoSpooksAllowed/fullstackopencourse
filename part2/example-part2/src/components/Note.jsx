import React from "react";

/**
 * @typedef {Object} Note
 * @property {number} id - The ID of the object.
 * @property {string} content - The content of the object.
 * @property {boolean} important - Indicates whether the object is important.
 */

/**
 * @param {Object} props
 * @param {Note} props.note
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.toggleImportance
 *
 * @returns {React.ReactElement}
 */
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
