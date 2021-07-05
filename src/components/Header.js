import React from "react";

export const Header = ({ playerScore, computerScore }) => {
  return (
    <div id="header">
      <h1>Scores</h1>
      <div>
        <span> Player {playerScore} </span> :{" "}
        <span> Computer {computerScore}</span>
      </div>
    </div>
  );
};
