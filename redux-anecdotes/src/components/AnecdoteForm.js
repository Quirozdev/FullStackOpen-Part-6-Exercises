import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(anecdoteContent));
    dispatch(
      setNotification(`you created a new anecdote: ${anecdoteContent}`, 10)
    );
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
