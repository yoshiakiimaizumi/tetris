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
    }, 6000,'liner').animate({
        right: "-630px"　//要素を戻す位置
    }, 0)
    setTimeout("rectWait()", 3000);//アニメーションを繰り返す間隔
}

//ポーズ判定
function poseShow(){
    $(".pose").show();
}

function poseHide(){
    $(".pose").hide();
}