import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function createNew(content) {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
}

async function vote(anecdote) {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
  return response.data;
}

const anecdoteService = { getAll, createNew, vote };

export default anecdoteService;
