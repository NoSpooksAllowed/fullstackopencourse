import React from "react";
import { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/persons";

/**
 * @typedef {Object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} number
 */

const App = () => {
  /**
   * @type {Person[]}
   */
  const initialPersons = [];
  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [showFiltered, setShowFiltered] = useState(false);

  const hook = () => {
    personServices.getAll().then(initialPersons => setPersons(initialPersons));
  };

  useEffect(hook, []);

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
      personServices.create(personObject).then(person => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  /**
   * @param {Person} person
   * @returns {void}
   * */
  const handleDeletePerson = person => {
    if (window.confirm(`delete ${person.name}`)) {
      personServices.deletePerson(person.id).then(() => {
        personServices.getAll().then(initialPersons => setPersons(initialPersons));
      });
    }
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
      <Filter newFilterName={newFilterName} handleFilterNameChange={handleFilterNameChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(person => (
          <Person
            key={person.id}
            person={person}
            handleDeleteClick={() => handleDeletePerson(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
