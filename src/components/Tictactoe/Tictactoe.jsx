

import React, { useRef, useState } from 'react';
import './Tictactoe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const Tictactoe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const winningComboRef = useRef([]);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src=${cross_icon} alt="Cross" class="icon" />`;
            data[num] = "X";
        } else {
            e.target.innerHTML = `<img src=${circle_icon} alt="Circle" class="icon" />`;
            data[num] = "O";
        }

        setCount(count + 1);
        checkWinner();
    };

    const checkWinner = () => {
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let combo of wins) {
            const [a, b, c] = combo;
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                winningComboRef.current = combo;
                won(data[a]);
                return;
            }
        }
        if (data.every(cell => cell !== "")) {
            setLock(true);
            titleRef.current.innerHTML = `It's a Draw!`;
        }
    };

    const won = (winner) => {
        setLock(true);
        const boxes = document.querySelectorAll('.boxes');
        const winClass = winner === "X" ? "x-win" : "o-win";
        winningComboRef.current.forEach(index => {
            boxes[index].classList.add(winClass);
        });

        if (winner === "X") {
            titleRef.current.innerHTML = `Congrats <img class="winnericon" src=${cross_icon} alt="Cross" /> Won`;
        } else {
            titleRef.current.innerHTML = `Congrats <img class="winnericon" src=${circle_icon} alt="Circle" /> Won`;
        }
    };

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe";
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.innerHTML = "";
            box.classList.remove("x-win", "o-win");
        });
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" data-index="0" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" data-index="1" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" data-index="2" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" data-index="3" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" data-index="4" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" data-index="5" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" data-index="6" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" data-index="7" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" data-index="8" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default Tictactoe;
