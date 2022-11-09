// Query Selectors

var gameBoardTiles = document.querySelector('.game-board');
var gameStatus = document.querySelector('#gameStatus');
var player1Score = document.querySelector('#player1Status');
var player2Score = document.querySelector('#player2Status');
var allTiles = document.querySelectorAll('.game-tile');

// Event Listeners

gameBoardTiles.addEventListener('click', function(event) {
    placeToken(event);
});
window.addEventListener('load', function() {
    createNewGame();
    createPlayer1();
    createPlayer2();
})

// Global Variables

var currentGame;
var player1 = [];
var player2 = [];

// Functions

function placeToken(event) {
    if (player1.includes(event.target.id) || player2.includes(event.target.id)) {
        alert("Choose another tile");
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    renderToken(event);
    player1Status();
    winValidationPlayer1();
    player2Status();
    winValidationPlayer2();
    currentGame.drawGame();
    changeTurn();
}

function renderToken(event) {
    for (var index = 0; index < currentGame.gameBoard.length; index++) {
        if (currentGame.gameBoard[index][0] == 'player1') {
            event.target.innerText = currentGame.players[0].token;
        } else if (currentGame.gameBoard[index][0] == 'player2') {
            event.target.innerText = currentGame.players[1].token;
        }
    }
}

function createNewGame() {
    currentGame = new Game();
}

function createPlayer1() {
    var player1 = new Player('Player 1', '🏂');
    currentGame.addPlayer(player1);
    player1Score.innerText = `Player 1 ${player1.token}  ${player1.wins} wins`;
}

function createPlayer2() {
    var player2 = new Player('Player 2', '🐱');
    currentGame.addPlayer(player2);
    player2Score.innerText = `Player 2 ${player2.token}  ${player2.wins} wins`;
}

function changeTurn() {
    if (currentGame.turn == 'player1') {
        currentGame.turn = 'player2';
        gameStatus.innerText = `It's Player 2's turn`;
    } else if (currentGame.turn == 'player2') {
        currentGame.turn = 'player1';
        gameStatus.innerText = `It's Player 1's turn`;
    }
}

function player1Status() {
    var status = [];
    for (var index = 0; index < currentGame.gameBoard.length; index++) {
        if (currentGame.gameBoard[index].includes('player1')) {
            status.push(currentGame.gameBoard[index][1])
        }
    }
    player1 = status;
}

function player2Status() {
    var status = [];
    for (var index = 0; index < currentGame.gameBoard.length; index++) {
        if (currentGame.gameBoard[index].includes('player2')) {
            status.push(currentGame.gameBoard[index][1])
        }
    }
    player2 = status;
}

function winValidationPlayer1() {
    if (player1.includes('tile1') && player1.includes('tile2') && player1.includes('tile3')) {
        winGame(0);
    } else if (player1.includes('tile4') && player1.includes('tile5') && player1.includes('tile6')) {
        winGame(0);
    } else if (player1.includes('tile7') && player1.includes('tile8') && player1.includes('tile9')) {
        winGame(0);
    } else if (player1.includes('tile1') && player1.includes('tile4') && player1.includes('tile7')) {
        winGame(0);
    }  else if (player1.includes('tile2') && player1.includes('tile5') && player1.includes('tile8')) {
        winGame(0);
    } else if (player1.includes('tile3') && player1.includes('tile6') && player1.includes('tile9')) {
        winGame(0);
    } else if (player1.includes('tile1') && player1.includes('tile5') && player1.includes('tile9')) {
        winGame(0);
    } else if (player1.includes('tile3') && player1.includes('tile5') && player1.includes('tile7')) {
        winGame(0);
    }
}

function winValidationPlayer2() {
    if (player2.includes('tile1') && player2.includes('tile2') && player2.includes('tile3')) {
        winGame(1);
    } else if (player2.includes('tile4') && player2.includes('tile5') && player2.includes('tile6')) {
        winGame(1);
    } else if (player2.includes('tile7') && player2.includes('tile8') && player2.includes('tile9')) {
        winGame(1);
    } else if (player2.includes('tile1') && player2.includes('tile4') && player2.includes('tile7')) {
        winGame(1);
    }  else if (player2.includes('tile2') && player2.includes('tile5') && player2.includes('tile8')) {
        winGame(1);
    } else if (player2.includes('tile3') && player2.includes('tile6') && player2.includes('tile9')) {
        winGame(1);
    } else if (player2.includes('tile1') && player2.includes('tile5') && player2.includes('tile9')) {
        winGame(1);
    } else if (player2.includes('tile3') && player2.includes('tile5') && player2.includes('tile7')) {
        winGame(1);
    }
}

function winGame(playerInt) {
    currentGame.players[playerInt].increaseWins();
    if (playerInt == 0) {
        player1Score.innerText = `Player 1 ${currentGame.players[playerInt].token} ${currentGame.players[playerInt].wins} wins`;
    } else if (playerInt == 1) {
        player2Score.innerText = `Player 2 ${player2.token}  ${player2.wins} wins`;
    }
    setTimeout(reset, 3000);
    function reset(){
        currentGame.resetGame();
    };
}