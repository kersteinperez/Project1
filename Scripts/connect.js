window.onload = function() {
  console.log("Game On.");


// Alert: Player 1, what is your name?
var reply = prompt("Playa 1, what's your name?", "")
alert ( "Play on, playa " + reply + "!")


// Alert: Player 2, what is your name?
var reply = prompt("Playa 2, what's your name?", "")
alert ( "Play on, playa " + reply + "!")

// Check if cell is available (does it have grey in it?)
function checkColumn(column){
  var col = column.attr("id"),
      i = 1,
      cell;
  for (i; i<=6; i++){
    cell = $("#"+col+"-"+i);
    if (cell.hasClass("grey")){
      return cell;
    };
  };
  // If no available cell found
  return false;
};

// Highlights the column you are on
function columnHighlightOn(column){
  column.css({
    "background-color": "gold",
    /* I wanted to change the cursor so I knew when to click and when my turn was done. Had to look this up. I probably could've prompted each player but I  didn't want more pop-ups. */
    "cursor": "pointer"
  });
};

// After turn, remove highlight and change back cursor
function columnHighlightOff(column){
  column.css({
    "background-color": "transparent",
    "cursor": "default"
  });
};



  var isRedTurn = true;

function colorCell(cell, isRedTurn){
  if (isRedTurn){
    // If it is red's turn and cell is available, remove grey and add red.
    cell.removeClass("grey").addClass("red");
  } else {
    // If it's not red's turn, and cell is available, remove grey and add blue
    cell.removeClass("grey").addClass("blue");
  };
};



/* Check for winner. I feel like I could've used arrays here but I started going down a path of checking on neighbors first and that led to using directions. This took the longest time  */

function checkWinner(cell, isRedTurn){
  var id = cell.attr("id").split("-"),
      col = id[0],
      row = id[1],
      color = isRedTurn ? "red" : "blue";

  // Check north-south
  if (checkNorthSouth(col, row, color) ||
      checkWestEast(col, row, color) ||
      checkNorthwestSoutheast(col, row, color) ||
      checkSouthwestNortheast(col, row, color)){
    return true;
  };
  return false;
};

function checkNorthSouth(col, row, color){
  var rowN = row,
      rowS = row,
      inARow = 1;
  // North
  while (checkCell(col, ++rowN, color)){
    inARow++;
  };
  // South
  while (checkCell(col, --rowS, color)){
    inARow++;
  };
  // Winner?
  if (inARow >= 4){
    return true;
  };
  // No north-south win
  return false;
};

function checkWestEast(col, row, color){
  var colW = col,
      colE = col,
      inARow = 1;
  // West
  while (checkCell(--colW, row, color)){
    inARow++;
  };
  // East
  while (checkCell(++colE, row, color)){
    inARow++;
  };
  // Winner?
  if (inARow >= 4){
    return true;
  };
  // No west-east win
  return false;
};

function checkNorthwestSoutheast(col, row, color){
  var colNW = col,
      colSE = col,
      rowNW = row,
      rowSE = row,
      inARow = 1;
  // NW
  while (checkCell(--colNW, ++rowNW, color)){
    inARow++;
  };
  // SE
  while (checkCell(++colSE, --rowSE, color)){
    inARow++;
  };
  // Winner?
  if (inARow >= 4){
    return true;
  };
  // No NW-SE win
  return false;
};

function checkSouthwestNortheast(col, row, color){
  var colSW = col,
      colNE = col,
      rowSW = row,
      rowNE = row,
      inARow = 1;
  // SW
  while (checkCell(--colSW, --rowSW, color)){
    inARow++;
  };
  // NE
  while (checkCell(++colNE, ++rowNE, color)){
    inARow++;
  };
  // Winner?
  if (inARow >= 4){
    return true;
  };
  // No SW-NE win
  return false;
};

function checkCell(col, row, color){
  if ($("#"+col+"-"+row).length){
    // Element exists, return true if the class color matches, false if not
    return $("#"+col+"-"+row).hasClass(color);
  };
  // Element doesn't exist because it's off the board
  return false;
};

function endGame(isRedTurn){
  // Stop listening for column events
  $(".column").off("mouseover click");
  // Declare a winner, if the win is on red's turn then:
  if (isRedTurn){
    alert("Red, Takin A Win Back To The Streets!");
  // If it is not on red's turn that means blue won
  } else {
    alert("Blue, Takin A Win Back To The Streets!");
  };
};


  $(".column").on("mouseover", function(){
    // Get next vacant cell
    var cell = checkColumn($(this));
    if (cell){
      // Change column background color
      columnHighlightOn($(this));
      // Listen for click on column
      $(this).on("click", function(){
        colorCell(cell, isRedTurn);
        if (checkWinner(cell, isRedTurn)){
          endGame(isRedTurn);
        } else {
          isRedTurn = !isRedTurn;
          columnHighlightOff($(this));
          // Stop listening
          $(this).off("click");
        };
      });
    };
  });

  $(".column").on("mouseout", function(){
    $(this).css("background-color", "transparent");
    $(this).off("click");
  });


};
