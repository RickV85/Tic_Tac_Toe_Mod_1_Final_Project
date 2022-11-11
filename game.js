class Game {
    constructor(losingPlayer) {
        this.players = [];
        this.gameBoard = [];
        // Need to update this to make the player who lost go first if I make local storage
        this.turn = losingPlayer || 'player1';
    }
    addPlayer(playerObj) {
        var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer);
    }
    winGame(player) {
        winValidation(player);
    }
    drawGame() {
        if (this.gameBoard.length == 9) {
            currentGame.resetGame();
            gameStatus.innerText = `Draw game! No one wins 😭`
            setTimeout(reset, 3000);
            function reset(){
                clearGameBoard();
            }
        }
    }
    resetGame() {
        this.gameBoard = [];
        player1 = [];
        player2 = [];
        this.turn = losingPlayer;
    }
}