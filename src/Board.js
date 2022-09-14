import React from "react";
import { Square } from "./Square";
import { findWinner } from "./findWinner";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        uponClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    let squares = this.state.squares.slice(); // slice to create an array (duplicate)
    if (squares[i] || findWinner(squares)) return;
    let xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !xIsNext,
    });
  }

  render() {
    let winner = findWinner(this.state.squares);
    let status;
    if (winner) status = "Winner: " + winner;
    else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <p>{status}</p>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
