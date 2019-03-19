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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                player={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),
                moved: 0,
            }],
            XIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const moved = current.moved;
        const squares = current.squares.slice();
        if (!(squares[i] || calculateWinner(squares))) {
            squares[i] = this.state.XIsNext ? 'X' : 'O';
            this.setState({
                history: history.concat([{
                    squares: squares,
                    moved: moved + 1,
                }]),
                XIsNext: !this.state.XIsNext,
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const moved = current.moved;
        const winner = calculateWinner(current.squares);
        var status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (moved == 9) {
            status = "It's a tie!";
        } else {
            status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

export default Game;
