import React from "react";
import { useState, useEffect } from "react";

import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import Footer from "./components/Footer";

/**
 * @typedef {Object} Note
 * @property {number} id - The ID of the object.
 * @property {string} content - The content of the object.
 * @property {boolean} important - Indicates whether the object is important.
 */

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  /** @type Note[] */
  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {void}
   */
  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event object.
   * @returns {void}
   */
  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  /** @param {number} id */
  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  );
};

export default App;
