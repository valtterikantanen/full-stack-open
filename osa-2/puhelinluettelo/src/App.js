import { useState, useEffect } from 'react';
import contactsService from './services/contacts';

const Filter = ({ value, handleChange }) => (
  <div>
    Filter shown with <input value={value} onChange={handleChange} />
  </div>
);

const Notification = ({ notification }) => {
  if (notification === null) return null;
  const { message, type } = notification;
  return <div className={`notification ${type}`}>{message}</div>;
};

const PersonForm = props => {
  const { handleSubmit, name, handleNameChange, number, handleNumberChange } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, deleteNumber }) => (
  <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter))
      .map(person => (
        <Person key={person.name} person={person} deleteNumber={deleteNumber} />
      ))}
  </div>
);

const Person = ({ person, deleteNumber }) => (
  <p>
    {person.name} {person.number} <button onClick={() => deleteNumber(person)}>Delete</button>
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactsService.getAll().then(contacts => setPersons(contacts));
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterStringChange = e => {
    setFilter(e.target.value);
  };

  const addNumber = e => {
    e.preventDefault();
    if (newName === '' || newNumber === '') {
      displayNotification({ message: 'Name and number are mandatory fields', type: 'error' });
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    const currentPerson = persons.find(person => person.name === newName);
    if (currentPerson != null) {
      updateNumber(currentPerson.id, newPerson);
    } else {
      contactsService.create(newPerson).then(person => {
        setPersons(persons.concat(person));
      });
      displayNotification({ message: `Added ${newName}`, type: 'success' });
    }
    setNewName('');
    setNewNumber('');
  };

  const deleteNumber = person => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    contactsService
      .remove(person.id)
      .then(setPersons(persons.filter(contact => contact.id !== person.id)));
    displayNotification({ message: `Deleted ${person.name}`, type: 'success' });
  };

  const updateNumber = (id, newPerson) => {
    if (
      !window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    )
      return;
    let message = { message: `Updated ${newPerson.name}`, type: 'success' };
    contactsService
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)));
      })
      .catch(error => {
        message = {
          message: `Information of ${newPerson.name} has already been removed from server`,
          type: 'error'
        };
        setPersons(persons.filter(person => person.id !== id));
      })
      .finally(() => displayNotification(message));
  };

  const displayNotification = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter value={filter} handleChange={handleFilterStringChange} />
      <h2>Add a new number</h2>
      <PersonForm
        handleSubmit={addNumber}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
