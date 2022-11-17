class Game {
	constructor(losingPlayer) {
		this.players = [];
		this.player1Tiles = [];
		this.player2Tiles = [];
		this.turn = losingPlayer || 'player1';
		this.winner = undefined;
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
		if (playerName === 'player1') {
			this.player1Tiles.push(chosenTile);
		} else if (playerName === 'player2') {
			this.player2Tiles.push(chosenTile);
		};
	};

	changeTurn() {
		if (this.turn === 'player1') {
			this.turn = 'player2';
		} else if (this.turn === 'player2') {
			this.turn = 'player1';
		}
	};

	checkWin(player) {
		if (player === 'player1') {
			var playerTiles = this.player1Tiles;
			var playerInt = 0;
		} else if (player === 'player2') {
			var playerTiles = this.player2Tiles;
			var playerInt = 1;
		};
		var possibleWin = [];
		for (var i = 0; i < winningCombinations.length; i++) {
			possibleWin = winningCombinations[i];
			if (playerTiles.includes(possibleWin[0]) && playerTiles.includes(possibleWin[1]) && playerTiles.includes(possibleWin[2])) {
			return true;
			}
		};
	};

	addWins(player) {
		if (player === 'player1') {
			this.players[0].increaseWins();
		} else {
			this.players[1].increaseWins();
		}
	};

	checkDraw() {
		var numTilesTaken = this.player1Tiles.length + this.player2Tiles.length;
		if (numTilesTaken.length === 9 && losingPlayer === 'player1') {
			return this.decidePlayerTurn('player2');
		} else if (numTilesTaken.length === 9 && losingPlayer === 'player2') {
			return this.decidePlayerTurn('player1');
		} else if (numTilesTaken.length === 9 && losingPlayer === undefined && this.turn === 'player1') {
			return this.decidePlayerTurn('player2');
		} else if (numTilesTaken.length === 9 && losingPlayer === undefined && this.turn === 'player2') {
			return this.decidePlayerTurn('player1');
		}
	};

	decidePlayerTurn(player) {
		this.resetGame()
		this.turn = player;
		return true;
	};

	resetGame() {
		this.gameBoard = [];
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
	};

	clearScores() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].wins = 0;
		};
		this.resetGame();
		localStorage.clear();
	};
};