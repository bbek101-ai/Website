//get players name
var playerOne =prompt("Player One Enter your name");
var playerTwo = prompt("Player Two Enter your name");
//display player name and contents accordingly


function fancyHeadingColors(){
  var colors = ["#28c7fa", "#775ada", "#002651", "#ff304f", "#f9ff21", "#000000", "#ff008e", "#c24d2c", "#5d13e7"];
  var randomColor=colors[Math.floor(Math.random()*10)];
  $('h1').css('color', randomColor);
}


setInterval(fancyHeadingColors, 2000);


var PlayOne = true;
$('.player-text').text(playerOne+" : Its your turn to roll");
var table = $("table tr");
var play=true;
function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

var restart = $('.btn-success');
restart.on('click',function(){
  for(var row=0;row<6;row++){
    for(var col=0;col<7;col++){
      table.eq(row).find('td').eq(col).find('button').css('background-color', 'rgb(48, 58, 82)');
    }
  }
  PlayOne = true;
  play=true;
  $('.won').text("");
  $('.player-text').text(playerOne+" Your turn came");
})
function returnColorOf(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkColorMatch(one, two, three, four){
  return(one===two && one===three && one===four && one!=='rgb(48, 58, 82)' && one!==undefined);
}



function emptys(circle){

  if(circle.css('background-color')=="rgb(48, 58, 82)"){
    return true;
  }
  return false;
}

//check for horizontal wins
function horizontalWin(){
  for(var row=0; row<6; row++){
    for(var col=0; col<4;col++){
      if(checkColorMatch(returnColorOf(row,col), returnColorOf(row,col+1), returnColorOf(row,col+2),returnColorOf(row,col+3))){
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWin(){
  for(var col=0; col<7;col++){
    for(var row=0;row<3;row++){
      if(checkColorMatch(returnColorOf(row,col), returnColorOf(row+1,col), returnColorOf(row+2,col), returnColorOf(row+3,col))){
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagonalWin(){
  for(var col=0;col<5;col++){
    for(var row=0;row<7;row++){
      if(checkColorMatch(returnColorOf(row,col), returnColorOf(row+1,col+1), returnColorOf(row+2,col+2), returnColorOf(row+3,col+3))){
        return true;
      }else if(checkColorMatch(returnColorOf(row,col), returnColorOf(row-1, col+1), returnColorOf(row-2,col+2), returnColorOf(row-3, col+3))){
        return true;
      }else{
        continue;
      }
    }
  }
}




//connect four game
var anchors = $('button');


anchors.slice(0,8).on('click',function(){

  var clickedIndex=anchors.index(this);
  console.log("clicked "+clickedIndex);
  var changeColorOf = clickedIndex+35;
  console.log("change color of "+changeColorOf);
  if(emptys(anchors.eq(clickedIndex)) && play==true){


    if(PlayOne === true){
      $('.player-text').text(playerTwo+" : its your turn to play");
      PlayOne = false;

      for(var i=changeColorOf; i>=clickedIndex;i=i-7){

        if(emptys(anchors.eq(i))){
          anchors.eq(i).css('background-color','#ff304f');
          break;
        }
      }


    }else{

      $('.player-text').text(playerOne+" : Its your turn to roll");
      PlayOne=true;
      for(var i=changeColorOf; i>=clickedIndex;i=i-7){
        if(emptys(anchors.eq(i))){
          anchors.eq(i).css('background-color','#775ada');
          break;
        }
      }

    }
    if (horizontalWin() || verticalWin() || diagonalWin()) {
      if(PlayOne === false){
        $('.won').text(playerOne+" won");
      }else{
          $('.won').text(playerTwo+" won");
      }

      play=false;
    }

  }
});



//function for checking which player won
//object is sent as a parameter
