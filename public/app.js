const cells = document.querySelectorAll("[data-cell]");
const result = document.getElementById("result");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameOver = false;

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(e) {
  const cell = e.target;

  if (cell.textContent || gameOver) return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    result.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if ([...cells].every((cell) => cell.textContent)) {
    result.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    result.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  gameOver = false;
  result.textContent = "Player X's Turn";
}
