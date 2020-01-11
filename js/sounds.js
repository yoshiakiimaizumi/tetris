
//サーバ起動時に jason　オブジェクトにする　(jasonで場面ごとそれぞれの音をまとめる)
// class SOUNDS{
//     constructor(){
//         this.BGM = "";
//         this.attacked = "";
//         this.minutsAlert = "";
//         this.clearLines = "";
//         this.heartClear = "";
//         this.btnPush = "";
//         this.freeze = "";
//         this.win = "";
//         this.lose = "";
//     }
// }
//これをconstructorでsocket(emit).onする
//serverファイル　→サーバとjason

class SOUNDS {
    constructor(){
        
    }
}
// const battleAudio1 = new Audio("../sounds/BGM/WALKING_AROUND.mp3");

// let attackedAudio1 = new Audio("../sounds/attacked/drum-japanese1.mp3");
// let attackedAudio2 = new Audio("../sounds/attacked/drum-japanese2.mp3");
// let attackedAudio3 = new Audio("../sounds/attacked/mens-ou1.mp3");

// let minutsAlertAudio = new Audio("../sounds/minutesAlert/warning1.mp3");
// let stoneAudio = new Audio("../sounds/stone/cursor6.mp3");

// let clearLinesAudio1 = new Audio("../sounds/clearLines/decision28.mp3");
// let clearLinesAudio2 = new Audio("../sounds/clearLines/decision26.mp3");
// let clearLinesAudio3 = new Audio("../sounds/clearLines/trumpet1.mp3");

// let heartClearAudio1 = new Audio("../sounds/heartClear/kira1.mp3");
// let heartClearAudio2 = new Audio("../sounds/heartClear/kira2.mp3");
// let heartClearAudio3 = new Audio("../sounds/heartClear/line-girl1_line-girl1-yattane1.mp3");

// let btnPushAudio = new Audio("../sounds/btnPush/decision3.mp3");

// let freezeAudio = new Audio("../sounds/move/cursor8.mp3");

// let winAudio = new Audio("../sounds/clearLines/trumpet1.mp3");
// let loseAudio = new Audio("../sounds/attacked/mens-ou1.mp3");

// let sounds = new SOUNDS();
// sounds.BGM = BGMStart();
// sounds.attacked = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.minutsAlert = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.clearLines = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.heartClear = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.btnPush = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.freeze = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.win = new Audio("../sounds/BGM/WALKING_AROUND.mp3");
// sounds.lose = new Audio("../sounds/BGM/WALKING_AROUND.mp3");


// function BGMStart(){
//     battleAudio1.play();
//     battleAudio1.loop = 'true';
// }
// function BGMStop(){
//     battleAudio1.pause();
// }

// function attackedSound(count){
//     if(count == 0){
//         return;
//     }
//     if(count <= 2){
//         attackedAudio1.play();
//         console.log("ATAA12")
//     }else if(count === 3){
//         attackedAudio2.play();
//         console.log("ATAA3")
//     }else{
//         attackedAudio3.play();
//     }
// }

// function minutsAlertSound(){
//     minutsAlertAudio.play();
// }
// function stoneSound(){
//     stoneAudio.play();
// }

// function clearLinesSound(count){
//     if(count === 0){
//         return;
//     }
//     if(count <= 2){
//         clearLinesAudio1.play();
//     }else if(count === 3){
//         clearLinesAudio2.play();
//     }else{
//         clearLinesAudio3.play();
//     }
// }

// function heartClearSound(count){
//     if(count <= 2){
//         heartClearAudio1.play();
//     }else if(count === 3){
//         heartClearAudio2.play();
//     }else{
//         heartClearAudio3.play();
//     }
// }

// function btnPushSound(){
//     btnPushAudio.play();
// }

// function freezeSound(){
//     freezeAudio.play();
// }

// function winSound(){
//     winAudio.play();
// }
// function loseSound(){
//     loseAudio.play();
// }