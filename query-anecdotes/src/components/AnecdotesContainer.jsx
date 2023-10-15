import { increaseAnecdoteVotes } from '../request';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const AnecdotesContainer = ({ anecdotes }) => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const increaseVotesMutation = useMutation(increaseAnecdoteVotes, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    increaseVotesMutation.mutate(anecdote);
    dispatch({ type: 'ANECDOTE_VOTED', payload: anecdote.content });
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesContainer;
