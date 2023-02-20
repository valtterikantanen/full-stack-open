const Course = ({ course: { name, parts } }) => (
  <>
    <Header courseName={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </>
);

const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {totalExercises} exercises</strong>
    </p>
  );
};

export default Course;
