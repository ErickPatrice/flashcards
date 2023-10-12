// CardList.js
import React, { useEffect, useState } from 'react';
import Card from './Card';

function CardList({ termId, columnId, adminMode }) {
  const [cards, setCards] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});
  const [editingCard, setEditingCard] = useState({});
  const [forceRerender, setForceRerender] = useState(false);

  const fetchCards = () => {
    fetch('http://localhost:3001/cards')
      .then((response) => response.json())
      .then((data) =>
        setCards(
          data.filter(
            (card) => card.tid === termId && card.column === columnId
          )
        )
      )
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  };


  useEffect(() => {
    // Fetch the list of cards from the JSON server when the component mounts.
     fetchCards()
  }, [termId, columnId]);

  const handleEditClick = (cardId) => {
    // Set the card you want to edit in the state
    const cardToEdit = cards.find((card) => card.id === cardId);
    setEditingCard(cardToEdit);
  };

  const handleSaveClick = () => {
    // Send a PUT or PATCH request to your server to update the card details
    if (editingCard) {
      fetch(`http://localhost:3001/cards/${editingCard.id}`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCard),
      })
        .then((response) => {
          if (response.status === 200) {
            // Card successfully updated
            // Fetch cards again to update the UI
            fetchCards();
            setEditingCard(null); // Clear the editingCard state
          } else {
            console.error('Failed to update card:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error updating card:', error);
        });
    }
  };


  const handleCancelClick = () => {
    // Clear the editingCard state
    setEditingCard({});
  };


  const handleInputChange = (name, value) => {
    // Update the editingCard state when input fields change
    setEditingCard({
      ...editingCard,
      [name]: value,
    });
  };


  async function  handleDeleteClick  (cardId) {
    // Send a DELETE request to your server to delete the card
    
    try {

    const response = await fetch(`http://localhost:3001/cards/${cardId}`, {
      method: 'DELETE',
    })
        if (response.status === 204) {
          // Card successfully deleted
          setForceRerender(true);
          setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        } else {
          console.error('Failed to delete card:', response.statusText);
        }
      }
      catch(error)  {
        console.error('Error deleting card:', error);
      };
  };

  return (
    <div>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            editingCard={editingCard}
            adminMode={adminMode}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onSaveClick={handleSaveClick}
            onCancelClick={handleCancelClick}
            onInputChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
