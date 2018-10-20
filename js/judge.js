function winnerImage(){
      $(".win").fadeIn(2000);
      setTimeout('rect()');
}


function loserImage(){
      $(".lose").fadeIn(2000);
       setTimeout('rectLose()');
}


function rect() {
    $('.win').animate({
        marginTop: '-=10px'
    }, 800).animate({
        marginTop: '+=10px'
    }, 800);
    setTimeout('rect()', 1600); //アニメーションを繰り返す間隔
}

function rectLose() {
    $('.lose').animate({
        marginTop: '-=10px'
    }, 800).animate({
        marginTop: '+=10px'
    }, 800);
    setTimeout('rectLose()', 1600);
}
