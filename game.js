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
		var possibleWin = [];
		for (var i = 0; i < playerTiles.length; i++) {
			possibleWin = winningCombinations[i];
			if(playerTiles.includes(possibleWin[0]) && playerTiles.includes(possibleWin[1]) && playerTiles.includes(possibleWin[2])) {
			this.players[playerInt].increaseWins();
			return true;
			}
		};
		// if (playerTiles.includes('0') && playerTiles.includes('1') && playerTiles.includes('2')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('3') && playerTiles.includes('4') && playerTiles.includes('5')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('6') && playerTiles.includes('7') && playerTiles.includes('8')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('0') && playerTiles.includes('3') && playerTiles.includes('6')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('1') && playerTiles.includes('4') && playerTiles.includes('7')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('2') && playerTiles.includes('5') && playerTiles.includes('8')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('0') && playerTiles.includes('4') && playerTiles.includes('8')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// } else if (playerTiles.includes('2') && playerTiles.includes('4') && playerTiles.includes('6')) {
		// 	this.players[playerInt].increaseWins();
		// 	return true;
		// }
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