import { useMutation, useQueryClient } from 'react-query';
import { useNotificationDispatch } from '../NotificationContext';
import { updateAnecdote } from '../requests';

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const setTimedNotification = (message, time) => {
    const timeInMilliseconds = time * 1000;
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' });
    }, timeInMilliseconds);
  };

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map(anecdote => (anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      );
      setTimedNotification(`Anecdote “${updatedAnecdote.content}” voted`, 5);
    }
  });

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
