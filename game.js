class Game {
    constructor(losingPlayer) {
        this.players = [];
        this.gameBoard = [];
        this.turn = losingPlayer;
    };
    addPlayer(playerObj) {
        var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer);
    };
    winGame(player) {
        if (player == player1) {
            var x = 0;
        } else if (player == player2) {
            var x = 1;
        };
        if (player.includes('tile1') && player.includes('tile2') && player.includes('tile3')) {
            showWin(x);
        } else if (player.includes('tile4') && player.includes('tile5') && player.includes('tile6')) {
            showWin(x);
        } else if (player.includes('tile7') && player.includes('tile8') && player.includes('tile9')) {
            showWin(x);
        } else if (player.includes('tile1') && player.includes('tile4') && player.includes('tile7')) {
            showWin(x);
        }  else if (player.includes('tile2') && player.includes('tile5') && player.includes('tile8')) {
            showWin(x);
        } else if (player.includes('tile3') && player.includes('tile6') && player.includes('tile9')) {
            showWin(x);
        } else if (player.includes('tile1') && player.includes('tile5') && player.includes('tile9')) {
            showWin(x);
        } else if (player.includes('tile3') && player.includes('tile5') && player.includes('tile7')) {
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
        player1 = [];
        player2 = [];
        // this.turn = losingPlayer;
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
};