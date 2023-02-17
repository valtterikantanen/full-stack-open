const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
