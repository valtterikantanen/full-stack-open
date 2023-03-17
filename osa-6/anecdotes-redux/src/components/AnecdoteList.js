import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  function vote(anecdote) {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted “${anecdote.content}”`, 5));
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
      ))}
    </div>
  );
}
