import React, { Component } from "react"
import GameBoard from "./components/GameBoard"
import MovesHistory from "./components/MovesHistory"
import { Button, Container, Grid } from "@mui/material"


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
    this.endGame = false;
    this.initialState = JSON.parse(JSON.stringify(this.state))
  }



  componentDidUpdate(prevProps) {
    this.winCheck()
  }

  updateGameBoard = (e, cellId) => {
    if (this.state.currentBoard[cellId] || this.endGame) {
      return;
    }
    let board = JSON.parse(JSON.stringify(this.state.currentBoard))
    board[cellId] = this.state.currentPlayer

    let movesHistory = JSON.parse(JSON.stringify(this.state.movesHistory))
    movesHistory.push({ cellId, player: this.state.currentPlayer })
    this.changePlayer()
    this.setState({
      currentBoard: board,
      movesHistory: movesHistory,
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
    if (win || this.state.counter > 8) {
      this.displayMessage(win)
    }
  }

  displayMessage = (win) => {
    win ? alert(`player ${this.state.prevPlayer} Wins`) : alert("Its a draw..good game..");
    this.endGame = true;
  }

  resetGame = () => {
    this.setState(JSON.parse(JSON.stringify(this.initialState)))
  }

  render() {
    return (
      <Container maxWidth="md">
        <h1>TicTacToe</h1>
        <Grid container spacing={3}>

          <Grid item md={8} justify="center">
            <GameBoard
              currentBoard={this.state.currentBoard}
              currentPlayer={this.state.currentPlayer}
              updateGameBoard={this.updateGameBoard}
            />
          </Grid>

          <Grid item md={4}>
            <MovesHistory
              movesHistory={this.state.movesHistory}
            />
          </Grid>

          <Grid item md={3}>
            <Button variant="contained" onClick={this.resetGame}>
              RESET
            </Button>
          </Grid>

        </Grid>
      </Container>
    )
  }
}

export default App;
