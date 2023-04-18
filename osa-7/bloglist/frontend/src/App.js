import { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import loginService from './services/login';
import storageService from './services/storage';

import LoginForm from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Notification from './components/Notification';

import NotificationContext from './NotificationContext';
import UserContext from './UserContext';

const App = () => {
  const navBarStyle = {
    marginBottom: 2,
    padding: 5,
    backgroundColor: '#BBB',
    flexWrap: 'wrap',
    display: 'flex',
    gap: '15px'
  };

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload;
      case 'RESET':
        return { message: null };
      default:
        return state;
    }
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.payload;
      case 'LOGOUT':
        return null;
      default:
        return state;
    }
  };

  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null });
  const [user, userDispatch] = useReducer(userReducer, null);

  useEffect(() => {
    const user = storageService.loadUser();
    userDispatch({ type: 'LOGIN', payload: user });
  }, []);

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: 'LOGIN', payload: user });
      storageService.saveUser(user);
      notifyWith('welcome!');
    } catch (e) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const logout = async () => {
    userDispatch({ type: 'LOGOUT' });
    storageService.removeUser();
    notifyWith('logged out');
  };

  const notifyWith = (message, type = 'info') => {
    notificationDispatch({ type: 'SET', payload: { message, type } });

    setTimeout(() => {
      notificationDispatch({ type: 'RESET' });
    }, 3000);
  };

  if (!user) {
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm login={login} />
        </div>
      </NotificationContext.Provider>
    );
  }

  return (
    <Router>
      <UserContext.Provider value={user}>
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
          <div style={navBarStyle}>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <div>
            <h2>blogs</h2>
            <Notification />
            <Routes>
              <Route path="/" element={<Home notifyWith={notifyWith} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog notifyWith={notifyWith} />} />
            </Routes>
          </div>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
