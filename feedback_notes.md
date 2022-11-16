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

Steps taken to address this feedback in fix/Notes_and_fixes_post-feedback

1. Changed defaut tab spacing to 2, not 4
2. Changed all conditionals to use strictly equal "===" and retained functionality
3. Adjust all tabs to 2 spaces.