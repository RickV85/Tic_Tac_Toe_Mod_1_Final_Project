// Query Selectors

var gameBoardTiles = document.querySelector('#gameBoard');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');
var clearScoresButton = document.querySelector('#clearScores');

// Event Listeners

gameBoardTiles.addEventListener('click', function(event) {
	placeToken(event);
});
window.addEventListener('load', function() {
	createNewGame();
	if (this.localStorage.length > 0) {
		currentGame.retrieveStorage();
	};
	currentGame.createPlayers();
	displayPlayerScores();
	displayTurn();
});
clearScoresButton.addEventListener('click', function() {
	currentGame.clearScores();
	resetScoreDisplay();
});

// Global Variables

var currentGame;
var losingPlayer;
var winningCombinations = [
	['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['2', '4', '6'],
]

// Functions

function createNewGame() {
	currentGame = new Game(losingPlayer);
};

function preventDuplicates(event) {
	event.preventDefault();
	if (currentGame.player1Tiles.includes(event.target.id) || currentGame.player2Tiles.includes(event.target.id)) {
		gameStatus.classList.add('important-status');
		gameStatus.innerText = `Please choose
		another tile!`;
		allTiles.disabled = true;
		setTimeout(chooseAnother, 1500);
		return true;
	} else if (!allTiles.disabled === true) {
		currentGame.gameBoard.push([currentGame.turn, event.target.id]);
		renderToken(event);
		return false;
	} else if (allTiles.disabled === true) {
		return true;
	}
};

function chooseAnother(){
	gameStatus.classList.remove('important-status');
	allTiles.disabled = false;
	displayTurn();
};

function placeToken(event) {
	event.preventDefault();
	if (preventDuplicates(event)) {
		return;
	};
	
	currentGame.createPlayerStatus(currentGame.turn);
	if (currentGame.checkWin(currentGame.turn)) {
		displayWinGame();
		return;
	};
	if (currentGame.checkDraw()) {
		displayDrawGame();
		return;
	};
	currentGame.changeTurn();
	displayTurn();
};

function renderToken(event) {
	event.preventDefault();
	for (var i = 0; i < currentGame.gameBoard.length; i++) {
		if (currentGame.gameBoard[i][0] === 'player1' && !allTiles.disabled === true) {
			event.target.innerText = '🏂';
			event.target.classList.add('taken-tile');
		} else if (currentGame.gameBoard[i][0] === 'player2' && !allTiles.disabled === true) {
			event.target.innerText = '⛷️';
			event.target.classList.add('taken-tile');
		}
	};
};

function assignLosingPlayer() {
	if (currentGame.winner.id === 'Player 1') {
		losingPlayer = 'player2';
	} else {
		losingPlayer = 'player1';
	};
};

function displayTurn() {
	if (currentGame.turn === 'player1') {
		gameStatus.innerText = `It's Player 1's turn 🏂`;
	} else if (currentGame.turn === 'player2') {
		gameStatus.innerText = `It's Player 2's turn ⛷️`;
	}
};

function displayPlayerScores() {
	player1Score.innerText = `Player 1 🏂 ${currentGame.players[0].wins} wins`;
	player2Score.innerText = `Player 2 ⛷️ ${currentGame.players[1].wins} wins`;
};

function displayWinGame() {
	gameStatus.classList.add('important-status');
	gameStatus.innerText = `❄️${currentGame.winner.id} ${currentGame.winner.token} wins!❄️`;
	displayPlayerScores();
	assignLosingPlayer();
	currentGame.saveToStorage();
	currentGame.resetGame();
	allTiles.disabled = true;
	setTimeout(resetWin, 3000);
};

function resetWin(){
	clearGameDisplay();
	gameStatus.classList.remove('important-status');
	allTiles.disabled = false;
	currentGame.changeTurn();
	displayTurn();
};

function displayDrawGame() {
	gameStatus.classList.add('important-status');
	gameStatus.innerText = `❄️ It's a draw! ❄️`;
	setTimeout(resetDraw, 3000);
};

function resetDraw(){
	gameStatus.classList.remove('important-status');
	clearGameDisplay();
	displayTurn();
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
	setTimeout(delayResetScores, 2000);
};

function delayResetScores(){
	clearGameDisplay();
	gameStatus.classList.remove('important-status');
	displayTurn();
};