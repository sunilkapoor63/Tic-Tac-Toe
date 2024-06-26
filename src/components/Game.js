import React, { useState, useEffect } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isBlueNext, setIsBlueNext] = useState(true);
  const [scores, setScores] = useState({ blue: 0, red: 0 });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores'));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = isBlueNext ? 'blue' : 'red';
    setSquares(newSquares);
    setIsBlueNext(!isBlueNext);
    const winner = calculateWinner(newSquares);
    if (winner) {
      const newScores = { ...scores };
      newScores[winner]++;
      setScores(newScores);
      localStorage.setItem('scores', JSON.stringify(newScores));
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsBlueNext(true);
  };

  const startNewGame = () => {
    setScores({ blue: 0, red: 0 });
    localStorage.setItem('scores', JSON.stringify({ blue: 0, red: 0 }));
    resetGame();
  };

  return (
    <div className="game">
      <ScoreBoard scores={scores} />
      <Board squares={squares} onClick={handleClick} />
      <div className="buttons">
        <button onClick={resetGame}>Restart Game</button>
        <button onClick={startNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default Game;
