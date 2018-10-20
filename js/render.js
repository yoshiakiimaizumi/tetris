var cyan = new Image();
cyan.src = "../images/tetrisBlockCyan30.png";
var orange =new Image();
orange.src = "../images/tetrisBlockOrange30.png";
var blue =new Image();
blue.src = "../images/tetrisBlockBlue30.png";
var yellow =new Image();
yellow.src = "../images/tetrisBlockYellow30.png";
var red =new Image();
red.src = "../images/tetrisBlockRed30.png";
var green =new Image();
green.src = "../images/tetrisBlockGreen30.png";
var purple =new Image();
purple.src = "../images/tetrisBlockPurple30.png";
var black =new Image();
black.src = "../images/tetrisBlockBlack30.png";
var pink =new Image();
pink.src = "../images/tetrisBlockPink30.png";

var imageBlocks = [cyan,orange,blue,yellow,red,green,purple,black,pink];
//render.jsにcanvasの描写処理を書いていく
//描写処理はtetris.jsのメインループ処理とは完全に独立してループする
//1canvasのベース
//現在の盤面の状態を描写する処理
var myCanvas = document.getElementById('mydisp'); //canvas
var ctx = myCanvas.getContext('2d'); //コンテクスト
var W = 300, H = 600; //canvas size
var BLOCK_W = W/COLS, BLOCK_H = H/ROWS;　//マスの幅を設定

var nextCanvas =
document.getElementById('nextShape');
nextCanvas.width = 60;
nextCanvas.height =120;
var ctx2 = nextCanvas.getContext('2d');

// x, yの部分へマスを描画する処理

function drawBlock(x, y) {
  'use strict';
  ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
  ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

function drawImages(ib,x,y){
  ctx.drawImage(ib,BLOCK_W * x,BLOCK_H * y);
}

//2render関数は盤面と操作ブロックを描写する関数。
//30ms毎に呼び出されます。
//処理の流れとしては以下の通りである。

//①一度キャンバスをまっさらにする
//②盤面を描写
//③操作ブロックを描写

//*マスが空白の部分は0と指定してある。それを回避するために色マスは一度プラス1され、色を読み込むときにそこから-1する。

//盤面と操作ブロックを描写する
function render() {
  //'use strict';
  var ib;
  ctx.clearRect(0, 0, W, H); //一度キャンバスをまっさらにする。
  ctx.strokeStyle = 'black';//鉛筆の色を黒にする
  //盤面の描写
  for (var x = 0; x < COLS; ++x) {
    for(var y = 0; y < ROWS; ++y) {
      if(board[y][x]){
        //マスの空、つまり０ではないとき
        ib = imageBlocks[board[y][x]-1];//マスの種類に合わせて塗りつぶす色を設定する
      drawImages(ib,x,y); //マスの描写
      }
    }
  }
//操作ブロックのenemyVERは情報として送るので、enemyRenderに書く必要ない。
//2-2操作ブロックを描写する
  for(var y = 0; y < 4; ++y){
    for(var x = 0; x < 4; ++x){
      if(current[y][x]){
        ib = imageBlocks[current[y][x]-1];//マスの種類に合わせて塗りつぶす色を設定する
        console.log(current[y][x]-1);
        drawImages(ib,currentX + x,currentY + y); //マスの描写

//        ctx.fillStyle = colors[current[y][x] -1];//マスの種類に合わせて塗りつぶす色を設定
//        drawBlock( currentX + x, currentY + y);//マスの描写
      }
    }
  }
  nextRender(nextId);
}
//30ミリ秒ごとに状態を描写する関数を呼び出す
//setInterval(render,30);

function nextRender(nextId){
  var shape = shapes[nextId];
  var color = colors[nextId];
  var imageBlock   = imageBlocks[nextId];
  ctx2.clearRect(0, 0, 120, 120);
  ctx2.fillStyle = color;
  ctx2.strokeStyle = 'black';
  for(var i = 0 ; i < shape.length ; ++i){
    if(shape[i] !== 0){
      var x = parseInt((i-4)/4)===0?1:0;
    ctx2.drawImage(imageBlock,parseInt(x)*30,parseInt((i-4)%4)*30); //ctx2.strokeRect(parseInt(x)*30,parseInt((i-4)%4)*30,30,30);
    }
  }
}
