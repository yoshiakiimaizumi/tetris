class Sound {
    constructor(json){
        this.soundMap = new Map();
        for(let key in json){
            this.soundMap.set(key,new Audio(json[key]));
        }
    }
    play(name){
        if(!this.soundMap.get(name)){
            return;
        }
        this.soundMap.get(name).play();
    }
    loop(name){
        if(!this.soundMap.get(name)){
            return;
        }
        this.soundMap.get(name).loop = true;
        this.soundMap.get(name).play();
        
    }
    stop(name){
        if(!this.soundMap.get(name)){
            return;
        }
        this.soundMap.get(name).pause();
    }
}