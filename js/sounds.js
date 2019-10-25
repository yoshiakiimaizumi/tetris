let BGM = new Audio("../sounds/BGM/ピコピコランドリー.mp3");

let attacked1 = new Audio("../sounds/attacked/drum-japanese1.mp3");
let attacked2 = new Audio("../sounds/attacked/drum-japanese2.mp3");
let attacked3 = new Audio("../sounds/attacked/mens-ou1.mp3");

let minutsAlert = new Audio("../sounds/minutsAlert/warning1.mp3");
let stone = new Audio("../sounds/stone/cursor6.mp3");

let clearLines1 = new Audio("../sounds/clearLines/decision26.mp3");
let clearLines2 = new Audio("../sounds/clearLines/decision28.mp3");
let clearLines3 = new Audio("../sounds/clearLines/trumpet1.mp3");

let heartClear1 = new Audio("../sounds/clearLines/kira1.mp3");
let heartClear2 = new Audio("../sounds/clearLines/kira2.mp3");
let heartClear3 = new Audio("../sounds/clearLines/line-girl1_line-girl1-yattane1.mp3");

let btnPush = new Audio("../sounds/btnPush/decision3.mp3");
let move = new Audio("../sounds/btnPush/cursor8.mp3");
let freeze = new Audio("../sounds/btnPush/cursor9.mp3");

function BGMStart(){
    BGM.play();
    BGM.loop = 'true';
}
function BGMStop(){
    BGM.pause();
}

function attackedSound(){
    if(attackedCounter > 3){
        attacked1.play();
    }else if(attackedCounter === 3){
        attacked2.play();
    }else{
        attacked3.play();
    }
}

function minutsAlertSound(){
    minutsAlert.play();
}
function stoneSound(){
    stone.play();
}

function clearLinesSound(){
    if(rowFilledCount > 3){
        clearLines1.play();
    }else if(rowFilledCount === 3){
        clearLines2.play();
    }else{
        clearLines3.play();
    }
}

function heartClearSound(){
    if(heartCount > 3){
        heartClear1.play();
    }else if(heartCount === 3){
        heartClear2.play();
    }else{
        heartClear3.play();
    }
}

function btnPushSound(){
    btnPush.play();
}

function moveSound(){
    move.play();
}

function freezeSound(){
    freeze.play();
}