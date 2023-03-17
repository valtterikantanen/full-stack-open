import { useQuery } from 'react-query';
import { getAnecdotes } from '../requests';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
