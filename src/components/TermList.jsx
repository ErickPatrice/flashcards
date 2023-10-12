  // src/components/TermList.js

import React, { useEffect, useState } from 'react';
import './TermList.css';

function TermList({ onTermClick}) {
  const [terms, setTerms] = useState([]);
  //


  useEffect(() => {
    // Fetch the list of terms from the JSON server when the component mounts.
    fetch('http://localhost:3001/terms')
      .then((response) => response.json())
      .then((data) => setTerms(data))
      .catch((error) => {
        console.error('Error fetching terms:', error);
      });
  }, []);

  return (
    <div>
       
      <div className="term-buttons">
        {terms.map((term) => (
          <button
            key={term.id}
            className="term-button"
            onClick={() => onTermClick(term.id)} // Pass term ID when clicked
          >
            {term.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TermList;
