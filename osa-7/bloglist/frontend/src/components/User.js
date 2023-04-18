import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getUsers } from '../requests';

const User = () => {
  const id = useParams().id;
  const result = useQuery('users', getUsers);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const user = result.data.find(user => user.id === id);

  if (user === undefined) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <em>{blog.title}</em> by {blog.author}
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
