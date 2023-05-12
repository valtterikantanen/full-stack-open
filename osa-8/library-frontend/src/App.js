import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import RecommendedBooks from './components/RecommendedBooks';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

export default function App() {
  const padding = { padding: 5 };
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem('LIBRARY-USER-TOKEN'));
  }, []);

  function logout() {
    setToken(null);
    localStorage.removeItem('LIBRARY-USER-TOKEN');
    client.resetStore();
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Authors
        </Link>
        <Link style={padding} to="/books">
          Books
        </Link>
        {!token && (
          <Link style={padding} to="/login">
            Log in
          </Link>
        )}
        {token && (
          <>
            <Link style={padding} to="/recommended-books">
              Recommended books
            </Link>
            <Link style={padding} to="/add-book">
              Add book
            </Link>
            <button onClick={logout}>Log out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/recommended-books" element={<RecommendedBooks />} />
        <Route path="/add-book" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  );
}
