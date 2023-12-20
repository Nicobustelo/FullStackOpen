const Course = props => {
	return (
		<>
			<Header text={props.course.name} />
			<Content parts={props.course.parts} />
		</>
	);
};

const Header = ({ text }) => {
	return (
		<>
			<h1>{text}</h1>
		</>
	);
};

const Content = props => {
	return (
		<>
			{props.parts.map(part => (
				<Part key={part.id} part={part} />
			))}
			<Sum parts={props.parts} />
		</>
	);
};

const Part = props => {
	return (
		<>
			<p>
				{props.part.name} {props.part.exercises}
			</p>
		</>
	);
};

const Sum = props => {
	let sum = props.parts.reduce((a, p) => a + p.exercises, 0);
	return (
		<>
			<p>
				<b>total of {sum} excersices</b>
			</p>
		</>
	);
};

export default Course;
