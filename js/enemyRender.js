var enemyBoard;
var enemyCanvas = document.getElementById('enemydisp'); //canvas
var ctxE = enemyCanvas.getContext('2d'); //コンテクスト

function enemyRender(data){
  //var boardData = data;

  enemyBoard = data;//toTwoDimention(boardData,COLS,ROWS);
  //console.log("yaya" + enemyBoard[1])
//  enemyBoard = board;
  renderE()
}

//var W = 300, H = 600; //canvas size
//var BLOCK_W = W/COLS, BLOCK_H = H/ROWS;　//マスの幅を設定

//var nextCanvas =
// document.getElementById('nextShape');
//nextCanvas.width = 60;
//nextCanvas.height =120;
//var ctx2 = nextCanvas.getContext('2d');
//console.log(ctx2);

// x, yの部分へマスを描画する処理

function drawBlockE(x, y) {
  'use strict';
  ctxE.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
  ctxE.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

function drawImagesE(ib,x,y){
  ctxE.drawImage(ib,BLOCK_W * x,BLOCK_H * y);
}
//2render関数は盤面と操作ブロックを描写する関数。
//30ms毎に呼び出されます。
//処理の流れとしては以下の通りである。

//①一度キャンバスをまっさらにする
//②盤面を描写
//③操作ブロックを描写

//*マスが空白の部分は0と指定してある。それを回避するために色マスは一度プラス1され、色を読み込むときにそこから-1する。

//盤面と操作ブロックを描写する
function renderE() {
  'use strict'
  ctxE.clearRect(0, 0, W, H); //一度キャンバスをまっさらにする。
  ctxE.strokeStyle = 'black';//鉛筆の色を黒にする

  //盤面の描写
  var ibE;
  for (var x = 0; x < COLS; ++x) {
    for(var y = 0; y < ROWS; ++y) {
      if(enemyBoard[y][x] != 0){
        //マスの空、つまり０ではないとき
        //console.log("y:" + y + "x:" + x + ":" + enemyBoard[y][x]);
         ibE = imageBlocks[enemyBoard[y][x]-1];//マスの種類に合わせて塗りつぶす色を設定する
      drawImagesE(ibE,x,y); //マスの描写
        //ctxE.fillStyle = colors[enemyBoard[y][x]-1];//マスの種類に合わせて塗りつぶす色を設定する
         drawImagesE(ibE,x,y); //マスの描写
      //drawBlockE(x,y); //マスの描写
      }
    }
  }
}
