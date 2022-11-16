class Game {
	constructor(losingPlayer) {
		this.players = [];
		this.gameBoard = [];
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
		if (this.players.length === 0) {
			var player1 = new Player();
			player1.createPlayer1();
			var player2 = new Player();
			player2.createPlayer2();
			this.addPlayer(player1);
			this.addPlayer(player2);
		} 
	};

	createPlayerStatus(playerName) {
		var status = [];
		for (var i = 0; i < this.gameBoard.length; i++) {
			if (this.gameBoard[i].includes(playerName)) {
				status.push(this.gameBoard[i][1]);
			};
		};
		if (playerName === 'player1') {
			this.player1Tiles = status;
		} else if (playerName === 'player2') {
			this.player2Tiles = status;
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
		if (playerTiles.includes('tile1') && playerTiles.includes('tile2') && playerTiles.includes('tile3')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile4') && playerTiles.includes('tile5') && playerTiles.includes('tile6')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile7') && playerTiles.includes('tile8') && playerTiles.includes('tile9')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile1') && playerTiles.includes('tile4') && playerTiles.includes('tile7')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile2') && playerTiles.includes('tile5') && playerTiles.includes('tile8')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile3') && playerTiles.includes('tile6') && playerTiles.includes('tile9')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile1') && playerTiles.includes('tile5') && playerTiles.includes('tile9')) {
			this.players[playerInt].increaseWins();
			return true;
		} else if (playerTiles.includes('tile3') && playerTiles.includes('tile5') && playerTiles.includes('tile7')) {
			this.players[playerInt].increaseWins();
			return true;
		}
	};

	checkDraw() {
		if (this.gameBoard.length === 9 && losingPlayer === 'player1') {
			this.resetGame();
			this.turn = 'player2';
			return true;
		} else if (this.gameBoard.length === 9 && losingPlayer === 'player2') {
			this.resetGame();
			this.turn = 'player1';
			return true;
		} else if (this.gameBoard.length === 9 && losingPlayer === undefined && this.turn === 'player1') {
			this.resetGame();
			this.turn = 'player2';
			return true;
		} else if (this.gameBoard.length === 9 && losingPlayer === undefined && this.turn === 'player2') {
			this.resetGame();
			this.turn = 'player1';
			return true;
		}
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