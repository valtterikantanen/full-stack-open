import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ logUserIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    await logUserIn({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  logUserIn: PropTypes.func.isRequired
};

export default LoginForm;
