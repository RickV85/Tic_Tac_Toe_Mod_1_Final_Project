// Query Selectors

var gameBoardTiles = document.querySelector('#gameBoard');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');
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
    createPlayersDisplayWins();
    displayTurn();
});
clearScoresButton.addEventListener('click', function() {
    currentGame.clearScores();
    resetScoreDisplay();
})

// Global Variables

var currentGame;
var losingPlayer = 'player1';

// Functions

function preventDuplicates(event) {
    event.preventDefault();
    if (currentGame.player1Tiles.includes(event.target.id) || currentGame.player2Tiles.includes(event.target.id)) {
        gameStatus.classList.add('important-status');
        gameStatus.innerText = `Please choose
         another tile!`;
        setTimeout(chooseAnother, 1500);
        function chooseAnother(){
            gameStatus.classList.remove('important-status');
            displayTurn();
        };
        return true;
    };
};

function placeToken(event) {
    event.preventDefault();
    if (preventDuplicates(event)) {
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    renderToken(event);
    createPlayerStatus(currentGame.turn);
    if (currentGame.checkWin(currentGame.turn)) {
        showWin();
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
        if (currentGame.gameBoard[i][0] == 'player1') {
            event.target.innerText = '🏂';
        } else if (currentGame.gameBoard[i][0] == 'player2') {
            event.target.innerText = '⛷️';
        }
    }
};

function createNewGame() {
    currentGame = new Game(losingPlayer);
};

function displayTurn() {
    if (currentGame.turn == 'player1') {
        gameStatus.innerText = `It's Player 1's turn 🏂`;
    } else if (currentGame.turn == 'player2') {
        gameStatus.innerText = `It's Player 2's turn ⛷️`;
    }
};

function createPlayersDisplayWins() {
    if (currentGame.players.length == 0) {
        var player1 = new Player();
        player1.createPlayer1();
        var player2 = new Player();
        player2.createPlayer2();
        currentGame.addPlayer(player1);
        currentGame.addPlayer(player2);
        player1Score.innerText = `Player 1 🏂 ${player1.wins} wins`;
        player2Score.innerText = `Player 2 ⛷️ ${player2.wins} wins`;
    } else if (currentGame.players.length > 0) {
        player1Score.innerText = `Player 1 🏂 ${currentGame.players[0].wins} wins`;
        player2Score.innerText = `Player 2 ⛷️ ${currentGame.players[1].wins} wins`;
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
    // Can make 135 and 138 in to one line here
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

function displayDrawGame() {
    gameStatus.classList.add('important-status');
    gameStatus.innerText = `Draw game!
    No one wins 😭`
    setTimeout(reset, 3000);
    function reset(){
        gameStatus.classList.remove('important-status');
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
    gameStatus.innerText = `❄️ Fresh turns! ❄️`;
    setTimeout(reset, 3000);
    function reset(){
        clearGameBoard();
        gameStatus.classList.remove('important-status');
        displayTurn();
    };
};