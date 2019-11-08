class StudentCouncilPresident {
    constructor(familyname, firstname) {
        this.familyname = familyname;
        this.firstname = firstname;
        this.students = null;
        this.nextSchool = null;
        this.prevSchool = null;
    }

    addSchool(newSchool) {
        if(this.nextSchool == null) {
            this.nextSchool = newSchool;
            newSchool.prevSchool = this;
        } else {
            this.nextSchool.addSchool(newSchool);
        }
    }

    addMembers(members) {
        this.students = members;
        members.parent = this;
    }
}

class Members {
    constructor(familyname, firstname, color, left, right, parent) {
        this.familyname = familyname;
        this.firstname = firstname;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent =parent;
    }
}

//以下、赤黒木の実装に必要な関数

    function isR(member) {
        if (member == null) return false;
        else return member.color == "R";
    }

    function isB(member) {
        if (member == null) return false;
        else return member.color == "B";
    }

    function rotateL(members) {
        var u = members.right;
        u.parent = members.parent;
        var v = u.left;
        members.right = v;
        if (v != null) v.parent = members;
        u.left = members;
        members.parent = u;
        return u;
    }

    function rotateR(members) {
        var u = members.left;
        u.parent = members.parent;
        var v = u.right;
        members.left = v;
        if (v != null) v.parent = members;
        u.right = members;
        members.parent = u;
        return u;
    }

    function rotateLR(members) {
        members.left = rotateL(members.left);
        return rotateR(members);
    }

    function rotateRL(members) {
        members.right = rotateR(members.right);
        return rotateL(members);
    }

    function insert(members, familyname, firstname) {
        if (members == null) {
            var newmembers = new Members(familyname, firstname, "B", null, null, null);
            return newmembers;
        } else if (familyname < members.familyname) {
            if (members.left == null) {
                var newmembers = new Members(familyname, firstname, "R", null, null, members);
                members.left = newmembers;
                return balance(members);
            } else {
                members.left = insert(members.left, familyname, firstname);
                return balance(members);
            }
        } else if (familyname > members.familyname) {
            if (members.right == null) {
                var newmembers = new Members(familyname, firstname, "R", null, null, members);
                members.right = newmembers;
                return balance(members);
            } else {
                members.right = insert(members.right, familyname, firstname);
                return balance(members);
            }
        } else if (firstname < members.firstname) {
            if (members.left == null) {
                var newmembers = new Members(familyname, firstname, "R", null, null, members);
                members.left = newmembers;
                return balance(members);
            } else {
                members.left = insert(members.left, familyname, firstname);
                return balance(members);
            }
        } else {
            if (members.right == null) {
                var newmembers = new Members(familyname, firstname, "R", null, null, members);
                members.right = newmembers;
                return balance(members);
            } else {
                members.right = insert(members.right, familyname, firstname);
                return balance(members);
            }
        }
    }

    //xの木をyの木に合併させる。木を破壊的に書き替える。
    function insertTree(x, y) {
        if(x != null) {
            var newTree = insertTree(x.left, y);
            newTree = insertTree(x.right, newTree);
            return insert(newTree, x.familyname, x.firstname);
        } else {
            return y;
        }
    }

    function balance(members) {
        if (isR(members) && members.parent != null) {
            return members;
        } else if (isR(members.left) && isR(members.left.left)) {
            var newmembers = rotateR(members);
            newmembers.left.color = "B";
            return isRootBlack(newmembers);
        } else if (isR(members.right) && isR(members.right.right)) {
            var newmembers = rotateL(members);
            newmembers.right.color = "B";
            return isRootBlack(newmembers);
        } else if (isR(members.left) && isR(members.left.right)) {
            var newmembers = rotateLR(members);
            newmembers.left.color = "B";
            return isRootBlack(newmembers);
        } else if (isR(members.right) && isR(members.right.left)) {
            var newmembers = rotateRL(members);
            newmembers.right.color = "B";
            return isRootBlack(newmembers);
        } else {
            return isRootBlack(members);
        }
    }

    function isRootBlack(members) {
        if (members.parent == null && members.color == "R") {
            members.color = "B";
            return members;
        } else {
            return members;
        }
    }

    function insertNullatAllNode(members) {
        if(members != null) {
            members.color = null;
            insertNullatAllNode(members.left);
            insertNullatAllNode(members.right);
        }
    }

//生成されたオブジェクトからクラス名を返す
function getClassName(object) {
    return object.constructor.toString().match(/[^\s]+/g)[1];
}

//与えられたmemberが所属する木の根（学校の生徒会長）を得る
function root(member) {
    if(getClassName(member) == "StudentCouncilPresident") {
        return member;
    } else if(member.parent != null) {
        return root(member.parent);
    } else {
        return null;
    }
}

//xとyの木（2つの学校）を併合
function unite(x, y) {
    var rx = root(x);
    var ry = root(y);
    if(rx == ry) {
        return;
    } else {
        return insertTree(x, y);
    }
}

//2つのデータx,yが属する木が同じならtrueを返す
function same(x, y) {
    var rx = root(x);
    var ry = root(y);
    return rx == ry;
}

//https://namegen.jp/から、男性の名前30人分と女性の名前30人分をランダムに生成
var MenNameList = [
    // "いのうえ きよし",
    // "まつもと ひでゆき",
    // "くぼ たくや",
    // "しみず さとし",
    // "かみや だいすけ",
    // "みなみ たけし",
    // "かわさき つかさ",
    // "ながい まさあき",
    // "にしだ しげき",
    // "ふくなが けんたろう",
    // "ながた だいき",
    // "もちづき しんや",
    // "かめい ひでき",
    // "いわさき たかゆき",
    // "ふるや けんいち",
    // "くどう かずお",
    // "まつむら たくや",
    // "むらやま よういち",
    // "よしざわ りょうた",
    // "よしい けんじ",
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
    // "すぎた じゅんこ",
    // "みずかみ ゆうこ",
    // "いいづか かずみ",
    // "はら けいこ",
    // "あきもと みき",
    // "よしかわ なおこ",
    // "やまざき のぞみ",
    // "つつみ しほ",
    // "おおうち あやの",
    // "かしわぎ れいこ",
    // "よしなが あやか",
    // "しまだ りな",
    // "あべ まりな",
    // "ごとう えりか",
    // "かわしま さちこ",
    // "のぐち みき",
    // "やなぎ ゆか",
    // "かわはら ひろこ",
    // "きむ みのり",
    // "いわもと むつみ",
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

var MenSchoolMembers = null;
var MenSchool = new StudentCouncilPresident("やまぐち", "たいよう");
for(var i = 0; i < MenNameList.length; i++) {
    var str = MenNameList[i];
    var re = /[^\s]+/g;
    var match = str.match(re);
    MenSchoolMembers = insert(MenSchoolMembers, match[0], match[1]);
}
insertNullatAllNode(MenSchoolMembers);
MenSchool.addMembers(MenSchoolMembers);

var WomenSchoolMembers = null;
var WomenSchool = new StudentCouncilPresident("よしだ", "たかこ");
for(var i = 0; i < WomenNameList.length; i++) {
    var str = MenNameList[i];
    var re = /[^\s]+/g;
    var match = str.match(re);
    WomenSchoolMembers = insert(WomenSchoolMembers, match[0], match[1]);
}
insertNullatAllNode(WomenSchoolMembers);
WomenSchool.addMembers(WomenSchoolMembers);

MenSchool.addSchool(WomenSchool);