/*　スキップリスト　*/

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



/*------------
    配列ver
-------------*/
// class SkipListNode {
//     constructor(value){
//         this.value = value;
//         this.array = null;
//     }

//     makeArray(num){
//         this.array = new Array(num);
//     }
// }

/**
 * 1から10までのスキップノードを生成する
 * 各ノードの配列の長さはgetLevel()でランダムに決められる
 * @return {SkipListNode} スキップリストの先頭ノード
 */
// function makeSkipList(num){
//     var levels = new Array(num);
//     var maxLevel = 1;
//     for(var i = 0; i < num; i++){
//         levels[i] = getLevel() + 1;
//         if(maxLevel < levels[i]){
//             maxLevel = levels[i];
//         }
//     }
//     console.log("levels[] = ");
//     console.log(levels);
//     console.log("maxLevel = ");
//     console.log(maxLevel);

//     /**
//      * 先頭ノードと終点ノードを作成
//      * 配列の長さは最大レベルと同じにする
//      */
//     var head = new SkipListNode("head");
//     var tail = new SkipListNode("tail");
//     head.makeArray(maxLevel);
//     tail.makeArray(maxLevel);

//     var SkipListArray = new Array(num + 2);
//     SkipListArray[0] = head;
//     SkipListArray[num + 1] = tail;

//     for(var i = num; i >= 0; i--){
//         if(i != 0){
//             SkipListArray[i] = new SkipListNode(i);
//             SkipListArray[i].makeArray(levels[i - 1]);
//         }
//         for(var j = 0; j < levels[i - 1]; j++){
//             for(var k = i + 1; k < num + 2; k++){
//                 if(SkipListArray[k].array.length >= j + 1){
//                     // console.log("i = " + i);
//                     // console.log("k = " + k);
//                     // console.log("SkipListArray[k].array.length = " + SkipListArray[k].array.length);
//                     // console.log("j = " + j);
//                     // console.log("\n");
//                     SkipListArray[i].array[j] = SkipListArray[k];
//                     break;
//                 }
//             }
//         }
//         if(i == 0){
//             for(var j = 0; j < maxLevel; j++){
//                 for(var k = i + 1; k < num + 2; k++){
//                     if(SkipListArray[k].array.length >= j + 1){
//                         SkipListArray[i].array[j] = SkipListArray[k];
//                         break;
//                     }
//                 }
//             }
//         }
//     }   

//     console.log(SkipListArray);
//     SkipListArray.length = 0;
// }

/*------------
    リストver
-------------*/
class SkipListNode {
    constructor(value){
        this.value = value;
        this.list = null;
    }

    makeList(num){
        if(this.list == null){
            this.list = new ListNode(null);
            for(var i = 0; i < num - 1; i++){
                this.list.addTail(null);
            }
        }
    }

    listLength(){
        if(this.list == null){
            return 0;
        } else {
            return this.list.length();
        }
    }

    //listのi番目の要素にvalを格納する。ただし、先頭は0番目とする。
    storageVal(i, val){
        this.list.storage(i, val);
    }

    //listのi番目の要素を返す。ただし、先頭は0番目とする。
    return_iList(i){
        return this.list.iList(i);
    }
}

class ListNode {
    constructor(val){
        this.val = val;
        this.next = null;
    }

    addTail(val){
        if(this.next == null){
            this.next = new ListNode(val);
        } else {
            this.next.addTail(val);
        }
    }

    length(){
        if(this.next == null){
            return 1;
        } else {
            return this.next.length() + 1;
        }
    }

    //listのi番目の要素にvalを格納する。ただし、先頭は0番目とする。
    storage(i, val){
        if(i == 0){
            this.val = val;
        } else if(i > 0 && this.next != null){
            this.next.storage(i - 1, val);
        } else {
            throw "list length over!!";
        }
    }

    //listのi番目の要素を返す。ただし、先頭は0番目とする。
    iList(i){
        if(i == 0){
            return this;
        } else if(i > 0 && this.next != null){
            return this.next.iList(i - 1);
        } else {
            throw "list length over!!";
        }
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
    head.makeList(maxLevel);
    tail.makeList(maxLevel);

    var SkipListArray = new Array(num + 2);
    SkipListArray[0] = head;
    SkipListArray[num + 1] = tail;

    for(var i = num; i >= 0; i--){
        if(i != 0){
            SkipListArray[i] = new SkipListNode(i);
            SkipListArray[i].makeList(levels[i - 1]);
        }
        for(var j = 0; j < levels[i - 1]; j++){
            for(var k = i + 1; k < num + 2; k++){
                if(SkipListArray[k].listLength() >= j + 1){
                    // console.log("i = " + i);
                    // console.log("k = " + k);
                    // console.log("SkipListArray[k].array.length = " + SkipListArray[k].array.length);
                    // console.log("j = " + j);
                    // console.log("\n");
                    SkipListArray[i].storageVal(j, SkipListArray[k]);
                    //SkipListArray[i].storageVal(j, SkipListArray[k].return_iList(j));
                    break;
                }
            }
        }
        if(i == 0){
            for(var j = 0; j < maxLevel; j++){
                for(var k = i + 1; k < num + 2; k++){
                    if(SkipListArray[k].listLength() >= j + 1){
                        SkipListArray[i].storageVal(j, SkipListArray[k]);
                        //SkipListArray[i].storageVal(j, SkipListArray[k].return_iList(j));
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