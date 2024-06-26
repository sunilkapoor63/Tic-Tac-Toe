import React from 'react';

const ScoreBoard = ({ scores }) => {
  return (
    <div className="score-board">
      <div>Blue: {scores.blue}</div>
      <div>Red: {scores.red}</div>
    </div>
  );
};

export default ScoreBoard;
