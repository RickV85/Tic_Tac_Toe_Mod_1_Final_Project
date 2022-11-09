// Query Selectors

// var tile1 = document.querySelector('#tile1');
// var tile2 = document.querySelector('#tile2');
// var tile3 = document.querySelector('#tile3');
// var tile4 = document.querySelector('#tile4');
// var tile5 = document.querySelector('#tile5');
// var tile6 = document.querySelector('#tile6');
// var tile7 = document.querySelector('#tile7');
// var tile8 = document.querySelector('#tile8');
// var tile9 = document.querySelector('#tile9');
var gameTiles = document.querySelector('.game-board')

// Event Listeners

// tile1.addEventListener('click', )
// tile2.addEventListener('click', )
// tile3.addEventListener('click', )
// tile4.addEventListener('click', )
// tile5.addEventListener('click', )
// tile6.addEventListener('click', )
// tile7.addEventListener('click', )
// tile8.addEventListener('click', )
// tile9.addEventListener('click', )
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

// Functions

function placeToken(event) {
    if (player1.includes(event.target.id) || player2.includes(event.target.id)) {
        alert("Choose another tile");
        return;
    };
    currentGame.gameBoard.push([currentGame.turn, event.target.id]);
    player1Status();
    winValidationPlayer1();
    player2Status()
    winValidationPlayer2();
    changeTurn();
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
