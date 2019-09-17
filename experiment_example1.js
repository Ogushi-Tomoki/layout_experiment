//人名を格納するバランス木
class NameTree {
    constructor(familyname, firstname, color, left, right, parent) {
        this.familyname = familyname;
        this.firstname = firstname;
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
function insert(tree, familyname, firstname) {
    if (tree == null) {
        var newtree = new NameTree(familyname, firstname, "B", null, null, null);
        return newtree;
    } else if (familyname < tree.familyname) {
        if (tree.left == null) {
            var newtree = new NameTree(familyname, firstname, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = insert(tree.left, familyname, firstname);
            return balance(tree);
        }
    } else if (familyname > tree.familyname) {
        if (tree.right == null) {
            var newtree = new NameTree(familyname, firstname, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = insert(tree.right, familyname, firstname);
            return balance(tree);
        }
    } else if (firstname > tree.firstname) {        //間違えている部分（バグの原因：＜の向きが逆である）
        if (tree.left == null) {
            var newtree = new NameTree(familyname, firstname, "R", null, null, tree);
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = insert(tree.left, familyname, firstname);
            return balance(tree);
        }
    } else {
        if (tree.right == null) {
            var newtree = new NameTree(familyname, firstname, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = insert(tree.right, familyname, firstname);
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

//全てのノードのcolorフィールドにnullを代入する
function insertNullatAllNode(tree) {
    if(tree != null) {
        tree.color = null;
        insertNullatAllNode(tree.left);
        insertNullatAllNode(tree.right);
    }
}

//https://namegen.jp/から、男性の名前30人分と女性の名前30人分をランダムに生成
var MenNameList = [
    "いのうえ きよし",
    "まつもと ひでゆき",
    "くぼ たくや",
    "しみず さとし",
    "かみや だいすけ",
    "みなみ たけし",
    "かわさき つかさ",
    "ながい まさあき",
    "にしだ しげき",
    "ふくなが けんたろう",
    "ながた だいき",
    "もちづき しんや",
    "かめい ひでき",
    "いわさき たかゆき",
    "ふるや けんいち",
    "くどう かずお",
    "まつむら たくや",
    "むらやま よういち",
    "よしざわ りょうた",
    "よしい けんじ",
    "あおやま しんご",
    "おおにし けいすけ",
    "にしかわ やすお",
    "おおしま なおゆき",
    "おおいし じゅんいち",
    "おさだ じゅんいち",
    "うちやま あきひこ",
    "ないとう たつろう",
    "やまかわ しんたろう",
    "ふじの ゆたか"
];

var WomenNameList = [
    "すぎた じゅんこ",
    "みずかみ ゆうこ",
    "いいづか かずみ",
    "はら けいこ",
    "あきもと みき",
    "よしかわ なおこ",
    "やまざき のぞみ",
    "つつみ しほ",
    "おおうち あやの",
    "かしわぎ れいこ",
    "よしなが あやか",
    "しまだ りな",
    "あべ まりな",
    "ごとう えりか",
    "かわしま さちこ",
    "のぐち みき",
    "やなぎ ゆか",
    "かわはら ひろこ",
    "きむ みのり",
    "いわもと むつみ",
    "おのでら あや",
    "かみむら ゆい",
    "きんじょう かなこ",
    "みやた さき",
    "わたなべ みゆき",
    "うえだ あやこ",
    "おがた ちあき",
    "ひぐち みや",
    "いしまる あすか",
    "こやま なな"
];

var sameNameList = [
    "ひかる",
    "ようすけ",
    "たく",
    "まさし",
    "とおる",
    "さゆり",
    "ゆき",
    "あさみ",
    "みなみ",
    "みどり"
];

var rbt = null;
for(var i = 0; i < MenNameList.length; i++){
    var str = MenNameList[i];
    var re = /[^\s]+/g;
    var match = str.match(re);

    rbt = insert(rbt, match[0], match[1]);
}
for(var i = 0; i < WomenNameList.length; i++){
    var str = WomenNameList[i];
    var re = /[^\s]+/g;
    var match = str.match(re);

    rbt = insert(rbt, match[0], match[1]);
}

//ランダムに同じ苗字の人を1人生成する
var MenOrWomenList = null;
if(Math.floor(Math.random() * 2) == 0){
    MenOrWomenList = MenNameList;
} else {
    MenOrWomenList = WomenNameList;
}
var str0 = MenOrWomenList[Math.floor(Math.random() * 30)];
var re0 = /[^\s]+/g;
var match0 = str0.match(re);
var str1 = sameNameList[Math.floor(Math.random() * 10)];
rbt = insert(rbt, match0[0], str1);

insertNullatAllNode(rbt);

MenNameList.length = 0;
WomenNameList.length = 0;
sameNameList.length = 0;