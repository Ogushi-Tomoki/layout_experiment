/*　スキップリスト　*/

class Node {
    constructor(num, pointer){
        this.num = num;
        this.pointer = pointer;
    }
}

/**
 * ノードに設定されるレベルを0~30でランダムに算出する
 * @returns {number} 算出されたノードレベル
 */
function getLevel(){
    var level, n, m;
    level = 0;
    n = Math.floor(Math.random() * Math.pow(2, 31));
    m = 1;
    while((n & m) != 0){
        m = m + m;
        level += 1;
    }
    return level;
}

for(var i = 0; i < 10; i++){
    //console.log("i = " + i + ", getLevel() = ");
    console.log(getLevel());
}

