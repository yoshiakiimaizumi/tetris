var COLS = 10, ROWS = 20; //横10 縦20
var board = []; // 盤面情報
var lose;// 一番上までいっちゃったかどうか
var interval;//ゲームを実行するタイマー関数を保持する
var startTime;
var timerCount;//ゲームの時間を保持
var current;
var currentX, currentY;//現在操作しているブロックのいち
var beforeMinutes = 0;
nextId = null;
var currentColor;
var mAfter = false;
var renderInterval ;
var emitInterval;
var isVS;

//操作するブロックのパターン
////空のマスは0, 色のマスは1以上としてセット
 shapes = [
  [ 0, 0, 0, 0,
    1, 1, 1, 1 ],
  [ 0, 0, 0, 0,
    1, 1, 1, 0,
    1 ],
  [ 0, 0, 0, 0,
    1, 1, 1, 0,
    0, 0, 1 ],
  [ 0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1 ],
  [ 0, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 1 ],
  [ 0, 0, 0, 0,
    0, 1, 1, 0,
    1, 1 ],
  [ 0, 0, 0, 0,
    0, 1, 0, 0,
    1, 1, 1 ]
];
//ブロックの色
 colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple', 'black','pink'
];

//最後に盤面の上にくるよう位置をセット



//shapeからのランダムにブロックのパターンに出力し、盤面の一番上へセットする。

//shapesからランダムにパターンを取り出し、currentにコピー(セット)していく。
function newShape() {
  'use strict';
  //ゲームスタート時、nextブロックは空の為
  if(nextId == null){
    nextId = Math.floor(Math.random() * shapes.length);
  }
  //ランダムにインデックスから出す
  var id = Math.floor(Math.random() * shapes.length);

  var shape = shapes[nextId];

  //操作ブロックは4 x 4マスの中で表現
  //パターンを操作ブロックへセットする
  current = [];
  for (var y =0; y < 4 ; ++y) {
    current[y] = [];
    for (var x = 0; x < 4; ++x) {
      var i = 4 * y + x;
      if (typeof shape[i] != 'undefined' && shape[i]) {
        current[y][x] = nextId + 1;
      }
      else {
        current[y][x] = 0;
      }
    }
  }
  current = rotate(current);
  //ブロックを盤面の上のほうにセットする
  currentX = 3;
  currentY = 0;
  nextId = id;
}

//盤面に関する関数　０：何もない　１～：ブロック
//盤面をリセットする

function init() {
  'use strict';
  for (var y = 0; y < ROWS; ++y) {
    board[y] = [];
    for (var x = 0; x < COLS; ++x) {
      board[y][x] = 0;
    }
  }
}

//メインループ処理
//ゲームが始まると500毎秒に呼び出されるtick関数
//操作ブロックを下へ１つずらす
//操作ブロックが着地したら消去処理、
//ゲームオーバー判定も行う。

function tick() {
  // １つ下へ移動する
  if (valid( 0, 1 )){
    ++currentY;
  }
  // もし着地していたら(１つしたにブロックがあったら)
  else {
    freeze();  // 操作ブロックを盤面へ固定する
    clearLines();  // ライン消去処理
    //ブロックが着地するまでグレイのラインが出ないようにする。
    if(mAfter){
      addOneLine(8);
      mAfter=false;
    }
    //自分の消したライン分、相手にラインを送れる
    if(attackedCounter > 0 && isVS){
      for(var i = 0; i < attackedCounter ; ++i){
        upLineForAttacked();
      }
      attackedCounter = 0;
    }
    //ゲームオーバーになった時
    if (lose && isVS) {
      //負けた人様の画像
      loserImage();
      //相手に負けたことを送る
      socket.emit('end','winner');
      stopTimer();
      // もし負けたならば、テトリスボタンが押せる様になる
      $("#getStart").prop("disabled", false);
      $("#getStart").fadeIn(2000);
      return false;
    }
    // 新しい操作ブロックをセットする
    newShape();
    //console.log(socket); デバック
  }
  //操作状態の盤面情報を一次配列に変えて相手に送る
  //socket.emit('board',toOneDimention(board));
}

//操作ブロックを盤面へセットする関数。
//操作ブロックが着地する際に呼び出される
function freeze() {
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if (current[y][x]) {
        board[ y + currentY][x + currentX] = current[y][x];
      }
    }
  }
}

//操作ブロックを回す処理
//newCurrent[ y ][ x ] = current[ 3 - x ][ y ];として回転させている。

function rotate(current) {
  var newCurrent = [];
  for (var y = 0; y < 4; ++y) {
    newCurrent[y] = [];
    for (var x = 0; x < 4; ++x) {
      newCurrent[y][x] = current[3 - x][y];
    }
  }
  return newCurrent;
}

//行がそろったら消去処理を行うclearLines関数
//clearLines関数はfreeze関数が呼び出された直後に実行される。
//以下のように行う。
//①一行そろっている場所を調べる。
//②そろっていたらその上にあったブロックを１つずつ下へずらす。(消去)
//一行そろっているかどうかはrowFilled変数に代入する。
//一行そろっているか調べ、そろっていたらその行を消す
function clearLines() {
  for (var y = ROWS - 1; y >= 0; --y) {
    var rowFilled = true;
    //一行がそろっているのか調べる
    for(var x = 0; x < COLS; ++x){
      if (board[y][x] == 0) {
        rowFilled = false;
        break;
      }
    }
    //一行確認し、もし空白マスがなければその行を消す(不可ブロックは除く)
    if (rowFilled && board[y][0] !== 8) {
      if(board[y][0] === 9){
        pinkAttack()
      }else{
        attack()
      }
      for (var yy = y; yy>0; --yy) {
        for ( x = 0; x < COLS; ++x) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y; //一行落とした為、チェック処理を１つ下へ送る
    }
  }
}

//キーボードが押された時の処理
//上が押された時は回転。
//それ以外の時はその方向へ操作ブロックをずらす。
//ずらす場合はvalid処理をはさむ。
//キーボードが押された時に呼び出される関数

var poseFlag = false;
function keyPress(key) {
  switch(key) {
    case 'left':
      if (valid(-1)) {
        --currentX;//左に１つずつずらす
      }
      break;
    case 'right':
      if (valid(1)) {
      ++currentX;//に１つずつずらす
  }
      break;
    case 'down':
      if (valid(0,1)) {
        ++currentY;//下に１つずつずらす
      }
      break;
    case 'rotate'://操作ブロックを回す
      var rotated = rotate(current);
      if (valid(0,0,rotated)) {
        current = rotated;//回せる場合は回したあとの状態に操作ブロックをセットする。
      }else if(valid(1,0,rotated)){
    	  current = rotated;
    	  ++currentX;
      }else if(valid(-1,0,rotated)){
    	  current = rotated;
    	  --currentX;
      }
      break;
    case 'pose':
        //poseBtnが押されていない(pose)
      if(!poseFlag){
        pose(true);
        socket.emit('pose',true);
        console.log(poseFlag);
        console.log("stop");
      }else{//poseBtnが押されている(pose解除)
        pose(false);
        socket.emit('pose',false);
        console.log(poseFlag);
        console.log("start");
      }
  }
}

function pose(flag){
  if(flag){
    stopTimer();
    poseFlag = true;
  }else{
    startTimer();
    poseFlag = false;
  }
}

//指定された方向に、操作ブロックが動かせるかどうかチェックする。
//ゲームオーバー判定もここで行う
//基本的に現在の操作ブロックがその方向(offsetX, offsetY)に動いたら、というものを判定だが、newCurrentという引数を取った場合、そのブロックがその方向に動いたら、というものをする。

//以下の場合falseを返し、そうでない場合はtrueを返します。

//①移動先が盤面外だった場合
//②移動先に既に色のマスが合った場合
//もし操作ブロックが盤面の上にあったらゲームオーバーにします。loseフラッグをtrueにします。
//
function valid ( offsetX, offsetY, newCurrent ) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (newCurrent[y][x]) {
        if (typeof board [y + offsetY] == 'undefined'
           || typeof board [y + offsetY][x + offsetX] == 'undefined'
           || board [y + offsetY][x + offsetX]
           || x + offsetX < 0
           || y + offsetY >= ROWS
           || x + offsetX >= COLS) {
                    if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY >= 1) {
                        console.log('game over');
                        lose = true;
                      // もし操作ブロックが盤面の上にあったらゲームオーバーにする
                    }
          return false;
          }
      }
    }
  }
  return true;
}

//ゲームの経過時間タイマー　1秒ごとに起動
function timer() {
  let t = Date.now() - startTime
  let playTime = new Date(t);
  let minutes = playTime.getMinutes();
  let seconds  = playTime.getSeconds();
  document.getElementById("counter").textContent = minutes + '分' + seconds + '秒' ;

  //1分ごとの処理（不可ブロック一段追加）
  if(beforeMinutes+1 === minutes){
      beforeMinutes++;
      mAfter = true;
  }
}

//指定ブロックの一行追加処理
function addOneLine(blockNumber){
  var minutes = 1;
  for(var y = 0; y < ROWS-minutes ; ++y){
    for(var x = 0; x < COLS; ++x){
      board[y][x] = board[y+minutes][x]
    }
  }
  for(var i = 0; i < minutes; ++i){
    for(x = 0; x < COLS; ++x){
      board[ROWS-1-i][x] = blockNumber;
    }
  }
}

//new game 画面を呼びだす
function newGame(vsOrNot) {
	isVS = vsOrNot;
	clearInterval(interval); //ゲームタイマーをクリア
	clearInterval(timerCount);
	init(); //盤面をリセット
	newShape(); //操作ブロックをセット
	interval = setInterval( tick,500 ); //250ミリ秒ごとにtick関数を呼び出す
	startTime = Date.now();
	timerCount = setInterval( timer,1000 ); //
	beforeMinutes = 0;
	renderInterval = setInterval(render,20);
	if(isVS){
		lose = false; //負けフラグ
		emitInterval = setInterval(myInfo,20);
		attackedCounter = 0;
	}
	$(".win").hide();
	$(".lose").hide();
	$(".wait").hide();
}

function myGame(){
	new newGame(false);console.log("myGame");
}

function stopTimer(){
   clearInterval(interval);
   clearInterval(timerCount);
   clearInterval(renderInterval);
   clearInterval(emitInterval);
}

function startTimer(){
  interval = setInterval( tick,500 );
  timerCount = setInterval( timer,1000 ); 
  renderInterval = setInterval(render,20);
  emitInterval = setInterval(myInfo,20);
}
