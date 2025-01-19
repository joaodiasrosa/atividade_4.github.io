const gameContainer = document.getElementById('gameContainer');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
const board = Array(9).fill(null);

const winningCombinations = [
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
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : 'Empate';
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  const winner = checkWinner();

  if (winner) {
    gameActive = false;
    winnerMessage.textContent = winner === 'Empate' ? 'É um empate!' : `Jogador ${winner} venceu!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  winnerMessage.textContent = '';
  gameContainer.innerHTML = '';
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameContainer.appendChild(cell);
  }
}

restartButton.addEventListener('click', restartGame);
createBoard();
