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
    // drawGame() {

    // }
    // resetGame() {

    // }
}