class Player {
    constructor(id, token, wins) {
        this.id = id;
        this.token = token;
        this.wins = wins;
    }
    increaseWins() {
        this.wins += 1;
    }
}
