import { useEffect, useState } from "react";
import Square from "./Square.jsx";

const Board = () => {
  const [game, setGame] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [player, setPlayer] = useState(true);
  const [indexUndo, setIndexUndo] = useState(null);
  const [checkPlayerUndo, setCheckPlayerUndo] = useState([]);
  const listElement = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handlePlay = (position) => {
    const newGame = game.map((g, index) => {
      if (index === position) {
        return player ? "X" : "O";
      }
      return g;
    });
    setGame(newGame);
    setPlayer(!player);
  };

  const listWinner = [
    [0, 1, 2],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const checkWinner = () => {
    for (let i = 0; i < listWinner.length; i++) {
      const [p1, p2, p3] = listWinner[i];
      if (game[p1] === game[p2] && game[p2] === game[p3]) {
        return game[p1];
      }
    }
    return null;
  };

  const handleReset = () => {
    setGame([null, null, null, null, null, null, null, null, null]);
    setPlayer(true);
  };

  const handleUndo = () => {
    const lookingPlayer = game.find((item, index) => index === indexUndo);
    for (let index = 0; index < checkPlayerUndo.length; index++) {
      if (lookingPlayer === checkPlayerUndo[index]) {
        alert("Bạn đã undo rồi");
        return;
      }
    }
    const newGame = game.map((item, index) => {
      if (indexUndo === index) {
        setCheckPlayerUndo((prev) => [...prev, item]);
        return null;
      }
      return item;
    });
    setGame(newGame);
    setPlayer(!player);
  };

  useEffect(() => {
    const timeRandom = setTimeout(() => {
      let randomNumber = Math.floor(Math.random() * 9);
      const checkValueGame = game.filter((item) => item == null);
      while (checkValueGame.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 9);
      }
      handlePlay(randomNumber);
      setIndexUndo(randomNumber);
    }, 3000);

    return () => {
      clearTimeout(timeRandom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <>
      <h2 className="mb-3">
        <span
          className="icon-undo d-block mr-4 hover:cursor-pointer"
          onClick={handleUndo}
        >
          <i class="fa-sharp fa-solid fa-rotate-left"></i>
        </span>
        Winner is: {checkWinner()}
      </h2>
      <div className="grid grid-cols-3 gap-2 w-[240px]">
        {listElement.map((item, index) => (
          <Square
            key={`square-${index}`}
            value={game[item]}
            position={item}
            setIndexUndo={setIndexUndo}
            handlePlay={handlePlay}
          />
        ))}
      </div>
      <button
        className="p-2 mt-3 border-[2px] rounded-2xl text-white bg-blue-600 border-blue-500"
        onClick={handleReset}
      >
        Reset game
      </button>
    </>
  );
};

export default Board;
