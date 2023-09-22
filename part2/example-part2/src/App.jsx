import React from "react";
import { useState } from "react";

import Note from "./components/Note";

/**
 * @typedef {Object} Note
 * @property {number} id - The ID of the object.
 * @property {string} content - The content of the object.
 * @property {boolean} important - Indicates whether the object is important.
 */

/**
 * @param {Object} props
 * @param {Array<Note>} props.notes
 * @returns {React.ReactElement}
 */
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
