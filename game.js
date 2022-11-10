class Game {
    constructor() {
        this.players = [];
        this.gameBoard = [];
        this.turn = 'player1';

    }
    addPlayer(playerObj) {
        var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer);
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
        this.turn = 'player1';
    }
}