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

const StatisticLine = ({ text, value }) => {
	return (
		<>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = (good - bad) / total;
	const positive = (good / total) * 100 + ' %';

	if (total === 0) {
		return (
			<>
				<p>No feedback given</p>
			</>
		);
	} else {
		return (
			<tbody>
				<table>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="nuetral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={total} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive} />
				</table>
			</tbody>
		);
	}
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incrementGood = () => {
		setGood(good + 1);
	};
	const incrementNeutral = () => {
		setNeutral(neutral + 1);
	};
	const incrementBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<Title text="give feedback" />
			<Button eventHandler={incrementGood} text="good" />
			<Button eventHandler={incrementNeutral} text="neutral" />
			<Button eventHandler={incrementBad} text="bad" />
			<Title text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
