import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

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
    console.log("effect");
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
