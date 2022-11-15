class Player {
    constructor(id, token, wins) {
        this.id = id;
        this.token = token;
        this.wins = wins || 0;
    }
    increaseWins() {
        this.wins += 1;
        currentGame.winner = this;
    }
    createPlayer1() {
        this.id = 'Player 1';
        this.token = '🏂';
    }
    createPlayer2() {
        this.id = 'Player 2';
        this.token = '⛷️';
    }
}
