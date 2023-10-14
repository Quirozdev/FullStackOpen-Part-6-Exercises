import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    const newAnecdote = await anecdoteService.createNew(anecdoteContent);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you created a new anecdote: ${anecdoteContent}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
