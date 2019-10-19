//勝利判定
function winnerImage(){
      $(".win").fadeIn(2000);
      setTimeout('rect()');
}

function rect() {
    $('.win').animate({
        marginTop: '-=10px'
    }, 800).animate({
        marginTop: '+=10px'
    }, 800);
    setTimeout('rect()', 3000); //アニメーションを繰り返す間隔
}

//敗北判定
function loserImage(){
      $(".lose").fadeIn(2000);
       setTimeout('rectLose()');
}

function rectLose() {
    $('.lose').animate({
        marginTop: '-=10px'
    }, 800).animate({
        marginTop: '+=10px'
    }, 800);
    setTimeout('rectLose()', 3000);
}

//待ち判定
function waitImage(){
      $(".wait").show();
       setTimeout('rectWait()');
}

function rectWait() {
    $(".wait").animate({
        right: "2000px" //要素を動かす位置
    }, 6000).animate({
        right: "-630px"　//要素を戻す位置
    }, 0)
    setTimeout("rectWait()", 3000);//アニメーションを繰り返す間隔
}

//ポーズ判定
function poseShow(){
    $(".pose").show();
    console.log("show");
}
function poseHide(){
    $(".pose").hide();
    console.log("hide");
}

//フルスクリーンスイッチ(要検討)
    const fullBtn = $('#fullScreenSwitch');

  
    const btn = document.querySelector('#btn');
    btn.addEventListener('click', (event) => {
    // フルスクリーンにする
     myReqeustFullScreen(document.body);
    });

    function myReqeustFullScreen(element) {
        if (element.webkitRequestFullscreen) {
            //標準仕様
            element.requestFullscreen();
        }else if (element.webkitRequestFullscreen) {
            // Safari, Chrome
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            // Firefox
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11+
            element.msRequestFullscreen();
        }else if(element.webkitRequestFullscreen) {
            // 標準仕様
            element.requestFullscreen();
        }  
    }

    const btnExit = document.querySelector('#btnExit');
    btnExit.addEventListener('click', (event) => {
    // フルスクリーンを解除する
    myCancelFullScreen();
    });

    function myCancelFullScreen() {
    if (document.exitFullscreen) {
        // 標準仕様
        document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
        // Safari, Chrome
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        // IE 11+
        document.msExitFullscreen();
    }
    }
      

