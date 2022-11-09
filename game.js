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
        if (this.gameBoard.length >= 9) {
            alert('Draw game')
            this.resetGame();
        }
    }
    resetGame() {
        this.gameBoard = [];
        for (var index = 0; index < allTiles.length; index++) {
            allTiles[index] = '';
        }
    }
}