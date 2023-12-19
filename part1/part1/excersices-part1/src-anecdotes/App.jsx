import { useState } from 'react';

const Title = ({ text }) => {
	return (
		<>
			<h1>{text}</h1>
		</>
	);
};

const Button = ({ eventHandler, text }) => {
	return <button onClick={eventHandler}>{text}</button>;
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	const [selected, setSelected] = useState(0);

	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const randomAnecdote = () => {
		console.log(votes);
		setSelected(randomIntFromInterval(1, anecdotes.length));
	};

	const voteUp = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	const max = Math.max(...votes);

	const index = votes.indexOf(max);
	console.log(index);

	return (
		<div>
			<Title text="Anecdote of the day" />
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<Button eventHandler={voteUp} text="vote" />
			<Button eventHandler={randomAnecdote} text="random anecdote" />
			<Title text="Anecdote with most votes" />
			<p>{anecdotes[index]}</p>
			<p>has {votes[index]} votes</p>
		</div>
	);
};

export default App;
