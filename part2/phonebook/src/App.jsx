import React from "react";
import { useState } from "react";
import Person from "./components/Person.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [showFiltered, setShowFiltered] = useState(false);

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {void}
   * */
  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    const isExist = persons.find(person => person.name === personObject.name);
    if (isExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }

    setNewName("");
    setNewNumber("");
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   * @returns {void}
   * */
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   * @returns {void}
   * */
  const handleNumberChange = event => {
    const inputValue = event.target.value;
    const res = /[^0-9-]/.test(inputValue);
    if (!res) {
      setNewNumber(event.target.value);
    }
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   * @returns {void}
   * */
  const handleFilterNameChange = event => {
    const inputValue = event.target.value;
    setNewFilterName(inputValue);

    if (inputValue) {
      setShowFiltered(true);
      const newfilteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredPersons([...newfilteredPersons]);
    } else {
      setShowFiltered(false);
    }
  };

  const personsToShow = showFiltered ? filteredPersons : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilterName} onChange={handleFilterNameChange} />
      </div>
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
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
