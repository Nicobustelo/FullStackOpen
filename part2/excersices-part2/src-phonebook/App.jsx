import { useState, useEffect } from 'react';
import axios from 'axios';

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

const Persons = ({ filteredPersons }) => {
	return (
		<div>
			{filteredPersons.map(person => (
				<p key={person.name}>
					{person.name} {person.number}
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
		axios.get('http://localhost:3001/persons').then(response => {
			console.log('fetching data...');
			console.log(response.data);
			setPersons(response.data);
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
			window.alert(`${newName} is already added to phonebook`);
		} else {
			const nameToAdd = {
				name: newName,
				number: newNumber,
			};
			setPersons(persons.concat(nameToAdd));
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
			<Persons filteredPersons={filteredPersons} />
		</div>
	);
};

export default App;
