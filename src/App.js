// src/App.js

import React, { useState } from 'react';
import Login from './components/Login';
import TermList from './components/TermList';
import Columns from './components/Columns';
import './App.css';
 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedTermId, setSelectedTermId] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  
  return (
    <div className="App">
       
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.username}!</h2>
          <div className="content">
            <TermList onTermClick={(termId) => setSelectedTermId(termId)} adminMode={adminMode}/>
            {selectedTermId && (
              <Columns selectedTermId={selectedTermId} />
            )}
          </div>
        </div>
      ) : (
        <Login setLoggedInUser={setLoggedInUser} />
      )}
    </div>
  );
}

export default App;