// Columns.js
import './Columns.css';
import React, { useEffect, useState } from 'react';
import CardList from './CardList';
 

function Columns({ selectedTermId }) {
  const [columns, setColumns] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [terms ,setTerms] =useState([]);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    // Fetch the list of columns from the JSON server when the component mounts.
    fetch('http://localhost:3001/columns')
      .then((response) => response.json())
      .then((data) => setColumns(data))
      .catch((error) => {
        console.error('Error fetching columns:', error);
      });
  }, []);


  useEffect(() => {
    // Fetch the list of terms from the JSON server when the component mounts.
    fetch('http://localhost:3001/terms')
      .then((response) => response.json())
      .then((data) => setTerms(data))
      .catch((error) => {
        console.error('Error fetching terms:', error);
      });
  }, []);




  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
    column: null, // Initialize as null, we'll set it when adding a card
    tid: null, // Initialize as null, we'll set it when adding a card
  });

  const addCard = () => {
    // Add the new card to the db.json file by sending a POST request to your server.
    fetch('http://localhost:3001/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New card added:', data);
        // You can update the UI as needed here
      })
      .catch((error) => {
        console.error('Error adding a new card:', error);
      });

    // Reset the form fields and hide the form
    setNewCard({
      question: '',
      answer: '',
      column: null,
      tid: null,
    });
    setShowAddCardForm(false);
  };

  return (
    <div>
      <div>
      <button onClick={() => setShowAddCardForm(true)}>Add a card</button>
      <button onClick={() => setAdminMode(!adminMode)}>
        {adminMode ? 'Admin mode Off' : 'Admin mode On'}
      </button>
      </div>
       
      <div className="columns">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <h3>{column.label}</h3>
            <CardList termId={selectedTermId} columnId={column.id} adminMode={adminMode} /> 
          </div>
        ))}
      </div>
      

      {showAddCardForm && (
        <div className="add-card-form">
          <input
            type="text"
            placeholder="Question"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
           <select
            value={newCard.column || ''}
            onChange={(e) => setNewCard({ ...newCard, column: parseInt(e.target.value) })}
          >
            <option value="" disabled>
              Select Column
            </option>
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.label}
              </option>
            ))}
          </select>
          <select
  value={newCard.tid || ''}
  onChange={(e) => setNewCard({ ...newCard, tid: parseInt(e.target.value) })}
>
  <option value="" disabled>
    Select Term
  </option>
  {terms.map((term) => (
    <option key={term.id} value={term.id}>
      {term.name}
    </option>
  ))}
</select>

          <button onClick={addCard}>Add Card</button>
        </div>
      )}
    </div>
  );
}

export default Columns;

