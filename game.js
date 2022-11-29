class Game {
	constructor(losingPlayer) {
		this.players = [];
		this.player1Tiles = [];
		this.player2Tiles = [];
		this.turn = losingPlayer || 'Player 1';
    this.turnToken = undefined;
		this.winner = undefined;
    this.winningCombinations = [
      	['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6'],
      ];
	};
	
	addPlayer(playerObj) {
		var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
		this.players.push(newPlayer);
	};

	createPlayers() {
		var player1 = new Player('Player 1', '🏂', 0);
 		var player2 = new Player('Player 2', '⛷️', 0);
  	this.players = [player1, player2]; 
	};

	createPlayerStatus(playerName, event) {
		var chosenTile = event.target.id;
		if (playerName === 'Player 1') {
			this.player1Tiles.push(chosenTile);
		} else if (playerName === 'Player 2') {
			this.player2Tiles.push(chosenTile);
		};
	};

	changeTurn() {
		if (this.turn === 'Player 1') {
			this.turn = 'Player 2';
      this.turnToken = currentGame.players[1].token;
		} else if (this.turn === 'Player 2') {
			this.turn = 'Player 1';
      this.turnToken = currentGame.players[0].token;
		}
	};

	checkWin(player) {
		if (player === 'Player 1') {
			var playerTiles = this.player1Tiles;
		} else if (player === 'Player 2') {
			var playerTiles = this.player2Tiles;
		};
		var possibleWin = [];
		for (var i = 0; i < this.winningCombinations.length; i++) {
			possibleWin = this.winningCombinations[i];
			if (playerTiles.includes(possibleWin[0]) && playerTiles.includes(possibleWin[1]) && playerTiles.includes(possibleWin[2])) {
				return true;
			}
		};
	};

	addWins(player) {
		if (player === 'Player 1') {
			this.players[0].increaseWins();
		} else {
			this.players[1].increaseWins();
		}
	};

	checkDraw() {
		if (losingPlayer === 'Player 1') {
      this.decideNextTurnOnDraw('Player 2', 1);
		} else if (losingPlayer === 'Player 2') {
			this.decideNextTurnOnDraw('Player 1', 0);
		} else if (losingPlayer === undefined && this.turn === 'Player 1') {
			this.decideNextTurnOnDraw('Player 2', 1);
		} else if (losingPlayer === undefined && this.turn === 'Player 2') {
			this.decideNextTurnOnDraw('Player 1', 0);
		}
	};

  decideNextTurnOnDraw(player, playerInt) {
    this.decidePlayerTurnDrawReset(player);
    losingPlayer = player;
    this.turnToken = currentGame.players[playerInt].token;
    this.saveToStorage();
  };

	decidePlayerTurnDrawReset(player) {
		this.resetGame();
		this.turn = player;
	};

	resetGame() {
		this.player1Tiles = [];
		this.player2Tiles = [];
	};

	saveToStorage() {
		localStorage.setItem('player 1', JSON.stringify(this.players[0]));
		localStorage.setItem('player 2', JSON.stringify(this.players[1]));
		localStorage.setItem('losing player', JSON.stringify(losingPlayer));
	};

	retrieveStorage() {
		var keys = Object.keys(localStorage);
		for (var i = keys.length - 1; i > 0; i--) {
			var playerInfo = localStorage.getItem(keys[i]);
			var parsedInfo = JSON.parse(playerInfo);
			this.addPlayer(parsedInfo);
		};
		var retrieveLoser = localStorage.getItem(keys[0]);
		var parsedLoser = JSON.parse(retrieveLoser);
		this.turn = parsedLoser;
    if (parsedLoser === 'Player 1') {
      this.turnToken = currentGame.players[0].token;
    } else {this.turnToken = currentGame.players[1].token}
	};

	clearScores() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].wins = 0;
		};
		this.resetGame();
		localStorage.clear();
	};
};