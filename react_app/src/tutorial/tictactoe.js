import React from 'react';
import ReactDOM from 'react-dom';
import './tictactoe.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.player}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            XIsNext: true,
        };
    }

    handleClick(i) {
        if (this.state.squares[i] == null) {
            const newSquares = this.state.squares.slice();
            newSquares[i] = this.state.XIsNext ? 'X' : 'O';
            this.setState({
                squares: newSquares,
                XIsNext: !this.state.XIsNext,
            });
        }
    }

    renderSquare(i) {
        return (
            <Square
                player={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
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

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

export default Game;
