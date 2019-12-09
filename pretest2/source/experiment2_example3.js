class Store {
    constructor(name){
        this.name = name;
        this.next = null;
        this.prev = null;
        this.goods = null;
    }

    goodsInsert(productNo, price){
        if(this.goods != null){
            this.goods.store = null;
        }
        this.goods = insert(this.goods, productNo, price);
        this.goods.store = this;
    }

    insertNULL(){
        insertNullatAllNode(this.goods);
        if(this.next != null){
            this.next.insertNULL();
        }
    }
}

function addStore(store, name){
    var newstore = new Store(name);
    if(store == null){
        return newstore;
    } else if(store.name < newstore.name){
        if(store.next == null){
            store.next = newstore;
            newstore.prev = store;
            return store;
        } else {
            if(store.next.name > newstore.name){
                var temp = store.next;
                store.next = newstore;
                temp.prev = newstore;
                newstore.next = temp;
                newstore.prev = store;
                return store;
            } else {
                store.next = addStore(store.next, name);
                return store;
            }
        }
    } else {
        if(store.prev == null){
            store.prev = newstore;
            newstore.next = store;
            return newstore;
        } else {
            if(store.prev.name < newstore.name){
                var temp = store.prev;
                store.prev = newstore;
                temp.next = newstore;
                newstore.prev = temp;
                newstore.next = store;
                return temp;
            } else {
                return addStore(store.prev, name);
            }              
        }
    }
}

function addGoods(store, storename, productNo, price){
    if(store == null){
        return;
    } else if(store.name == storename){
        store.goodsInsert(productNo, price);
    } else{
        addGoods(store.next, storename, productNo, price);
    }
}

class Goods {
    constructor(productNo, price, color, left, right, parent){
        this.productNo = productNo;
        this.price = price;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.store = null;
    }
}

function isR(tree) {
    if (tree == null) return false;
    else return tree.color == "R";
}

function isB(tree) {
    if (tree == null) return false;
    else return tree.color == "B";
}

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

function rotateLR(tree) {
    tree.left = rotateL(tree.left);
    return rotateR(tree);
}

function rotateRL(tree) {
    tree.right = rotateR(tree.right);
    return rotateL(tree);
}

function insert(tree, productNo, price) {
    if (tree == null) {
        var newtree = new Goods(productNo, price, "B", null, null, null);
        return newtree;
    } else if (productNo < tree.productNo) {
        if (tree.left == null) {
            // var newtree = new Goods(productNo, price, "R", null, null, tree);        //正しいコード
            var newtree = new Goods(productNo, price, "B", null, null, tree);           //間違えたコード。RとBが逆転している。
            tree.left = newtree;
            return balance(tree);
        } else {
            tree.left = insert(tree.left, productNo, price);
            return balance(tree);
        }
    } else if (productNo > tree.productNo) {
        if (tree.right == null) {
            var newtree = new Goods(productNo, price, "R", null, null, tree);
            tree.right = newtree;
            return balance(tree);
        } else {
            tree.right = insert(tree.right, productNo, price);
            return balance(tree);
        }
    } else {
        return balance(tree);
    }
}

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

function isRootBlack(tree) {
    if (tree.parent == null && tree.color == "R") {
        tree.color = "B";
        return tree;
    } else {
        return tree;
    }
}

function insertNullatAllNode(tree) {
    if(tree != null) {
        tree.color = null;
        insertNullatAllNode(tree.left);
        insertNullatAllNode(tree.right);
    }
}

/*Goodsを木に挿入する関数
 store：Goodsを挿入するStoreオブジェクト
 storename：Storeの名前
 storenumber：店の基本番号（商品番号に反映される）
 randnumber：乱数の基底
 correct：正しい順番で挿入するかどうか
 */
function CorrectInsertGoods(store, storename, storenumber, randnumber, correct){
    var insertOrder = new Array();
    if(correct){
        insertOrder = [1,4,5,2,7,8,3,6];
    } else {
        var sw = Math.floor(Math.random() * 4);
        if(sw == 0){
            insertOrder = [2,7,8,6,4,1,5,3];
        } else if(sw == 1){
            insertOrder = [6,7,8,2,1,3,4,5];
        } else if(sw == 2){
            insertOrder = [1,2,7,8,3,4,5,6];
        } else if(sw == 3){
            insertOrder = [1,2,7,6,8,4,3,5];
        }
    }
    for(var i = 0; i < 8; i++){
        addGoods(store, storename, storenumber * 100 + randnumber * insertOrder[i] + Math.floor(Math.random() * randnumber), Math.ceil(Math.random() * 10) * 108);
    }
}

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

var TestNodeNumber = 4;

var StoreNameList = [
    "Ikebukuro",
    "Takadanobaba",
    "Shinjuku",
    "Harajuku",
    "Shibuya",
    "Osaki",
    "Shinagawa",
    "Tokyo",
    "Akihabara",
    "Ueno",
    "Nippori"
];

shuffleArray(StoreNameList);

var str = null;
for(var i = 0; i < TestNodeNumber; i++){
    str = addStore(str, StoreNameList[i]);
}

var storenumberArray = [1,2,3,4,5,6,7,8,9];
shuffleArray(storenumberArray);

var uncorrectnumber = Math.floor(Math.random() * TestNodeNumber);

for(var i = 0; i < TestNodeNumber; i++){
    var bool = i != uncorrectnumber;
    CorrectInsertGoods(str, StoreNameList[i], storenumberArray[i], 10, bool);
    
}

str.insertNULL();
// IkebukuroGoods.length = 0;      //計算量を軽くするため（無意味？）
// Shibuya1Goods.length = 0;
// Shibuya2Goods.length = 0;
// TakadanobabaGoods.length = 0;
// IkebukuroGoods.length = 0;