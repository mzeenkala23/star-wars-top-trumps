import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Card } from "./components/Card/Card";
import { GameControl } from "./components/gameControl";
import { states } from "./constants";

import "./App.css";
import { GET_STARSHIPS } from "./graphql/queries";

function App() {
  // We need to keep track of the various game states
  const [gameStatus, setGameStatus] = useState(states.BEGIN);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [previousWinner, setPreviousWinner] = useState(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(undefined);

  const { loading, data, error } = useQuery(GET_STARSHIPS, {
    skip: !playerDeck && !computerDeck,
  });

  const handleSelectedFeature = (feature) => {
    setSelectedFeature(feature);
  };

  const startPlaying = () => {
    const playerCard = playerDeck[0];
    const computerCard = computerDeck[0];

    const statusMapping = {
      Begin: () => play(playerCard, computerCard),
      Next_Round: () => continueHandler(playerCard, computerCard),
      Game_Over: () => resetGame(),
    };
    return statusMapping[gameStatus]();
  };

  const resetGame = () => {
    const ships = data.allStarships.starships;
    setGameStatus(states.BEGIN);
    setIsDraw(false);
    setSelectedFeature(undefined);
    setPreviousWinner(undefined);
    setPlayerDeck(ships.slice(0, 5));
    setComputerDeck(ships.slice(5, 10));
  };

  const continueHandler = (playerCard, computerCard) => {
    let playerUpdatedDeck;
    let computerUpdatedDeck;

    // We need to place cards that have been used to the back of the deck.
    if (isDraw) {
      playerUpdatedDeck = [...playerDeck.slice(1), playerCard];
      computerUpdatedDeck = [...computerDeck.slice(1), computerCard];
    } else {
      playerUpdatedDeck = [
        ...playerDeck.slice(1),
        ...(previousWinner === "player" ? [playerCard, computerCard] : []),
      ];
      computerUpdatedDeck = [
        ...computerDeck.slice(1),
        ...(previousWinner === "computer" ? [playerCard, computerCard] : []),
      ];
    }
    setPlayerDeck(playerUpdatedDeck);
    setComputerDeck(computerUpdatedDeck);

    //Restate state
    setSelectedFeature(undefined);
    setIsDraw(false);
    setGameStatus(states.BEGIN);
  };

  const isGamingEnding = (winner, draw) => {
    return (
      !draw &&
      ((winner === "player" && computerDeck.length === 1) ||
        (winner === "computer" && playerDeck.length === 1))
    );
  };

  const handleRoundWinner = () => {
    if (
      !isDraw &&
      gameStatus !== states.BEGIN &&
      gameStatus !== states.Game_Over
    ) {
      if (previousWinner === "player") {
        return <h1> You Win</h1>;
      } else if (previousWinner === "computer") {
        return <h1> You Lose</h1>;
      }
    }
    return null;
  };

  const handleGameWinner = () => {
    if (playerDeck.length > computerDeck.length) {
      return <h1> Game Over You Win</h1>;
    }
    return <h1> Game Over You Lose</h1>;
  };

  const play = (playerCard, computerCard) => {
    const playerFeature = Number(playerCard[selectedFeature]);
    const computerFeature = Number(computerCard[selectedFeature]);
    let isGameOver;
    if (playerFeature > computerFeature) {
      setPreviousWinner("player");
      isGameOver = isGamingEnding("player", false);
    } else if (playerFeature < computerFeature) {
      setPreviousWinner("computer");
      isGameOver = isGamingEnding("computer", false);
    } else {
      setIsDraw(true);
    }
    const gameStatus = isGameOver ? states.GAME_OVER : states.NEXT_ROUND;
    setGameStatus(gameStatus);
  };

  useEffect(() => {
    if (data) {
      const ships = data.allStarships.starships;
      setPlayerDeck(ships.slice(5, 10));
      setComputerDeck(ships.slice(0, 5));
    }
  }, [data]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div> There was an error</div>;
  }
  return (
    <div className="App">
      <div className="content-container">
        <div className="header-container">
          <Header
            playerScore={playerDeck.length}
            computerScore={computerDeck.length}
          />
        </div>
        <div className="cards-container">
          {playerDeck.length > 0 && computerDeck.length > 0 ? (
            <>
              <Card
                card={playerDeck[0]}
                selectedFeature={selectedFeature}
                isWinner={previousWinner}
                featureSelect={handleSelectedFeature}
                isClosed={
                  gameStatus === states.BEGIN && previousWinner === "computer"
                }
              />
              {gameStatus === states.GAME_OVER
                ? handleGameWinner()
                : handleRoundWinner()}
              {isDraw && <h1>Draw</h1>}
              <Card
                card={computerDeck[0]}
                selectedFeature={selectedFeature}
                isWinner={previousWinner}
                featureSelect={handleSelectedFeature}
                isClosed={
                  gameStatus === states.BEGIN && previousWinner !== "computer"
                }
              />
            </>
          ) : null}
        </div>
        <div>
          {/* We can only play if a user has selected a feature */}
          <GameControl
            status={gameStatus}
            beginPlaying={startPlaying}
            isPlayDisabled={!selectedFeature}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
