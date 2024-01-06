import React, { useState } from 'react';
import './cardSlide.component.flashcard.scss'; // Import your CSS file

const CardSlide = () => {

    const cards = [
        {
            question: "What is the derivative?",
            answer: "The slope"
        },
        {
            question: "What is the integral?",
            answer: "The opposite of the derivative."
        },
        {
            question: "3",
            answer: "answer3"
        },
        {
            question: "4",
            answer: "answer4"
        }        
    
      ]
  const [currentCard, setCurrentCard] = useState(0);

  const handleCardClick = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
  };

  return (
    <div>
    <div className="card-stack pt-4" onClick={handleCardClick}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${index === currentCard ? 'active' : ''}`}
        >
          <div className="card-content">
            <div className="question">{card.question}</div>
          </div>
          <div className="card-content back">
            <div className="answer">{card.answer}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CardSlide;

