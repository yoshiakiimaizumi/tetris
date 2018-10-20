
function myInfo(){
  socket.emit('board',toOneDimention(board,current));
}

function toOneDimention(board,current){
  var ary = [];
  for(var y = 0 ; y < ROWS ; ++y){
    ary[y] = [];
    for(var x = 0 ; x < COLS; ++x){
        ary[y][x] = board[y][x];
    }
  }
  for( y = currentY; y < currentY + 4 && y <= 20 ; ++y){
    for(x = currentX; x < currentX + 4 && x <= 10 ; ++x){
      if(current[y-currentY][x-currentX] !== 0){
        ary[y][x] = current[y-currentY][x-currentX];
      }
    }
  }
  var result = '';
  for(var y = 0 ; y < ROWS ; ++y){
    for(var x = 0 ; x < COLS; ++x){
        result += ary[y][x];
    }
  }
  //result += '.'

  //delimiter API 区切り文字
  //console.log(result);
  return result;
}



function toTwoDimention(data,X,Y){
  var array = [];
  //console.log(data[0]+ ":" +data)
    for(var i = 0; i < Y*X ; ++i){
      if(i%X === 0){
        //console.log(i%X+":");
        array[parseInt(i/X)] = [];
      }
     array[Math.trunc(i/X)][parseInt(i%X)] = data[i];
    }
//  for(var i=0; i<20; i++){
//    for(var j=0; j<10; j++){
//      array[i][j] = 0;
//    }
//  }
  return array;
}


