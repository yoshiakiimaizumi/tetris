class Block{
    // var imageBlocks = [cyan,orange,blue,yellow,red,green,purple,stone,pink,heart];
    constructor(json){
        this.blockMap = new Map();
        for(let key in json){
            let img = new Image();
            img.src = json[key];
            this.blockMap.set(key,img);
        }
        this.types = Object.keys(json);
    }
    call(name){
        return this.blockMap.get(name);
    }
    get types(){
        return this._types;//アンスコはルール
    }
    set types(val){
        this._types = val;//アンスコはルール
    }
}
