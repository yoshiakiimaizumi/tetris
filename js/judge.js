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
//透過率を変