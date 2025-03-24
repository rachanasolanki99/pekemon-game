// src/components/Card.tsx
import React from 'react';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  onClick: () => void;
  onMatch: () => void;
}

const Card: React.FC<CardProps> = ({ id, image, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      {isFlipped ? (
        <img src={image} alt={`pokemon ${id}`} />
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  );
};

export default Card;
