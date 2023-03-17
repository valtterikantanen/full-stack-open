import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  async function addAnecdote(e) {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';

    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`You added “${anecdote}”`, 5));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}
