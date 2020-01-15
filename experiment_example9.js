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

// for(var i = 0; i < 10; i++){
//     console.log(getLevel());
// }

class SkipListNode {
    constructor(value){
        this.value = value;
        this.array = null;
    }

    makeArray(num){
        this.array = new Array(num);
    }
}

/**
 * 1から10までのスキップノードを生成する
 * 各ノードの配列の長さはgetLevel()でランダムに決められる
 * @return {SkipListNode} スキップリストの先頭ノード
 */
function makeSkipList(num){
    var levels = new Array(num);
    var maxLevel = 1;
    for(var i = 0; i < num; i++){
        levels[i] = getLevel() + 1;
        if(maxLevel < levels[i]){
            maxLevel = levels[i];
        }
    }
    console.log("levels[] = ");
    console.log(levels);
    console.log("maxLevel = ");
    console.log(maxLevel);

    /**
     * 先頭ノードと終点ノードを作成
     * 配列の長さは最大レベルと同じにする
     */
    var head = new SkipListNode("head");
    var tail = new SkipListNode("tail");
    head.makeArray(maxLevel);
    tail.makeArray(maxLevel);

    var SkipListArray = new Array(num + 2);
    SkipListArray[0] = head;
    SkipListArray[num + 1] = tail;

    for(var i = num; i >= 0; i--){
        if(i != 0){
            SkipListArray[i] = new SkipListNode(i);
            SkipListArray[i].makeArray(levels[i - 1]);
        }
        for(var j = 0; j < levels[i - 1]; j++){
            for(var k = i + 1; k < num + 2; k++){
                if(SkipListArray[k].array.length >= j + 1){
                    // console.log("i = " + i);
                    // console.log("k = " + k);
                    // console.log("SkipListArray[k].array.length = " + SkipListArray[k].array.length);
                    // console.log("j = " + j);
                    // console.log("\n");
                    SkipListArray[i].array[j] = SkipListArray[k];
                    break;
                }
            }
        }
        if(i == 0){
            for(var j = 0; j < maxLevel; j++){
                for(var k = i + 1; k < num + 2; k++){
                    if(SkipListArray[k].array.length >= j + 1){
                        SkipListArray[i].array[j] = SkipListArray[k];
                        break;
                    }
                }
            }
        }
    }   

    console.log(SkipListArray);
    SkipListArray.length = 0;
}

makeSkipList(10);