// Query Selectors

var gameBoardTiles = document.querySelector('#gameBoard');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');
// var winScreen = document.querySelector('.win-screen');
// var winMessage = document.querySelector('#winMessage');

// Event Listeners

gameBoardTiles.addEventListener('click', function(event) {
    placeToken(event);
});
window.addEventListener('load', function() {
    createNewGame();
    createPlayer1();
    createPlayer2();
    initiatePlayerStart();
});

// Global Variables

var currentGame;
var player1 = [];
var player2 = [];
var losingPlayer;

// Functions

function placeToken(event) {
    event.preventDefault();
    if (player1.includes(event.target.id) || player2.includes(event.target.id)) {
        gameStatus.innerText = "Please choose another tile!";
        setTimeout(chooseAnother, 1500);
        function chooseAnother(){
            initiatePlayerStart();
        };
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    renderToken(event);
    changeTurn();
    createPlayerStatus('player1');
    currentGame.winGame(player1);
    createPlayerStatus('player2');
    currentGame.winGame(player2);
    currentGame.drawGame();
};

function renderToken(event) {
    event.preventDefault();
    for (var i = 0; i < currentGame.gameBoard.length; i++) {
        if (currentGame.gameBoard[i][0] == 'player1') {
            event.target.innerText = currentGame.players[0].token;
        } else if (currentGame.gameBoard[i][0] == 'player2') {
            event.target.innerText = currentGame.players[1].token;
        }
    }
};

function createNewGame() {
    currentGame = new Game(losingPlayer);
};

function initiatePlayerStart() {
    if (currentGame.turn == 'player1') {
    gameStatus.innerText = `It's Player 1's turn ${currentGame.players[0].token}`;
    } else if (currentGame.turn == 'player2') {
        gameStatus.innerText = `It's Player 2's turn ${currentGame.players[1].token}`;
    }
};

function createPlayer1() {
    var player1 = new Player('Player 1', '🏂');
    currentGame.addPlayer(player1);
    player1Score.innerText = `Player 1 ${player1.token}  ${player1.wins} wins`;
};

function createPlayer2() {
    var player2 = new Player('Player 2', '⛷️');
    currentGame.addPlayer(player2);
    player2Score.innerText = `Player 2 ${player2.token}  ${player2.wins} wins`;
};

function changeTurn() {
    if (currentGame.turn == 'player1') {
        currentGame.turn = 'player2';
        gameStatus.innerText = `It's Player 2's turn ${currentGame.players[1].token}`;
    } else if (currentGame.turn == 'player2') {
        currentGame.turn = 'player1';
        gameStatus.innerText = `It's Player 1's turn ${currentGame.players[0].token}`;
    }
};

function createPlayerStatus(playerName) {
    var status = [];
    for (var i = 0; i < currentGame.gameBoard.length; i++) {
        if (currentGame.gameBoard[i].includes(playerName)) {
            status.push(currentGame.gameBoard[i][1])
        }
    };
    if (playerName == 'player1') {
        player1 = status;
    } else if (playerName == 'player2') {
        player2 = status;
    };
};

function addShowWin(playerInt) {
    currentGame.players[playerInt].increaseWins();
    gameStatus.classList.add('congrats');
    gameStatus.innerText = `${currentGame.players[playerInt].id} ${currentGame.players[playerInt].token} wins!`;
    if (playerInt == 0) {
        player1Score.innerText = `Player 1 ${currentGame.players[playerInt].token} ${currentGame.players[playerInt].wins} wins`;
        losingPlayer = 'player2';
    } else if (playerInt == 1) {
        player2Score.innerText = `Player 2 ${currentGame.players[playerInt].token} ${currentGame.players[playerInt].wins} wins`;
        losingPlayer = 'player1';
    }
    currentGame.resetGame();
    setTimeout(reset, 3000);
    function reset(){
        clearGameBoard();
        gameStatus.classList.remove('congrats');
        initiatePlayerStart();
    };
};

function clearGameBoard() {
    for (var i = 0; i < allTiles.length; i++) {
        allTiles[i].innerText = '';
    }
};