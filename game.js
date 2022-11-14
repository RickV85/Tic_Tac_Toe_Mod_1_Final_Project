class Game {
    constructor(losingPlayer) {
        this.players = [];
        this.gameBoard = [];
        this.player1Tiles = [];
        this.player2Tiles = [];
        this.turn = losingPlayer;
    };
    addPlayer(playerObj) {
        var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer);
    };
    winGame(playerTiles) {
        if (playerTiles == this.player1Tiles) {
            var x = 0;
        } else if (playerTiles == this.player2Tiles) {
            var x = 1;
        };
        // Refactor this to return a boolean, then render DOM with showWin, need to eliminate
        // that parameter and add something to show win to detect who's turn it is to decide the win.
        // That would basically move the above lines 14-18 to the showWin function.
        if (playerTiles.includes('tile1') && playerTiles.includes('tile2') && playerTiles.includes('tile3')) {
            showWin(x);
        } else if (playerTiles.includes('tile4') && playerTiles.includes('tile5') && playerTiles.includes('tile6')) {
            showWin(x);
        } else if (playerTiles.includes('tile7') && playerTiles.includes('tile8') && playerTiles.includes('tile9')) {
            showWin(x);
        } else if (playerTiles.includes('tile1') && playerTiles.includes('tile4') && playerTiles.includes('tile7')) {
            showWin(x);
        } else if (playerTiles.includes('tile2') && playerTiles.includes('tile5') && playerTiles.includes('tile8')) {
            showWin(x);
        } else if (playerTiles.includes('tile3') && playerTiles.includes('tile6') && playerTiles.includes('tile9')) {
            showWin(x);
        } else if (playerTiles.includes('tile1') && playerTiles.includes('tile5') && playerTiles.includes('tile9')) {
            showWin(x);
        } else if (playerTiles.includes('tile3') && playerTiles.includes('tile5') && playerTiles.includes('tile7')) {
            showWin(x);
        }
    };
    drawGame() {
        if (this.gameBoard.length == 9 && losingPlayer == 'player1') {
            currentGame.resetGame();
            losingPlayer = 'player2'
            drawGameDisplay();
        } else if (this.gameBoard.length == 9 && losingPlayer == 'player2') {
            currentGame.resetGame();
            losingPlayer = 'player1'
            drawGameDisplay();
        }
    };
    resetGame() {
        this.gameBoard = [];
        this.player1Tiles = [];
        this.player2Tiles = [];
    };
    saveToStorage() {
        localStorage.setItem('player 1', JSON.stringify(currentGame.players[0]));
        localStorage.setItem('player 2', JSON.stringify(currentGame.players[1]));
        localStorage.setItem('losing player', JSON.stringify(losingPlayer));
    };
    retrieveStorage() {
        var keys = Object.keys(localStorage);
        for (var i = keys.length - 1; i > 0; i--) {
            var playerInfo = localStorage.getItem(keys[i]);
            var parsedInfo = JSON.parse(playerInfo);
            this.addPlayer(parsedInfo);
        }
        var retrieveLoser = localStorage.getItem(keys[0]);
        var parsedLoser = JSON.parse(retrieveLoser);
        this.turn = parsedLoser;
    };
    clearScores() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].wins = 0;
        }
        this.resetGame();
        localStorage.clear();
        this.turn = losingPlayer;
    }
};