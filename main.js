// Query Selectors

var gameBoardTiles = document.querySelector('#gameBoard');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');
var clearScoresButton = document.querySelector('#clearScores');

// Event Listeners

window.addEventListener('load', function() {
	createNewGame();
	if (this.localStorage.length > 0) {
		currentGame.retrieveStorage();
	} else {
	currentGame.createPlayers();
	};
	displayPlayerScores();
	displayTurn();
});

gameBoardTiles.addEventListener('click', function(event) {
	placeToken(event);
});

clearScoresButton.addEventListener('click', function() {
	currentGame.clearScores();
	resetScoreDisplay();
});

// Global Variables

var currentGame;
var losingPlayer;

// Functions

function createNewGame() {
	currentGame = new Game(losingPlayer);
};

function displayPlayerScores() {
	player1Score.innerText = `Player 1 🏂 ${currentGame.players[0].wins} wins`;
	player2Score.innerText = `Player 2 ⛷️ ${currentGame.players[1].wins} wins`;
};

function preventDuplicates(event) {
	event.preventDefault();
	if (currentGame.player1Tiles.includes(event.target.id) || currentGame.player2Tiles.includes(event.target.id)) {
		gameStatus.classList.add('important-status');
		gameStatus.innerText = `Please choose
		another tile!`;
		allTiles.disabled = true;
		setTimeout(delayEnableTiles, 1500);
		return true;
	} else if (!allTiles.disabled === true) {
		currentGame.createPlayerStatus(currentGame.turn, event);
		renderToken(event);
		return false;
	} else if (allTiles.disabled === true) {
		return true;
	}
};

function delayEnableTiles(func1, func2) {
  gameStatus.classList.remove('important-status');
  allTiles.disabled = false;
  clearGameDisplay();
  displayTurn();
};

function renderToken(event) {
	event.preventDefault();
	if (currentGame.turn === 'Player 1' && !allTiles.disabled === true) {
		event.target.innerText = currentGame.players[0].token;
		event.target.classList.add('taken-tile');
	} else if (currentGame.turn === 'Player 2' && !allTiles.disabled === true) {
		event.target.innerText = currentGame.players[1].token;
		event.target.classList.add('taken-tile');
	}
};

function placeToken(event) {
	event.preventDefault();
	if (preventDuplicates(event)) {
		return;
	};
  if (currentGame.player1Tiles.length + currentGame.player2Tiles.length === 9) {
    currentGame.checkDraw();
		displayDrawGame();
  } else if (!currentGame.checkWin(currentGame.turn)) {
		currentGame.changeTurn();
		displayTurn();
	} else if (currentGame.checkWin(currentGame.turn)) {
		currentGame.addWins(currentGame.turn);
		displayWinGame();
	}
};

function displayDrawGame() {
	gameStatus.classList.add('important-status');
	gameStatus.innerText = `❄️ It's a draw! ❄️`;
  allTiles.disabled = true;
	setTimeout(delayEnableTiles, 3000);
};

function displayTurn() {
	if (currentGame.turn === 'Player 1') {
		gameStatus.innerText = `It's Player 1's turn 🏂`;
	} else if (currentGame.turn === 'Player 2') {
		gameStatus.innerText = `It's Player 2's turn ⛷️`;
	}
};

function displayWinGame() {
	gameStatus.classList.add('important-status');
	gameStatus.innerText = `❄️${currentGame.winner.id} ${currentGame.winner.token} wins!❄️`;
	displayPlayerScores();
	assignLosingPlayer();
	currentGame.saveToStorage();
	currentGame.resetGame();
	allTiles.disabled = true;
  currentGame.changeTurn();
	setTimeout(delayEnableTiles, 3000);
};

function assignLosingPlayer() {
	if (currentGame.winner.id === 'Player 1') {
		losingPlayer = 'Player 2';
	} else {
		losingPlayer = 'Player 1';
	};
};

function clearGameDisplay() {
	for (var i = 0; i < allTiles.length; i++) {
		allTiles[i].innerText = '';
		allTiles[i].classList.remove('taken-tile');
	};
};

function resetScoreDisplay() {
	displayPlayerScores();
	gameStatus.classList.add('important-status');
	gameStatus.innerText = `❄️ Fresh turns! ❄️`;
  allTiles.disabled = true;
	setTimeout(delayEnableTiles, 2000);
};