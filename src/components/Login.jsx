// src/components/Login.js

import React, { useState } from 'react';

function Login({ setLoggedInUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the provided username and password match any user in the db.json file.
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) => user.username === username && user.pwd === password
        );
        if (user) {
          // Authentication successful, set the user as logged in.
          setLoggedInUser(user);
        } else {
          // Authentication failed, show an error message.
          alert('Login failed. Please check your username and password.');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
