import { useQuery } from '@apollo/client';
import { ALL_BOOKS_WITH_GENRE, FAVORITE_GENRE } from '../queries';
import { useState, useEffect } from 'react';

export default function RecommendedBooks() {
  const favoriteGenreResult = useQuery(FAVORITE_GENRE);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const booksResult = useQuery(ALL_BOOKS_WITH_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre
  });

  useEffect(() => {
    setSelectedGenre(favoriteGenreResult.data?.me.favoriteGenre);
  }, [favoriteGenreResult.data]);

  if (selectedGenre && booksResult.data) {
    const books = booksResult.data.allBooks;
    return (
      <div>
        <h2>Book recommendations</h2>
        Books in your favorite genre <b>{selectedGenre}</b>
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
      </div>
    );
  }

  return <div>loading...</div>;
}
