import { useQuery } from '@tanstack/react-query';

import { getAnecdotes } from './request';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import AnecdotesContainer from './components/AnecdotesContainer';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in server :(</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdotesContainer anecdotes={anecdotes} />
    </div>
  );
};

export default App;
