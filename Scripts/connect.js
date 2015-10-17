function checkColumn (column){
  // if cell is available change color, return cell that was just changed
  // if cell is not available return false
  var c = column.attr('id'),
      i=1,
      cell;

  for(i; i<=6;i++){
    if($('#'+c+'-'+i).css('background-color')=='rgb(128, 128, 128)'){
      cell = $('#'+c+'-'+i);
      return cell;
    };
  };
  return false;
};
function colorCell (cell, isRedTurn){
  if (isRedTurn){
    cell.css('background-color', 'red');
  } else {
    cell.css('background-color', 'black');
  };
};

function checkWinner (cell){
  var id = cell.attr('id'),
      color = cell.css('background-color');

};

function endGame (isRedTurn){
  $('.column').off('mouseover');
  // can make alert game over
  if (isRedTurn){
    alert('Red Wins!');
  } else {
    alert('Black Wins!');
  };
};

$(document).ready(function(){

  var isRedTurn = true;

$('.column').on('mouseover', function(){
  var cell = checkColumn($(this));
  if (cell){
    $(this).css('background-color', 'red');



  };
  $('.column').on('mouseout', function(){
    $(this).css('background-color', 'transparent');

  });
  $('.column').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    colorCell(cell, isRedTurn);
  //  $(this).off('click');
    if  (checkWinner(cell)){
      endGame(isRedTurn);
    } else {
      isRedTurn = !isRedTurn;
    };

  });

});








});
