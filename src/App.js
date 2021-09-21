import React, { Component } from "react"
import GameBoard from "./components/GameBoard"
import MovesHistory from "./components/MovesHistory"


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentBoard: Array(9).fill(""),
      currentPlayer: "o",
      prevPlayer: "",
      movesHistory: [],
      winner: "",
      counter: 0
    };
    this.winCondition = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]];
  }

  componentDidUpdate(prevProps) {
    this.winCheck()
  }

  updateGameBoard = (e, cellId) => {
    if (this.state.currentBoard[cellId]) {
      return;
    }
    let board = JSON.parse(JSON.stringify(this.state.currentBoard))
    board[cellId] = this.state.currentPlayer
    
    this.changePlayer()
    this.setState({
      currentBoard: board,
      counter: this.state.counter + 1
    })
  }

  changePlayer = () => {
    const nextPlayer = this.state.currentPlayer === "o" ? "x" : "o"
    this.setState({
      prevPlayer: this.state.currentPlayer,
      currentPlayer: nextPlayer
    })
  }

  winCheck = () => {
    const board = this.state.currentBoard
    const win = this.winCondition.some(elem => {
      const [a, b, c] = elem;
      return board[a] === board[b] && board[b] === board[c] && board[a] !== "" ? true : false
    })
    if(win || this.state.counter > 8){
      this.displayMessage(win)
    }
  }

  displayMessage = (win) => {
    win ? alert(`player ${this.state.prevPlayer} Wins`) : alert("Its a draw..good game..")
  }

  render() {
    return (
      <div>
        <h1>TicTacToe</h1>
        <GameBoard
          currentBoard={this.state.currentBoard}
          currentPlayer={this.state.currentPlayer}
          updateGameBoard={this.updateGameBoard}
        />
        <MovesHistory />
      </div>
    )
  }
}

export default App;
