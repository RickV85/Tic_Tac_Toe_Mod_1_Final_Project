class Game {
    constructor() {
        this.players = [];
        this.gameBoard = [];
        this.turn = undefined;

    }
    addPlayer(playerObj) {
        newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer)
    }
    drawGame() {

    }
    resetGame() {
        
    }
}