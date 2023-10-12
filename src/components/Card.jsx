 // Card.js
import React from 'react';
import { useState } from 'react';

function Card({ card, editingCard, adminMode, onEditClick, onDeleteClick, onSaveClick, onCancelClick, onInputChange }) {
  const isEditing = editingCard && editingCard.id === card.id;
  const [showAnswers, setShowAnswers] = useState({});

  const handleEditClick = () => {
    onEditClick(card.id);
  };

  const toggleAnswer = (cardId) => {
    setShowAnswers((prevShowAnswers) => ({
      ...prevShowAnswers,
      [cardId]: !prevShowAnswers[cardId],
    }));
  };



  const handleSaveClick = () => {
    onSaveClick();
  };

  const handleCancelClick = () => {
    onCancelClick();
  };

  const handleDeleteClick = () => {
    onDeleteClick(card.id);
  };

  const handleInputChange = (event) => {
    onInputChange(event.target.name, event.target.value);
  };

  return (
    <div className="card">
      {isEditing ? (
        // Edit mode UI
        <div className="card-edit">
          <input
            type="text"
            name="question"
            value={editingCard.question}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="answer"
            value={editingCard.answer}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        // View mode UI
        <>
          <h3>Card ID: {card.id}</h3>
          <p>Question: {card.question}</p>
          <button onClick={() => toggleAnswer(card.id)}>
            {showAnswers[card.id] ? 'Hide Answer' : 'Show Answer'}
          </button>
          {showAnswers[card.id] && <p>Answer: {card.answer}</p>}
          <div className="card-buttons">
            {adminMode && (
              <>
                <button onClick={handleDeleteClick}>Delete</button>
                <button onClick={handleEditClick}>Edit</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
