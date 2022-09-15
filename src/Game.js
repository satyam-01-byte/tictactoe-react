import React from "react";
import "./Game.css";
import Board from "./Board";
import { findWinner } from "./findWinner";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: -1,
          col: -1,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (findWinner(squares) || squares[i]) {
      return;
    }
    const row = Math.floor(i / 3);
    const col = i % 3;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: row,
          col: col,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    this.state.history.map((step, move) => {
      document.getElementById(move).classList.remove("moveBtnClicked");
      return null;
    });
    document.getElementById(step).classList.add("moveBtnClicked");
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = findWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc;
      if (move) {
        desc = "Go to move #" + move;
        if (step.row !== -1) {
          desc += " (" + step.row + ", " + step.col + ")";
        }
      } else desc = "Go to game start";

      return (
        <li key={move}>
          <button
            id={`${move}`}
            className="moveBtn"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;

    if (winner) status = "Winner: " + winner;
    else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            uponClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
