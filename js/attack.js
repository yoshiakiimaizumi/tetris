var clearLineCounter = 0;
function attack(){
    socket.emit('attack','')
}

function pinkAttack(){
  clearLineCounter ++;
  if(clearLineCounter === 3){
    socket.emit('attack','')
    clearLineCounter = 0;
  }

}

function upLineForAttacked(){
  var glayLine = ROWS ;
  for(var row = 0; row < ROWS ; ++row){
    if(board[row][0] === 8){
      glayLine = row;
      break;
    }
  }

  for(var y = 0; y < glayLine-1 ; ++y){
    for(var x = 0; x < COLS ; ++x){
      board[y][x] = board[y+1][x]
    }
  }
  var randomBlock = Math.floor(Math.random()*10);
  for(x = 0; x < COLS; ++x){
    board[glayLine-1][x] = 9;
    if(x === randomBlock){
      board[glayLine-1][x] = 0;
    }
  }
}
