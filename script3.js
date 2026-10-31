
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            status.textContent = "Player " + currentPlayer + " Wins!";
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    status.textContent = "Player " + currentPlayer + "'s Turn";
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.dataset.index;

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWinner();
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    status.textContent = "Player X's Turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
    });
}

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
