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

// Functions

function placeToken(event) {
    console.log(event.target.id);
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

