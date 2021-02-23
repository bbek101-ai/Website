
var playerOne = prompt('Player One enter your name');
var playerTwo = prompt('Player Two enter your name');

var player1= true;
var playerOneSymbol = "X"
var playerTwoSymbol = "O"
gameOver=false;
var table = $('table tr');

var buttons = $('table tr').find('button');
$('.empty-text').text(playerOne+" It's your turn to play");
console.log(buttons);
$('.restart').on('click', function(){
  buttons.text("");
  buttons.css('background',"#303a52");
  gameOver=false;
  player1= true;
  playerOne = prompt('Player One enter your name');
  playerTwo = prompt('Player Two enter your name');
  $('.empty-text').text(playerOne+" It's your turn to play");
})

buttons.on('click', function(){
  //search how to find row and col index using javascript
  var row=$(this).closest('tr').index();
  var col=$(this).closest('td').index();
  console.log(row);
  console.log(col);

  if(gameOver===false&&table.eq(row).find('td').eq(col).find('button').text()===""){
    if(player1===true){

      setContent(row,col,playerOneSymbol);
      $(this).css('background',"#fc5185");
      player1=false;
      if(gameOver===false){
        $('.empty-text').text(playerTwo+" It's your turn to play");
      }

    }else{
      setContent(row,col,playerTwoSymbol);
      player1=true;
      $(this).css('background',"#43dde6");
      if(gameOver===false){
        $('.empty-text').text(playerOne+" It's your turn to play");
      }

    }
    if(horizontalWin()||verticalWin()||diagonalWins()){
      gameOver=true;
      if(player1=true){
        $('.empty-text').text('Congratulation '+playerOne+' Won');
      }else{
        $('.empty-text').text('Congratulation '+playerTwo+' Won');
      }

    }

  }

})



//function to set the content of the buttons


function setContent(rowIndex,colIndex,content){
  //search how to target the element in a specific row and col of a table javascript
  var targetedButton = table.eq(rowIndex).find('td').eq(colIndex).find('button')
  targetedButton .text(content);
  targetedButton.css('color',"#f0f0f0");

}

//function to get the content of the buttons
function getContent(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').text();
}


//function to check for the match of the content "X" or "O"

function checkMatch(one,two,three){
  if(one==two && one==three && one!==undefined && one!==""){
    return true;
  }
}


function horizontalWin(){

  for(var row = 0;row<3;row++){
    for(var col=0;col<1;col++){
      if(checkMatch(getContent(row,col), getContent(row, col+1), getContent(row, col+2))){
        return true;
      }
    }
  }
}

function verticalWin(){
  for(var col=0; col<3; col++){
    for(var row =0; row<1; row++){
      if(checkMatch(getContent(row,col), getContent(row+1, col), getContent(row+2, col))){
        return true;
      }
    }
  }
}

function diagonalWins(){
  for(var row=0;row<1;row++){
    for(var col=0;col<1;col++){
      if(checkMatch(getContent(row,col), getContent(row+1, col+1), getContent(row+2, col+2))){
        return true;
      }else if(checkMatch(getContent(row+2,col), getContent(row-1, col+1), getContent(row-2, col+2))){
        return true;
      }else{
        continue;
      }
    }
  }
}
