import { useMutation, useQueryClient } from 'react-query';
import { useNotificationDispatch } from '../NotificationContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const setTimedNotification = (message, time) => {
    const timeInMilliseconds = time * 1000;
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' });
    }, timeInMilliseconds);
  };

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
      setTimedNotification(`Anecdote “${newAnecdote.content}” added`, 5);
    },
    onError: ({ response }) => {
      setTimedNotification(response.data.error, 5);
    }
  });

  const onCreate = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
