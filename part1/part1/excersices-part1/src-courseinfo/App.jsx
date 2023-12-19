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
	props.parts.map(x => (sum += x.exercises));
	return (
		<>
			<p>Number of excersices {sum}</p>
		</>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content
				part={course.parts[0].name}
				excersices={course.parts[0].exercises}
			/>
			<Content
				part={course.parts[1].name}
				excersices={course.parts[1].exercises}
			/>
			<Content
				part={course.parts[2].name}
				excersices={course.parts[2].exercises}
			/>
			<Total parts={course.parts} />
		</div>
	);
};
export default App;
