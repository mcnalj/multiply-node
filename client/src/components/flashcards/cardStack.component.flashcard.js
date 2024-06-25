import React, { useState } from 'react';
import './cardStack.component.flashcard.scss'; // Import your CSS file

const CardStack = () => {

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

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
  };

  const handleCardClick = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length);

    // setTimeout(() => {
    //     setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
    // }, 500);
  };

  return (
    <div className="card-stack">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${index === currentCard ? 'active' : ''}`}
          style={{ 
                transform: `translateZ(${index * 50}px rotateX(${index * 10}deg)
                // ${index === currentCard ? 'translateY(100px)' : ''}`,
            }}
           onClick={handleCardClick}
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
  );
};

export default CardStack;


