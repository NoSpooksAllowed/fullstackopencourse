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
 * @returns {React.ReactElement}
 */
const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

export default Note;
