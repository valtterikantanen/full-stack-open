import { useState } from 'react';

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomInteger = max => Math.floor(Math.random() * max);

  const handleRenderNext = () => setSelected(getRandomInteger(anecdotes.length));

  const handleVote = () => {
    const newPoints = [...votes];
    newPoints[selected] += 1;
    setVotes(newPoints);
  };

  const maxVotes = () => Math.max(...votes);

  const anecdoteWithMostVotes = () => {
    const index = votes.indexOf(maxVotes());
    return anecdotes[index];
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRenderNext}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdoteWithMostVotes()} votes={maxVotes()} />
    </>
  );
};

export default App;
