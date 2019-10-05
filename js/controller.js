//操作処理

//document.body.onkeydownというものに関数を指定した場合、どれかキーボードが押された場合に呼び出される。
//押されたキーボードの種類は数字としてe.keyCodeに代入される。

//矢印キーの番号に名前をつけていく。
//これらのキーのどれかが押された場合はkeyPressという関数を呼び出していく。
//これは後ほどtetris.jsに書いていきます。

//キーボードを入力した時に一番最初に呼びだされる処理


document.body.onkeydown = function (e) {
  'use strict';
  //キーに名前をセットする
  var keys = {
    37: 'left',
    39: 'right',
    40: 'down',
    38: 'rotate',
    80: 'pose', //p
    90: 'heart' //z
  };

  if (typeof keys[e.keyCode] !== 'undefind') {
    //セットされたキーの場合はtetris.jsに記述された処理を呼び出す。
    keyPress(keys[e.keyCode]);
    //描写処理を行う。
    render();
  }
};
