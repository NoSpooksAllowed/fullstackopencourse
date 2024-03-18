import React from "react";

/**
 * @param {Object} props
 * @param {Object | null} props.user
 * @param {React.FormEventHandler<HTMLFormElement>} props.addNote
 * @param {String} props.newNote
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.handleNoteChange
 *
 * @returns {React.ReactElement | null}
 * */
const NoteForm = ({ user, addNote, newNote, handleNoteChange }) => {
  if (user !== null) {
    return (
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    );
  }

  return null;
};

export default NoteForm;
