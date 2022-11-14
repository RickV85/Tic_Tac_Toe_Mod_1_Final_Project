// Query Selectors

var gameBoardTiles = document.querySelector('#gameBoard');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');
// var winScreen = document.querySelector('.win-screen');
// var winMessage = document.querySelector('#winMessage');
var clearScoresButton = document.querySelector('#clearScores')

// Event Listeners

gameBoardTiles.addEventListener('click', function(event) {
    placeToken(event);
});
window.addEventListener('load', function() {
    createNewGame();
    if (this.localStorage.length > 0) {
    currentGame.retrieveStorage();
    }
    createPlayer1();
    createPlayer2();
    displayTurn();
});
clearScoresButton.addEventListener('click', function() {
    currentGame.clearScores();
    resetScoreDisplay();
})

// Global Variables

var currentGame;
// Might be able to eliminate this global var since I have currentGame.winner
var losingPlayer = 'player1';

// Functions

function placeToken(event) {
    event.preventDefault();
    // 41 - 51 should become a preventDuplicate function
    if (currentGame.player1Tiles.includes(event.target.id) || currentGame.player2Tiles.includes(event.target.id)) {
        gameStatus.classList.add('important-status');
        gameStatus.innerText = `Please choose
         another tile!`;
        setTimeout(chooseAnother, 1500);
        function chooseAnother(){
            gameStatus.classList.remove('important-status');
            displayTurn();
        };
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    renderToken(event);
    createPlayerStatus(currentGame.turn);
    if (currentGame.checkWin(currentGame.turn)) {
        showWin();
        return;
    };
    currentGame.drawGame();
    currentGame.changeTurn();
    displayTurn();
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

function displayTurn() {
    if (currentGame.turn == 'player1') {
        gameStatus.innerText = `It's Player 1's turn ${currentGame.players[0].token}`;
    } else if (currentGame.turn == 'player2') {
        gameStatus.innerText = `It's Player 2's turn ${currentGame.players[1].token}`;
    }
};

// Refactor opportnity to combine with createPlayer2
function createPlayer1() {
    if (currentGame.players.length == 0) {
        var player1 = new Player('Player 1', '🏂');
        currentGame.addPlayer(player1);
        player1Score.innerText = `Player 1 ${player1.token} ${player1.wins} wins`;
    } else if (currentGame.players.length > 0) {
        player1Score.innerText = `Player 1 ${currentGame.players[0].token} ${currentGame.players[0].wins} wins`;
    }
};

function createPlayer2() {
    if (currentGame.players.length == 1) {
        var player2 = new Player('Player 2', '⛷️');
        currentGame.addPlayer(player2);
        player2Score.innerText = `Player 2 ${player2.token} ${player2.wins} wins`;
    } else if (currentGame.players.length > 0) {
        player2Score.innerText = `Player 2 ${currentGame.players[1].token} ${currentGame.players[1].wins} wins`;
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
        currentGame.player1Tiles = status;
    } else if (playerName == 'player2') {
        currentGame.player2Tiles = status;
    };
};

function showWin() {
    gameStatus.classList.add('important-status');
    gameStatus.innerText = `${currentGame.winner.id} ${currentGame.winner.token} wins!`;
    if (currentGame.winner.id == 'Player 1') {
        player1Score.innerText = `Player 1 ${currentGame.winner.token} ${currentGame.winner.wins} wins`;
        losingPlayer = 'player2';
    } else if (currentGame.winner.id == 'Player 2') {
        player2Score.innerText = `Player 2 ${currentGame.winner.token} ${currentGame.winner.wins} wins`;
        losingPlayer = 'player1';
    };
    currentGame.saveToStorage();
    currentGame.resetGame();
    setTimeout(reset, 3000);
    function reset(){
        clearGameBoard();
        gameStatus.classList.remove('important-status');
        currentGame.changeTurn();
        displayTurn();
    };
};

function drawGameDisplay() {
    gameStatus.innerText = `Draw game! No one wins 😭`
    setTimeout(reset, 3000);
    function reset(){
        clearGameBoard();
        displayTurn();
    }
};

function clearGameBoard() {
    for (var i = 0; i < allTiles.length; i++) {
        allTiles[i].innerText = '';
    }
};

function resetScoreDisplay() {
    player1Score.innerText = `Player 1 ${currentGame.players[0].token} ${currentGame.players[0].wins} wins`;
    player2Score.innerText = `Player 2 ${currentGame.players[1].token} ${currentGame.players[1].wins} wins`;
    gameStatus.classList.add('important-status');
    gameStatus.innerText = `Scores reset - 
    It's a ❄️ fresh ❄️ start!`;
    setTimeout(reset, 3000);
    function reset(){
        clearGameBoard();
        gameStatus.classList.remove('important-status');
        displayTurn();
    };
};