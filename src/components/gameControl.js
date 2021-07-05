import React from "react";

export const GameControl = ({ isPlayDisabled, beginPlaying, status }) => {
  const buttonLabel = {
    Begin: "Play",
    Next_Round: "Next Round",
    Game_Over: "Reset Game",
  };

  return (
    <button onClick={() => beginPlaying()} disabled={isPlayDisabled}>
      {" "}
      {buttonLabel[status]}
    </button>
  );
};
