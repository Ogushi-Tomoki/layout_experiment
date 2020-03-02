//人名を格納するバランス木
class NameTree {
    constructor(sei, mei, color, left, right, parent) {
        this.sei = sei;
        this.mei = mei;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

//ノードが赤かどうかチェックする
function isR(tree) {
    if (tree == null) return false;
    else return tree.color == "R";
}

//ノードが黒かどうかチェックする
function isB(tree) {
    if (tree == null) return false;
    else return tree.color == "B";
}

//木の左回転。回転した木を返す
function rotateL(tree) {
    var u = tree.right;
    u.parent = tree.parent;
    var v = u.left;
    tree.right = v;
    if (v != null) v.parent = tree;
    u.left = tree;
    tree.parent = u;
    return u;
}

//木の右回転。回転した木を返す
function rotateR(tree) {
    var u = tree.left;
    u.parent = tree.parent;
    var v = u.right;
    tree.left = v;
    if (v != null) v.parent = tree;
    u.right = tree;
    tree.parent = u;
    return u;
}

//二重回転（左回転→右回転）
function rotateLR(tree) {
    tree.left = rotateL(tree.left);
    return rotateR(tree);
}

//二重回転（右回転→左回転）
function rotateRL(tree) {
    tree.right = rotateR(tree.right);
    return rotateL(tree);
}

//挿入操作
function insert(tree, sei, mei) {
    if (tree == null) {
        var newtree = new NameTree(sei, mei, "B", null, null, null);
        return newtree;
    } else if (sei < tree.sei) {
        if (tree.left == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = insert(tree.left, sei, mei);
            return balance(tree);
        }
    } else if (sei > tree.sei) {
        if (tree.right == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = insert(tree.right, sei, mei);
            return balance(tree);
        }
    } else if (mei < tree.mei) {
        if (tree.left == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = insert(tree.left, sei, mei);
            return balance(tree);
        }
    } else {
        if (tree.right == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = insert(tree.right, sei, mei);
            return balance(tree);
        }
    }
}

//挿入操作（バグ）
function buginsert(tree, sei, mei) {
    if (tree == null) {
        var newtree = new NameTree(sei, mei, "B", null, null, null);
        return newtree;
    } else if (mei < tree.mei) {
        if (tree.left == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = buginsert(tree.left, sei, mei);
            return balance(tree);
        }
    } else if (mei > tree.mei) {
        if (tree.right == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = buginsert(tree.right, sei, mei);
            return balance(tree);
        }
    } else if (sei < tree.sei) {
        if (tree.left == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = buginsert(tree.left, sei, mei);
            return balance(tree);
        }
    } else {
        if (tree.right == null) {
            var newtree = new NameTree(sei, mei, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = buginsert(tree.right, sei, mei);
            return balance(tree);
        }
    }
}

//エントリー挿入に伴う赤黒木の修正（パターンマッチ）
function balance(tree) {
    if (isR(tree) && tree.parent != null) {
        return tree;
    } else if (isR(tree.left) && isR(tree.left.left)) {
        var newtree = rotateR(tree);
        newtree.left.color = "B";
        return isRootBlack(newtree);
    } else if (isR(tree.right) && isR(tree.right.right)) {
        var newtree = rotateL(tree);
        newtree.right.color = "B";
        return isRootBlack(newtree);
    } else if (isR(tree.left) && isR(tree.left.right)) {
        var newtree = rotateLR(tree);
        newtree.left.color = "B";
        return isRootBlack(newtree);
    } else if (isR(tree.right) && isR(tree.right.left)) {
        var newtree = rotateRL(tree);
        newtree.right.color = "B";
        return isRootBlack(newtree);
    } else {
        return isRootBlack(tree);
    }
}

//根のノードが赤だった場合は問答無用で黒に変更する
function isRootBlack(tree) {
    if (tree.parent == null && tree.color == "R") {
        tree.color = "B";
        return tree;
    } else {
        return tree;
    }
}

//全てのノードのcolorフィールドとparentフィールドにnullを代入する
function insertNullatAllNode(tree) {
    if(tree != null) {
        tree.color = null;
        tree.parent = null;
        insertNullatAllNode(tree.left);
        insertNullatAllNode(tree.right);
    }
}

//https://namegen.jp/から、苗字60人分をランダムに生成
var seiList = [
    "あおやま", "あきもと",　"あべ", 
    "いいづか", "いしまる", "いのうえ", 
    "いわさき", "いわもと", "うえだ", 
    "うちやま", "おおいし", "おおうち", 
    "おおしま", "おおにし", "おがた", 
    "おさだ", "おのでら", "かしわぎ", 
    "かみむら", "かみや", "かめい", 
    "かわさき", "かわしま", "かわはら", 
    "きむ", "きんじょう", "くどう", 
    "くぼ", "こやま", "ごとう", 
    "しまだ", "しみず", "すぎた", 
    "つつみ", "ないとう", "ながい", 
    "ながた", "にしかわ", "にしだ", 
    "のぐち", "はら", "ひぐち", 
    "ふくなが", "ふじの", "ふるや", 
    "まつむら", "まつもと", "みずかみ", 
    "みなみ", "みやた", "むらやま", 
    "もちづき", "やなぎ", "やまかわ", 
    "やまざき", "よしい", "よしかわ", 
    "よしざわ", "よしなが", "わたなべ"
];

//https://namegen.jp/から、男性の名前33人分をランダムに生成
var MenNameList = [
    "あきひこ", "かずお", "きよし", 
    "けいすけ", "けんいち", "けんじ", 
    "けんたろう", "さとし", "しげき", 
    "じゅんいち", "しんご", "しんたろう", 
    "しんや", "だいき", "だいすけ", 
    "たかゆき", "たく", "たくや", 
    "たけし", "たつろう", "つかさ", 
    "とおる", "なおあき", "ひかる", 
    "ひでき", "ひでゆき", "まさあき", 
    "まさし", "やすお", "ゆたか", 
    "よういち", "ようすけ", "りょうた"
];

//https://namegen.jp/から、女性の名前33人分をランダムに生成
var WomenNameList = [
    "あさみ", "あすか", "あや", 
    "あやか", "あやこ", "あやの", 
    "えりか", "かずみ", "かなこ", 
    "けいこ", "さき", "さちこ", 
    "さゆり", "しほ", "じゅんこ", 
    "ちあき", "なおこ", "なな", 
    "のぞみ", "ひろこ", "まりな", 
    "みき", "みどり", "みなみ", 
    "みのり", "みや", "みゆき", 
    "むつみ", "ゆい", "ゆうこ", 
    "ゆか", "りな", "れいこ"
];

//filter-yates shuffleアルゴリズムを利用して配列をシャッフルする関数
function shuffleArray(array){
    var randomlength = array.length;
    while(randomlength){
        var j = Math.floor(Math.random() * randomlength);
        var t = array[--randomlength];
        array[randomlength] = array[j];
        array[j] = t;
    }
}

shuffleArray(seiList);
shuffleArray(MenNameList);
shuffleArray(WomenNameList);

var nodeNumber = 10;        //画面に表示させるノード数

//人名をツリーに入れていく
var rbt = null;
for(var i = 0; i < nodeNumber; i++){
    if(i < nodeNumber / 2){
        rbt = insert(rbt, seiList[i], MenNameList[i]);
    } else {
        rbt = insert(rbt, seiList[i], WomenNameList[i - nodeNumber / 2]);
    }
}

//ランダムに一人を挿入、このときにバグ関数を使って間違いの箇所を生成する
if(Math.floor(Math.random() * 2) == 0){
    rbt = buginsert(rbt, seiList[nodeNumber / 2], MenNameList[nodeNumber / 2]);
} else {
    rbt = buginsert(rbt, seiList[nodeNumber / 2], WomenNameList[nodeNumber / 2]);
}

insertNullatAllNode(rbt);

MenNameList.length = 0;
WomenNameList.length = 0;
seiList.length = 0;