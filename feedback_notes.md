Functionality: On track!
One small bug: I shouldn't be able to keep playing after a winner has been declared during that small timeout window.
Good job implementing local storage!
JS: Not yet on track.
There are lots of spots where you're doing the same thing twice, once for player 1 and again for play 2. These are opportunities to use params and/or interpolation so that you aren't writing the same code twice.
I found your code difficult to read/follow in some places because your functions are so large. I think it comes from the nesting of functions in other functions. I totally get that reasoning - since you only need that function within the outer function - but I think it detracts from the readability. Also, it'll make it much harder to test that code (which you'll learn more about in M2). What you're actually doing here is creating closures which is potentially more complex than you intended.
HTML: On track!
article does not feel like a relevant element for the game board. I would've looked into table for that.
CSS: On track!
FINAL RESULT: PASS! :-confetti-yo:
Side note: According to the Turing Style Guide, indents should only be 2 spaces, not 4.

Additional feedback per my response:

The two pieces of feedback I gave you are things that led me to giving you that "not yet." Both of those things are easy fixes on the next project. Next time, avoid closures and look for more opportunities to DRY up the code.
Also, looking at the relationship between your Game and Player class, there is some room to improve there. For example, you create a new instance of Player in two different methods in Game (addPlayer and createPlayers) and you update the properties in the Player class (createPlayer1). You're unintentionally creating 4 instances of Player, rather than the intended 2. This is a good example of over-engineered code that works better if it's simpler. Something like:
// Game.js

createPlayers() {
  var player1 = new Player(1, 🏂, 0);
  var player2 = new Player(2, ⛷️, 0);
  this.players = [ player1, player2 ];
}
Final (little) thing - Be sure to use strict equality (===) in your conditionals. Here's more on that!
All that to say - your project is GREAT and again, you should feel proud of what you've done. You learned all this in 6 weeks - don't let one critical piece of feedback take away from that.

Main things I learned from looking at other's code and post-due refactoring:

- Make sure to rethink long functions with lots of conditionals to potentially use for loops instead. If that doesn't work with your current data set, go back to the root to make that data more easily readable for a loop. (i.e. renaming the id's of the tiles to just a number using integer positions 0-8 and making a winningCombinations array of arrays of combos)
- Return booleans from the data model (game.js) functions to trigger DOM functions (in main.js) using conditionals.
- Break out nested functions even if they are only used once. I was doing this in the delay functions. This avoids closures per Kayla's feedback.
- Try to reduce repetition as much as possible. I was not able to do as much of that as I liked but maybe Travis will have some pointers in how I might be able to.

Steps taken to address this feedback in fix/Notes_and_fixes_post-feedback

1. Changed defaut tab spacing to 2, not 4
2. Changed all conditionals to use strictly equal "===" and retained functionality
3. Adjusted all tabs to 2 spaces.
4. Made Timeout functions independant to be called in 4 functions instead of nesting them.
5. Made game not playable during time outs. Missed this before I turned it in because I was not testing it. I used "allTiles.disabled" invoked with game actions and reverted with timeout functions.
6. Made tiles buttons instead of articles.
7. Made tiles id just a number and start with 0 to make for loops work.
8. Made an array of the winning combination numbers. = winningCombinations.
9. Used a for loop to cycle through the combos using includes in checkWin, comparing against playerTile arrays and removed unused this.gameBoard property.
10. Rethought how I am rendering tokens to check them against the arrays.
11. Reduced overlap in add player functions per Kayla's above feedback.
12. Made all strings of player to match id of players "Player 1" for consistency.
13. Fixed win/draw game checking logic. Wasn't producing draws after above changes.
14. Consolidated 4 delay functions to one (delayEnableTiles) using setTimeout parameters.

------

Awesome feedback recieved from Travis after he reviewed the changes up until here.

Wins

Really excellent work updating checkWin to be more dynamic using a for loop instead of manually checking every tile with conditionals.

I also appreciate focusing on making functions more SRP such as breaking createPlayerStatus into 2 functions.

Great use of reusing your Player class and passing the necessary arguments through in createPlayers.

Good work moving the functions declared inside of other functions out such as with displayDrawGame and resetScoreDisplay.  What you had before in functional programming is called closures, which can be useful for specific scenarios.  But for these examples, I think it works better to call the functions in the setTimeout or potentially move the reset function into the global scope.  I do think it's pretty unique that you're passing functions to delayEnableTiles which can enable it to make it more dynamic if you want to pass multiple functions through (another functional programming pattern).  However, I see that you always pass the same 2 functions through (clearGameDisplay and displayTurn).  In this scenario, rather than passing them as arguments, I might just call the functions by their name in delayEnableTiles

Areas for Growth

I love the winningCombinations array but believe that this is information that should belong inside of the Game class rather than as a global variable since it only used inside of the class.

With renderToken, rather than manually assigning the innerText to a token, could you use the Player instances?  This way, if a developer ever chooses to make a change to what tokens are used, only one place needs to be updated.

A small refactor for displayTurn could be instead of using conditionals to see who's turn it is, try incorporating string interpolation such as gameStatus.innerText = `It's ${currentGame.turn}'s turn`.  (making sure to also use the token existing on the Player)

-----

15. Changed delayEnableTiles to just invoke the clearGameDisplay and displayTurn. I had tried to get this to also invoke a class method but was unable to so agree that with Travis that its better to do this way.
16. Moved winningCombinations to be a property of Game.
17. Made renderToken more dynamic per Travis's suggestion.
18. Eliminated a bunch of conditionals in displayTurn with interpolation. Had to add a new property to Game of turnToken and also add a conditional to the retrieveStorage method in Game to make sure the losingPlayer token is correctly displayed.
19. Used variables instead of hard coding token emojis.
20. Fix issue when a game results in a draw, then the user refreshes page, the correct player goes first. Added some methods to not be as repetitive in Game.checkDraw and added saveToLocalStorage to it.