window.onload = function() {
  console.log("Game On.");



//Alert: Player 1, what is your name?
//var playerOneName=prompt('Playa One, Tell 'Em Ya Name':','');

//Alert: Player 2, what is your name?
//var playerTwoName=prompt('Playa Two, Tell 'Em Ya Name':','');

//Highlights the column you are on
function columnHighlightOn(column){
  column.css({
    "background-color": "gold",
    /* I wanted to change the cursor so I knew when to click and when my turn was done, I looked this up. I probably could've prompted each player but I couldn't deal with the pop-ups anymore. */
    "cursor": "pointer"
  });
};

/* After turn, remove highlight and change */
function columnHighlightOff(column){
  column.css({
    "background-color": "transparent",
    "cursor": "default"
  });
};

// check if cell is available (aka has grey)
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
  // if cell is not available
  return false;
};

//If it is red's turn and cell is available, remove grey and add red.

  var isRedTurn = true;

function colorCell(cell, isRedTurn){
  if (isRedTurn){
    cell.removeClass("grey").addClass("red");
  } else {
    //if it's not red's turn, and cell is available, remove grey and add black
    cell.removeClass("grey").addClass("blue");
  };
};



/* I feel like I could've used arrays here but I started going down a path of checking on neighbors first and that led to directions. I had a lot of help with this part and am still a little shaky on how exactly it works */

function checkWinner(cell, isRedTurn){
  var id = cell.attr("id").split("-"),
      col = id[0],
      row = id[1],
      color = isRedTurn ? "red" : "blue";

  //check north-south
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
  //north
  while (checkCell(col, ++rowN, color)){
    inARow++;
  };
  //south
  while (checkCell(col, --rowS, color)){
    inARow++;
  };
  //winner?
  if (inARow >= 4){
    return true;
  };
  //no north-south win
  return false;
};

function checkWestEast(col, row, color){
  var colW = col,
      colE = col,
      inARow = 1;
  //west
  while (checkCell(--colW, row, color)){
    inARow++;
  };
  //east
  while (checkCell(++colE, row, color)){
    inARow++;
  };
  //winner?
  if (inARow >= 4){
    return true;
  };
  //no west-east win
  return false;
};

function checkNorthwestSoutheast(col, row, color){
  var colNW = col,
      colSE = col,
      rowNW = row,
      rowSE = row,
      inARow = 1;
  //nw
  while (checkCell(--colNW, ++rowNW, color)){
    inARow++;
  };
  //se
  while (checkCell(++colSE, --rowSE, color)){
    inARow++;
  };
  //winner?
  if (inARow >= 4){
    return true;
  };
  //no nw-se win
  return false;
};

function checkSouthwestNortheast(col, row, color){
  var colSW = col,
      colNE = col,
      rowSW = row,
      rowNE = row,
      inARow = 1;
  //sw
  while (checkCell(--colSW, --rowSW, color)){
    inARow++;
  };
  //ne
  while (checkCell(++colNE, ++rowNE, color)){
    inARow++;
  };
  //winner?
  if (inARow >= 4){
    return true;
  };
  //no sw-ne win
  return false;
};

function checkCell(col, row, color){
  if ($("#"+col+"-"+row).length){
    //element exists, return true if the class color matches, false if not
    return $("#"+col+"-"+row).hasClass(color);
  };
  //element doesn't exist because it's off the board
  return false;
};

function endGame(isRedTurn){
  //stop listening for column events
  $(".column").off("mouseover click");
  //declare a winner
  if (isRedTurn){
    alert("Red Wins!");
  } else {
    alert("Blue Wins!");
  };
};






  $(".column").on("mouseover", function(){
    //get next vacant cell
    var cell = checkColumn($(this));
    if (cell){
      //change column background color
      columnHighlightOn($(this));
      //listen for click on column
      $(this).on("click", function(){
        colorCell(cell, isRedTurn);
        if (checkWinner(cell, isRedTurn)){
          endGame(isRedTurn);
        } else {
          isRedTurn = !isRedTurn;
          columnHighlightOff($(this));
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
