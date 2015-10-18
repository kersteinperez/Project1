### User Story and Flow:

1. Board renders on page load.

2. Alert: Player 1, what is your name?

3. X accepts name.

4. Alert: Player 2, what is your name?

5. X accepts name.

6. Player 1 places marker in empty space.

7. X checks that space is empty.
   If yes, place marker.
   If no, do nothing.

* Consider ``switching`` boards here

8. Player 2 places marker in empty space.

9. X checks that space is empty.
   If yes, place marker.
   If no, do nothing.

10. Go back to Player 1 **refer to step 6**


* If no winner, go back to Player 1 then Player 2.

* At this point, after every player's move, check for winner.

11. After win (4 in a row), declare winner.

* If board is full without winner, declare tie.

12. End game.

13. Prompt: Would you like to play again?

14. If yes, restart game.
