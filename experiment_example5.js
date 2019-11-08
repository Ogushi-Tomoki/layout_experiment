class Store {
    constructor(name, adress){
        this.name = name;
        this.adress = adress;
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

function addStore(store, name, adress){
    var newstore = new Store(name, adress);
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
                store.next = addStore(store.next, name, adress);
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
                return addStore(store.prev, name, adress);
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

var str = null;
str = addStore(str, "Shinjuku", "shinjuku");
str = addStore(str, "Shibuya1", "shibuya");
str = addStore(str, "Shibuya2", "shibuya");
str = addStore(str, "Takadanobaba", "takadanobaba");
str = addStore(str, "Ikebukuro", "ikebukuro");

var IkebukuroGoods = [
    1001, 500,
    1002, 500,
    1003, 500,
    1004, 500,
    1005, 500,
    1006, 500,
    1007, 500,
    1008, 500
];

var Shibuya1Goods = [
    1301, 500,
    1304, 500,
    1305, 500,
    1302, 500,
    1307, 500,
    1308, 500,
    1303, 500,
    1306, 500
];

var Shibuya2Goods = [
    1401, 500,
    1404, 500,
    1405, 500,
    1407, 500,
    1408, 500,
    1402, 500,
    1406, 500,
    1403, 500
];

var ShinjukuGoods = [
    2002, 500,
    2007, 500,
    2008, 500,
    2006, 500,
    2004, 500,
    2001, 500,
    2005, 500,
    2003, 500
];

var TakadanobabaGoods = [
    2202, 500,
    2205, 500,
    2206, 500,
    2208, 500,
    2209, 500,
    2203, 500,
    2207, 500,
    2204, 500
];

for(var i = 0; i < 8; i++){
    addGoods(str, "Shinjuku", ShinjukuGoods[2 * i], ShinjukuGoods[2 * i + 1]);
    addGoods(str, "Shibuya1", Shibuya1Goods[2 * i], Shibuya1Goods[2 * i + 1]);
    addGoods(str, "Shibuya2", Shibuya2Goods[2 * i], Shibuya2Goods[2 * i + 1]);
    addGoods(str, "Takadanobaba", TakadanobabaGoods[2 * i], TakadanobabaGoods[2 * i + 1]);
    addGoods(str, "Ikebukuro", IkebukuroGoods[2 * i], IkebukuroGoods[2 * i + 1]);
}

str.insertNULL();
IkebukuroGoods.length = 0;      //計算量を軽くするため（無意味？）
Shibuya1Goods.length = 0;
Shibuya2Goods.length = 0;
TakadanobabaGoods.length = 0;
IkebukuroGoods.length = 0;