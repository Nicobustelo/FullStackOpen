import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';

const Filter = ({ value, eventHandler }) => {
	return (
		<div>
			filter: <input value={value} onChange={eventHandler} />
		</div>
	);
};

const PersonForm = props => {
	return (
		<form onSubmit={props.onSubmit}>
			<Input text="name" value={props.newName} onChange={props.newNameChange} />
			<Input
				text="number"
				value={props.newNumber}
				onChange={props.numberChange}
			/>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Input = ({ text, value, onChange }) => {
	return (
		<div>
			{text}: <input value={value} onChange={onChange} />
		</div>
	);
};

const Persons = ({ filteredPersons, eventHandler }) => {
	return (
		<div>
			{filteredPersons.map(person => (
				<p key={person.name}>
					{person.name} {person.number}{' '}
					<button onClick={() => eventHandler(person)}>delete</button>
				</p>
			))}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterSearch, setFilterSearch] = useState('');

	const hook = () => {
		phonebookService.getAll().then(response => {
			console.log('fetching data...');
			console.log(response);
			setPersons(response);
		});
	};

	useEffect(hook, []);

	console.log(`rendered page with ${persons.length} persons`);

	const filteredPersons = persons.filter(person => {
		return person.name.includes(filterSearch);
	});

	const newNameChange = event => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const addPerson = event => {
		event.preventDefault();
		if (persons.find(person => person.name === newName)) {
			confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			const updatePerson = persons.find(person => person.name === newName);
			const updatedPerson = { ...updatePerson, number: newNumber };
			phonebookService.update(updatePerson.id, updatedPerson).then(response => {
				setPersons(
					persons.map(person =>
						person.id !== updatePerson.id ? person : updatedPerson
					)
				);
			});
		} else {
			const nameToAdd = {
				name: newName,
				number: newNumber,
			};
			phonebookService.create(nameToAdd).then(response => {
				setPersons(persons.concat(nameToAdd));
				setNewNumber('');
				setNewName('');
			});
		}
	};

	const numberChange = event => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const changeFilter = event => {
		console.log(event.target.value);
		setFilterSearch(event.target.value);
	};

	const deleteContact = ({ name, id }) => {
		if (confirm(`Delete ${name}?`)) {
			phonebookService.deletePerson(id).then(response => {
				setPersons(persons.filter(p => p.id !== id));
			});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filterSearch} eventHandler={changeFilter} />
			<h3>Add a new contact</h3>
			<PersonForm
				onSubmit={addPerson}
				newName={newName}
				newNameChange={newNameChange}
				newNumber={newNumber}
				numberChange={numberChange}
			/>
			<h3>Numbers</h3>
			<Persons filteredPersons={filteredPersons} eventHandler={deleteContact} />
		</div>
	);
};

export default App;
