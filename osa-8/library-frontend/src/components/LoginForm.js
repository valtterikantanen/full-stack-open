import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('LIBRARY-USER-TOKEN', token);
      navigate('/');
    }
  }, [result.data]); // eslint-disable-line

  async function submit(e) {
    e.preventDefault();
    login({ variables: { username, password } });
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">Username</label>
          <input value={username} id="username" onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
