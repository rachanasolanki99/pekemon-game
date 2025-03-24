import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';
import { shuffleArray } from './utils';

const generateCardData = () => {
    const images = Array.from({ length: 8 }, (_, i) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`);
    const pairs = [...images, ...images];
    return shuffleArray(pairs);
};

const Board: React.FC = () => {
    const [cards, setCards] = useState<string[]>(generateCardData());
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]); 
    const [matched, setMatched] = useState<boolean[]>(new Array(16).fill(false));
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex] === cards[secondIndex] && matched) {
                const newMatched = [...matched];
                newMatched[firstIndex] = newMatched[secondIndex] = true;
                setMatched(newMatched);
                setFlippedIndices([firstIndex, secondIndex]);
            } else {
                setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
            }
            setAttempts(prev => prev + 1);
        }
    }, [flippedIndices, cards, matched]);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length === 2 || matched[index]) return; // Prevent more than 2 cards flipped at a time
        setFlippedIndices((prev) => [...prev, index]);
    };

    const resetGame = () => {
        setCards(generateCardData());
        setFlippedIndices([]);
        setMatched(new Array(16).fill(false));
        setAttempts(0);
    };

    return (
        <div className="board">
            <h2>Number of Moves: {attempts}</h2>
            <div className="board-grid">
                {cards.map((image, index) => (
                    <Card
                        key={index}
                        id={index}
                        image={image}
                        isFlipped={flippedIndices.includes(index)}
                        onClick={() => handleCardClick(index)}
                        onMatch={() => setMatched((prev) => {
                            const newMatched = [...prev];
                            newMatched[index] = true;
                            return newMatched;
                        })}
                    />
                ))}
            </div>
            <div className="info">
                <button className="reset-button" onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
};

export default Board;
