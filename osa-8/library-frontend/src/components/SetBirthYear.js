import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

export default function SetBirthYear({ authors }) {
  const [author, setAuthor] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  async function submit(e) {
    e.preventDefault();

    editAuthor({ variables: { name: author, setBornTo: Number(born) } });

    setBorn('');
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="author">Name</label>
          <select value={author} id="author" onChange={e => setAuthor(e.target.value)}>
            {authors.map(author => (
              <option key={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">Born</label>
          <input type="number" id="born" value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
}
