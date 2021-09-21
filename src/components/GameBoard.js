import React, { Component } from "react"
import "../App.css"

export default class GameBoard extends Component {


    render() {
        const { currentBoard, updateGameBoard } = this.props
        return (
            <div className="grid-container">
                {currentBoard.map((value, index) => {
                    return (
                        <div key={index} className="grid-item" onClick={(e) => updateGameBoard(e, index)}> {value} </div>
                    )
                }
                )}
            </div>
        )
    }
}