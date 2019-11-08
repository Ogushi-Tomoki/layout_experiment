class UnionFind {
    constructor(n){
        this.val = n;
        this.children = new Array();
        this.parent = null;
    }

    addParent(par){
        if(this.parent != null){
            var index = this.parent.children.indexOf(this);
            this.parent.children.splice(index, 1);
        }
        this.parent = par;
        par.children.push(this);
    }
}

function root(x){
    if(x.parent == null){
        return x;
    } else {
        var rx = root(x.parent);
        x.addParent(rx);
        return rx;
    }
}

function unite(x, y){
    var rx = root(x);
    var ry = root(y);
    if(rx == ry){
        return;
    } else {
        rx.addParent(ry);
    }
}

function same(x, y){
    var rx = root(x);
    var ry = root(y);
    return rx == ry;
}

// class UnionFindList {
//     constructor(){
//         this.val = null;
//         this.tree = null;
//         this.next = null;
//         this.prev = null;
//     }

//     addTree(tree){
//         if(tree.parent == null){
//             this.tree = tree;
//             this.val = tree.val;
//         }
//     }

//     addNext(next){
//         if(this.next == null){
//             this.next = next;
//             next.prev = this;
//         } else {
//             this.next.addNext(next);
//         }
//     }
// }

var N = 10;
var M = 8;
var INPUT_P = [5,3,6,8,7,10,9,1,2,4];
var INPUT_X = [3,4,5,2,6,3,8,7];
var INPUT_Y = [1,1,9,5,5,5,9,9];

// var ufl = new UnionFindList();
// for(var i = 1; i < 3; i++){
//     var uflnode = new UnionFindList();
//     ufl.addNext(uflnode);
// }

var ufarray = new Array(N);
for(var i = 0; i < N; i++){
    ufarray[i] = new UnionFind(i);
}

for(var i = 0; i < N; i++){
    unite(ufarray[INPUT_X[i] - 1], ufarray[INPUT_Y[i] - 1]);
}

var cnt = 0;
for(var i = 0; i < N; i++){
    if(same(ufarray[i], ufarray[INPUT_P[i] - 1])){
        cnt++;
    }
}
alert(cnt);