// App.js

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import QuestionContainer from './components/QuestionContainer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Set initial state to false

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setLoggedIn(true);
    }
  };

  return (
      <Container>
        {!loggedIn ? (
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        ) : (
            <QuestionContainer />
        )}
      </Container>
  );
};

export default App;
