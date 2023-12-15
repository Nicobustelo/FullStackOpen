const Header = props => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	);
};

const Content = props => {
	return (
		<>
			<p>
				{props.part} {props.excersices}
			</p>
		</>
	);
};

const Total = props => {
	let sum = 0;
	console.log(props);
	props.total.map(x => (sum += x));
	return (
		<>
			<p>Number of excersices {sum}</p>
		</>
	);
};

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;
	const total = [exercises1, exercises2, exercises3];

	return (
		<div>
			<Header course={course} />
			<Content part={part1} excersices={exercises1} />
			<Content part={part2} excersices={exercises2} />
			<Content part={part3} excersices={exercises3} />
			<Total total={total} />
		</div>
	);
};

export default App;
