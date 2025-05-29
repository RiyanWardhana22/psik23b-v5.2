// Scroll Reveal
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal("", { origin: "left" });
ScrollReveal().reveal(".main-container", {
  origin: "bottom",
});

// TIC TAC TOE START
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");
  const messageContainer = document.getElementById("message-container");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    gameContainer.appendChild(cell);
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== "") return;
    currentPlayer = "X";
    makeMove(index, currentPlayer);
    if (checkWinner()) {
      displayWinner(`${currentPlayer === "X" ? "Kamu" : "Komputer"} Menang!`);
      gameActive = false;
    } else if (gameBoard.every((cell) => cell !== "")) {
      displayWinner("Hasil Seri!");
      gameActive = false;
    } else {
      setTimeout(() => computerMove(), 500);
    }
  }

  function makeMove(index, player) {
    gameBoard[index] = player;
    const img = document.createElement("img");
    img.src = player === "X" ? "images/X.png" : "images/O.png";
    gameContainer.children[index].appendChild(img);
  }

  function computerMove() {
    currentPlayer = "O";
    let winningMove = findWinningMove(currentPlayer);
    if (winningMove !== -1) {
      makeMove(winningMove, currentPlayer);
    } else {
      let blockingMove = findWinningMove("X");
      if (blockingMove !== -1) {
        makeMove(blockingMove, currentPlayer);
      } else {
        let emptyPositions = gameBoard.reduce((acc, val, index) => {
          if (val === "") acc.push(index);
          return acc;
        }, []);
        let randomIndex = Math.floor(Math.random() * emptyPositions.length);
        let randomMove = emptyPositions[randomIndex];
        makeMove(randomMove, currentPlayer);
      }
    }

    if (checkWinner()) {
      displayWinner(`${currentPlayer === "X" ? "Kamu" : "Komputer"} Menang!`);
      gameActive = false;
    } else if (gameBoard.every((cell) => cell !== "")) {
      displayWinner("It's a draw!");
      gameActive = false;
    } else {
      currentPlayer = "X";
    }
  }

  function findWinningMove(player) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const count = pattern.reduce(
        (acc, index) => (gameBoard[index] === player ? acc + 1 : acc),
        0
      );
      if (count === 2) {
        const emptyIndex = pattern.find((index) => gameBoard[index] === "");
        if (emptyIndex !== undefined) {
          return emptyIndex;
        }
      }
    }
    return -1;
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winPatterns.some((pattern) =>
      pattern.every((index) => gameBoard[index] === currentPlayer)
    );
  }

  function displayWinner(message) {
    messageContainer.innerHTML = `<p>${message}</p>`;
    document.getElementById("newGameButton").style.display = "block";
    document.getElementById("newGameButton").addEventListener("click", newGame);
  }

  function newGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    messageContainer.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = gameContainer.children[i];
      cell.textContent = "";
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
    }
    if (currentPlayer === "O") {
      setTimeout(() => computerMove(), 500);
    }
  }
});
