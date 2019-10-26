const battleAudio1 = new Audio("../sounds/BGM/pikopiko.mp3");

let attackedAudio1 = new Audio("../sounds/attacked/drum-japanese1.mp3");
let attackedAudio2 = new Audio("../sounds/attacked/drum-japanese2.mp3");
let attackedAudio3 = new Audio("../sounds/attacked/mens-ou1.mp3");

let minutsAlertAudio = new Audio("../sounds/minutesAlert/warning1.mp3");
let stoneAudio = new Audio("../sounds/stone/cursor6.mp3");

let clearLinesAudio1 = new Audio("../sounds/clearLines/decision26.mp3");
let clearLinesAudio2 = new Audio("../sounds/clearLines/decision28.mp3");
let clearLinesAudio3 = new Audio("../sounds/clearLines/trumpet1.mp3");

let heartClearAudio1 = new Audio("../sounds/heartClear/kira1.mp3");
let heartClearAudio2 = new Audio("../sounds/heartClear/kira2.mp3");
let heartClearAudio3 = new Audio("../sounds/heartClear/line-girl1_line-girl1-yattane1.mp3");

let btnPushAudio = new Audio("../sounds/btnPush/decision3.mp3");
let moveAudio = new Audio("../sounds/move/cursor8.mp3");
let freezeAudio = new Audio("../sounds/freeze/cursor9.mp3");

function BGMStart(){
    battleAudio1.play();
    battleAudio1.loop = 'true';
}
function BGMStop(){
    battleAudio1.pause();
}

function attackedSound(){
    if(attackedCounter <= 2){
        attackedAudio1.play();
    }else if(attackedCounter === 3){
        attackedAudio2.play();
    }else{
        attackedAudio3.play();
    }
}

function minutsAlertSound(){
    minutsAlertAudio.play();
}
function stoneSound(){
    stoneAudio.play();
}

function clearLinesSound(){
    if(rowFilledCount <= 2){
        clearLinesAudio1.play();
    }else if(rowFilledCount === 3){
        clearLinesAudio2.play();
    }else{
        clearLinesAudio3.play();
    }
}

function heartClearSound(){
    if(heartCount <= 2){
        heartClearAudio1.play();
    }else if(heartCount === 3){
        heartClearAudio2.play();
    }else{
        heartClearAudio3.play();
    }
}

function btnPushSound(){
    btnPushAudio.play();
}

function moveSound(){
    moveAudio.play();
}

function freezeSound(){
    freezeAudio.play();
}