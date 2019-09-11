class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.mid = null;
        this.right = null;
    }
    
    add(val){
        if(val.length > 0){
            let top = val.slice(0, 1);
            if(alphabetSort(this.val, top) == 0){
                if(this.mid == null){
                    if(val.length > 1){
                        let temp = new Node(val.slice(1, 2));
                        this.mid = temp;
                        temp.add(val.slice(1));
                    }
                } else {
                    this.mid.add(val.slice(1));
                }
            } else if(alphabetSort(this.val, top) == -1){
                if(this.left == null){
                    let temp = new Node(val.slice(0, 1));
                    this.left = temp;
                    temp.add(val);
                } else {
                    this.left.add(val);
                }
            } else if(alphabetSort(this.val, top) == 1){
                if(this.right == null){
                    let temp = new Node(val.slice(0, 1));
                    this.right = temp;
                    temp.add(val);
                } else {
                    this.right.add(val);
                }
            }
        }
    }
}

function alphabetSort(a, b) {
    var astr = a.slice(0, 1).toString().toLowerCase();
    var bstr = b.slice(0, 1).toString().toLowerCase();

    if (astr < bstr) {
        return 1;
    } else if (astr > bstr) {
        return -1;
    } else {
        return 0;
    }
}

//http://watchout4snakes.com/wo4snakes/Random/RandomWordから英単語をランダムに30個生成
var RandomWords = [
    "holding",
    "port",
    "resume",
    "characteristic",
    "reaction",
    "newcomer",
    "consent",
    "sinking",
    "sale",
    "adviser",
    "earth",
    "dependant",
    "foul",
    "issue",
    "hook",
    "quote",
    "contribution",
    "vandalism",
    "something",
    "sheer",
    "banning",
    "reflex",
    "funeral",
    "tray",
    "counterpart",
    "museum",
    "quiet",
    "bundle",
    "column",
    "spot"
];

var randomlength = RandomWords.length;

//filter-yates shuffleアルゴリズムを利用して配列をシャッフル
while(randomlength) {
    var j = Math.floor(Math.random() * randomlength);
    var t = RandomWords[--randomlength];
    RandomWords[randomlength] = RandomWords[j];
    RandomWords[j] = t;
}

var trie = new Node("c");
for(var i = 0; i < 10; i++){
    trie.add(RandomWords[i]);
}

RandomWords.length = 0;