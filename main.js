// Query Selectors

var gameTiles = document.querySelector('.game-board')

// Event Listeners

gameTiles.addEventListener('click', function(event) {
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
var currentToken;

// Functions

function placeToken(event) {
    if (player1.includes(event.target.id) || player2.includes(event.target.id)) {
        alert("Choose another tile");
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    decideToken();
    renderToken(event);
    player1Status();
    winValidationPlayer1();
    player2Status();
    winValidationPlayer2();
    currentGame.drawGame();
    changeTurn();
}

function decideToken() {
    if (currentGame.turn == 'player1') {
        currentToken = currentGame.players[0].token;
    } else if (currentGame.turn == 'player2') {
        currentToken = currentGame.players[1].token
    }
}

function renderToken(event) {
    event.target.innerText = currentToken;
}

function createNewGame() {
    currentGame = new Game();
}

function createPlayer1() {
    var player1 = new Player('Player 1', 'X');
    currentGame.addPlayer(player1);
}

function createPlayer2() {
    var player2 = new Player('Player 2', 'O');
    currentGame.addPlayer(player2);
}

function changeTurn() {
    if (currentGame.turn == 'player1') {
        currentGame.turn = 'player2';
    } else if (currentGame.turn == 'player2') {
        currentGame.turn = 'player1';
    }
}

function player1Status() {
    var status = [];
    for (let index = 0; index < currentGame.gameBoard.length; index++) {
        if (currentGame.gameBoard[index].includes('player1')) {
            status.push(currentGame.gameBoard[index][1])
        }
    }
    player1 = status;
}

function player2Status() {
    var status = [];
    for (let index = 0; index < currentGame.gameBoard.length; index++) {
        if (currentGame.gameBoard[index].includes('player2')) {
            status.push(currentGame.gameBoard[index][1])
        }
    }
    player2 = status;
}

function winValidationPlayer1() {
    if (player1.includes('tile1') && player1.includes('tile2') && player1.includes('tile3')) {
        alert('player 1 wins - scenario 1');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile4') && player1.includes('tile5') && player1.includes('tile6')) {
        alert('player 1 wins - scenario 2');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile7') && player1.includes('tile8') && player1.includes('tile9')) {
        alert('player 1 wins - scenario 3');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile1') && player1.includes('tile4') && player1.includes('tile7')) {
        alert('player 1 wins - scenario 4');
        currentGame.players[0].increaseWins();
    }  else if (player1.includes('tile2') && player1.includes('tile5') && player1.includes('tile8')) {
        alert('player 1 wins - scenario 5');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile3') && player1.includes('tile6') && player1.includes('tile9')) {
        alert('player 1 wins - scenario 6');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile1') && player1.includes('tile5') && player1.includes('tile9')) {
        alert('player 1 wins - scenario 7');
        currentGame.players[0].increaseWins();
    } else if (player1.includes('tile3') && player1.includes('tile5') && player1.includes('tile7')) {
        alert('player 1 wins - scenario 8');
        currentGame.players[0].increaseWins();
    }
}

function winValidationPlayer2() {
    if (player2.includes('tile1') && player2.includes('tile2') && player2.includes('tile3')) {
        alert('player 2 wins scenario 1');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile4') && player2.includes('tile5') && player2.includes('tile6')) {
        alert('player 2 wins scenario 2');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile7') && player2.includes('tile8') && player2.includes('tile9')) {
        alert('player 2 wins scenario 3');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile1') && player2.includes('tile4') && player2.includes('tile7')) {
        alert('player 2 wins scenario 4');
        currentGame.players[1].increaseWins();
    }  else if (player2.includes('tile2') && player2.includes('tile5') && player2.includes('tile8')) {
        alert('player 2 wins scenario 5');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile3') && player2.includes('tile6') && player2.includes('tile9')) {
        alert('player 2 wins scenario 6');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile1') && player2.includes('tile5') && player2.includes('tile9')) {
        alert('player 2 wins scenario 7');
        currentGame.players[1].increaseWins();
    } else if (player2.includes('tile3') && player2.includes('tile5') && player2.includes('tile7')) {
        alert('player 2 wins scenario 8');
        currentGame.players[1].increaseWins();
    }
}
