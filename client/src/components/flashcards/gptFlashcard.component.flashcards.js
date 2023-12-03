import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gptFlashcard.component.flashcards.scss'; // Create a separate CSS file for styling

const FlippableCard = ({username}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flippable-card-container">
      <Card className={`flippable-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <Card.Body>
          <div className={`card-face front ${isFlipped ? '' : 'hidden'}`}>
            <Card.Title>Front Side</Card.Title>
            <Card.Text>This is the front side content.</Card.Text>
          </div>
          <div className={`card-face back ${isFlipped ? 'hidden' : ''}`}>
            <Card.Title>Back Side</Card.Title>
            <Card.Text>This is the back side content.</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FlippableCard;
