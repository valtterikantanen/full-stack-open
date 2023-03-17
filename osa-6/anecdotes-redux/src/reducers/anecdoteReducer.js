import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const updatedState = state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
      return updatedState.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload;
      return anecdotes.sort((a, b) => b.votes - a.votes);
    }
  }
});

export function initializeAnecdotes() {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
}

export function createAnecdote(content) {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
}

export function voteAnecdote(anecdote) {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
}

export default anecdoteSlice.reducer;
export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
