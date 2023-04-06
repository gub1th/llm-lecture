import React, { useState } from "react";
import Board from "./components/Board";

const defaultPlayerOne = "X";
const defaultPlayerTwo = "O";
const defaultBoardSize = 3;

const checkForWinner = (board, currentPlayer) => {
  // Check for rows
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((cell) => cell === currentPlayer)) {
      return true;
    }
  }

  // Check for columns
  for (let i = 0; i < board.length; i++) {
    if (board.every((row) => row[i] === currentPlayer)) {
      return true;
    }
  }

  // Check for diagonal
  if (
    board.every((row, index) => row[index] === currentPlayer) ||
    board.every((row, index) => row[board.length - 1 - index] === currentPlayer)
  ) {
    return true;
  }

  return false;
};

const checkForDraw = (board) => {
  return board.every((row) => row.every((cell) => cell !== null));
};

const TicTacToe = () => {
  const [board, setBoard] = useState(
    Array.from({ length: defaultBoardSize }, () =>
      Array.from({ length: defaultBoardSize }, () => null)
    )
  );
  const [playerOne, setPlayerOne] = useState(defaultPlayerOne);
  const [playerTwo, setPlayerTwo] = useState(defaultPlayerTwo);
  const [currentPlayer, setCurrentPlayer] = useState(playerOne);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null || winner !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkForWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (checkForDraw(newBoard)) {
      setWinner("draw");
    } else {
      setCurrentPlayer(currentPlayer === playerOne ? playerTwo : playerOne);
    }
  };

  const handleResetClick = () => {
    setBoard(
      Array.from({ length: defaultBoardSize }, () =>
        Array.from({ length: defaultBoardSize }, () => null)
      )
    );
    setCurrentPlayer(playerOne);
    setWinner(null);
  };

  return (
    <div>
      <Board board={board} onCellClick={handleCellClick} />
      {winner ? (
        <div>{winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`}</div>
      ) : (
        <div>Current player: {currentPlayer}</div>
      )}
      <button onClick={handleResetClick}>Reset game</button>
    </div>
  );
};

export default TicTacToe;