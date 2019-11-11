function varChange(a){
    a = 5;
    return;
}
var a = 3;
varChange(a);       //aの値は書き換えられない（3のまま）
alert(a);


function arrayChange(b){
    b[0] = 5;
    return;
}
var b = [3];
arrayChange(b);     //b[0]の値は書き換えられる（5になる）
alert(b[0]);