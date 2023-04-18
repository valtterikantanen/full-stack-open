import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getUsers } from '../requests';

const Users = () => {
  const result = useQuery('users', getUsers);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const users = result.data;

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
