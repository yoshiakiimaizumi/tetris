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
        right: "-630px"//要素を戻す位置
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

//背景
$(function(){
    randomImges()
});

function randomImges(){
let imagesAry = ['back0','back1','back2','back3','back4','back5','back6'];
let imgSizeAry = ['auto 65%','auto 80px','auto 200px','auto 250px','auto 300px','auto 500px','auto 400px'];

let aryNum = Math.floor((Math.random())*7); 

$('.container').css({'background':'url(../images/' + imagesAry[aryNum] + '.png) center','background-size':imgSizeAry[aryNum]});
}

const windowH = window.innerHeight;

let boxList = [".battleFiledInner", "canvas.main", ".timmer", ".nextShape", 
            ".enemyItems", ".myItems", ".enemyHeartBox", ".myHeartBox", 
            ".enemyBallBox", ".myBallBox", ".enemyWinMarkBox", ".myWinMarkBox", ".getStartTwo", ".getStartOne", ".getStartTest"]
    console.log(windowH);
if(windowH <= 745){
    for(let i = 0; i < boxList.length; i++){
        let currentW = $(boxList[i]).outerWidth();
        let currentH = $(boxList[i]).outerHeight();
        console.log(currentW, currentH );
        $(boxList[i]).css({
            'width': currentW * ((windowH - 50) / 695),
            'height': currentH * ((windowH - 50) / 695)
        });
        console.log("UMM" + currentW, currentH );
    }
    $('.timmer').css('font-size','25px');
    $('.myHeart li').css('padding-top','2.5px');
};

//フルスクリーンスイッチ(要検討)
//ユーザージェスチャのみしか対応していない
// const fullBtn = $('#fullScreenSwitch');
// let fullMode = false;

// if(windowH <= 745){
//     fullBtn.trigger('click');
//     console.log('CLICK');
// }
// fullBtn.on('click', (event) => {
//     // フルスクリーンにする
//     if(!fullMode){
//         myReqeustFullScreen(document.body);
//         fullMode = true;
//     }else{//フルスクリーン解除
//         myCancelFullScreen();
//         fullMode = false;
//     }
// });
// function myReqeustFullScreen(element) {
//     if (element.webkitRequestFullscreen) {
//         //標準仕様
//         element.requestFullscreen();
//     }else if (element.webkitRequestFullscreen) {
//         // Safari, Chrome
//         element.webkitRequestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//         // Firefox
//         element.mozRequestFullScreen();
//     } else if (element.msRequestFullscreen) {
//         // IE11+
//         element.msRequestFullscreen();
//     }else if(element.webkitRequestFullscreen) {
//         // 標準仕様
//         element.requestFullscreen();
//     }  
// }
// function myCancelFullScreen() {
//     if (document.exitFullscreen) {
//         // 標準仕様
//         document.exitFullscreen();
//     } else if (document.webkitCancelFullScreen) {
//         // Safari, Chrome
//         document.webkitCancelFullScreen();
//     } else if (document.mozCancelFullScreen) {
//         // Firefox
//         document.mozCancelFullScreen();
//     } else if (document.msExitFullscreen) {
//         // IE 11+
//         document.msExitFullscreen();
//     }
// }


