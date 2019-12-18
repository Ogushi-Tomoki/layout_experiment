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
                    } else if(val.length == 1){
                        this.mid = new END();
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

class END {}

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

//https://randomwordgenerator.com/から英単語をランダムに30個生成（5文字以内に限定）
var RandomWords = [
    "era",
    "peak",
    "jaw",
    "pill",
    "slow",
    "bland",
    "safe",
    "fire",
    "frog",
    "sip",
    "army",
    "shark",
    "belt",
    "hover",
    "girl",
    "water",
    "bald",
    "tap",
    "paper",
    "stage",
    "west",
    "abbey",
    "boot",
    "roll",
    "blade",
    "cater",
    "duke",
    "miss",
    "means",
    "bean"
];

var randomlength = RandomWords.length;

//filter-yates shuffleアルゴリズムを利用して配列をシャッフル
while(randomlength) {
    var j = Math.floor(Math.random() * randomlength);
    var t = RandomWords[--randomlength];
    RandomWords[randomlength] = RandomWords[j];
    RandomWords[j] = t;
}

var trie = new Node(RandomWords[0].slice(0, 1));
for(var i = 0; i < 5; i++){
    trie.add(RandomWords[i]);
}

RandomWords.length = 0;