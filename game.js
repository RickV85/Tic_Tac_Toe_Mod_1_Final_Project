class Game {
    constructor(losingPlayer) {
        this.players = [];
        this.gameBoard = [];
        // Need to update this to make the player who lost go first if I make local storage
        this.turn = losingPlayer || 'player1';
    }
    addPlayer(playerObj) {
        var newPlayer = new Player(playerObj.id, playerObj.token, playerObj.wins);
        this.players.push(newPlayer);
    }
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
        if (this.gameBoard.length == 9) {
            currentGame.resetGame();
            gameStatus.innerText = `Draw game! No one wins 😭`
            setTimeout(reset, 3000);
            function reset(){
                clearGameBoard();
            }
        }
    }
    resetGame() {
        this.gameBoard = [];
        player1 = [];
        player2 = [];
        this.turn = losingPlayer;
    }
    saveToStorage() {
        localStorage.setItem('player 1', JSON.stringify(currentGame.players[0]));
        localStorage.setItem('player 2', JSON.stringify(currentGame.players[1]));
    }
    retreiveStorage() {
        var keys = Object.keys(localStorage);
        for (var i = keys.length - 1; i >= 0; i--) {
            var playerInfo = localStorage.getItem(keys[i]);
            var parsedInfo = JSON.parse(playerInfo);
            this.addPlayer(parsedInfo);
        }
    }
};