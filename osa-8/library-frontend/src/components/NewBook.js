import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS_WITH_GENRE } from '../queries';

export default function NewBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS_WITH_GENRE, variables: { genre: null } },
      { query: ALL_BOOKS_WITH_GENRE, variables: { genre } }
    ]
  });

  async function submit(e) {
    e.preventDefault();

    addBook({ variables: { title, published: Number(published), author, genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  }

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">title</label>
          <input value={title} id="title" onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input value={author} id="author" onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="published">published</label>
          <input
            type="number"
            id="published"
            value={published}
            onChange={e => setPublished(e.target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={e => setGenre(e.target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
}
