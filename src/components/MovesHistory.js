import React, { Component } from "react"

export default class GameBoard extends Component {

    render() {
        const {movesHistory} = this.props
        return (
            <div>
                <h1>MovesHistory</h1>
                <ul>
                    {movesHistory.map( move => <li key={move.cellId}>{`player: ${move.player}, placed on ${move.cellId + 1}`}</li>)}
                </ul>
            </div>
        )
    }
}