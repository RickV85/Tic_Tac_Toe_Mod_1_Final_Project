class Player {
  constructor(id, token, wins) {
    this.id = id;
    this.token = token;
    this.wins = wins || 0;
  };

  increaseWins() {
    this.wins += 1;
    currentGame.winner = this;
  };
};
