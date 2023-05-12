import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS_WITH_GENRE, ALL_GENRES, BOOK_ADDED } from '../queries';
import { useState } from 'react';

export default function Books() {
  const client = useApolloClient();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const booksResult = useQuery(ALL_BOOKS_WITH_GENRE, {
    variables: { genre: selectedGenre !== null ? selectedGenre : null }
  });
  const genresResult = useQuery(ALL_GENRES);

  function SelectedGenre() {
    if (!selectedGenre) return null;
    return (
      <>
        in genre <b>{selectedGenre}</b>
      </>
    );
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`New book ${addedBook.title} added!`);

      client.cache.updateQuery(
        {
          query: ALL_BOOKS_WITH_GENRE,
          variables: { genre: selectedGenre !== null ? selectedGenre : null }
        },
        ({ allBooks }) => ({
          allBooks: [...allBooks, addedBook]
        })
      );

      client.cache.updateQuery(
        {
          query: ALL_BOOKS_WITH_GENRE,
          variables: { genre: null }
        },
        ({ allBooks }) => ({
          allBooks: [...allBooks, addedBook]
        })
      );
    }
  });

  if (booksResult.data && genresResult.data) {
    const books = booksResult.data.allBooks;
    const genres = genresResult.data.allBooks.map(book => book.genres).flat(1);
    const uniqueGenres = genres.filter((value, index) => genres.indexOf(value) === index);
    return (
      <div>
        <h2>Books</h2>
        <SelectedGenre />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {uniqueGenres.map(genre => (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setSelectedGenre(null)}>all genres</button>
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
}
