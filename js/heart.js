function myHeart(){
    if(heartCount === 0){
        return;
    }
    let count = heartCount;
    for(let i = 0; i < count; i++){
        clearOneLine(true,true);
    }
    heartClearSound(count);
    heartCount = 0;
}
