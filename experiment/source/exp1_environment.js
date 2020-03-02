/*　環境構築　*/

function lexer(code){
    return code
            .replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .replace(/\,/g, ' , ')
            .replace(/\-/g, ' - ')
            .replace(/\=/g, ' = ')
            .split(/[\s\n]+/)
            .filter(function (t){return t.length > 0;})
            .map(function (t){
                if(!isNaN(t)){
                    return {type: 'number', value: new const_exp(t)};
                } else {
                    switch(t){
                        case 'let':
                            return {type: 'let', value: t};
                        case 'in':
                            return {type: 'in', value: t};
                        case '=':
                            return {type: 'assignment', value: t};
                        // case 'proc':
                        //     return {type: 'procedure', value: t};
                        case '(':
                            return {type: 'parenthesis-open', value: t};
                        case ')':
                            return {type: 'parenthesis-close', value: t};
                        case '-':
                            return {type: 'subtraction', value: t};
                        case ',':
                            return {type: 'comma', value: t};
                        default:
                            return {type: 'word', value: new var_exp(t)};
                    }
                }
            });
}

function parser(tokens){
    var AST = {
        type: 'code', 
        exp: [], 
        env: null
    }

    while(tokens.length > 0){
        var current_token = tokens.shift();

        if(current_token.type === 'let'){
            if(tokens[0].type === 'word' && 
            tokens[1].type === 'assignment' && 
            (tokens[2].type === 'number' || tokens[2].type === 'word') && 
            tokens[3].type === 'in'){
                AST.env = extend_env(tokens[0].value, tokens[2].value, AST.env);
                tokens.splice(0, 4);
            } else {
                throw 'syntax is not correct.';
            }
        } else if(current_token.type === 'subtraction'){
            if(tokens[0].type === 'parenthesis-open' && 
            (tokens[1].type === 'word' || tokens[1].type === 'number') && 
            tokens[2].type === 'comma' && 
            (tokens[3].type === 'word' || tokens[3].type === 'number') && 
            tokens[4].type === 'parenthesis-close'){
                AST.exp = new diff_exp(tokens[1].value, tokens[3].value);
                tokens.splice(0, 5);
            } else {
                throw 'syntax is not correct.';
            }
        }
    }
    return AST;
}

function generator(ast){
    return ast.exp.value_of(ast.env);
}

function run(code){
    return generator(parser(lexer(code)));
}

class Environment {
    constructor(Var, Val, Env) {
        this.Var = Var;
        this.Val = Val;
        this.Env = Env;
    }
}

class const_exp {
    constructor(num){
        this.num = num;
    }

    value_of(Env){
        return this.num;
    }
}

class var_exp {
    constructor(Var){
        this.var = Var;
    }

    value_of(Env){
        return apply_env(Env, this.var);
    }
}

class diff_exp {
    constructor(exp1, exp2){
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    value_of(Env){
        var exp1val = this.exp1.value_of(Env);
        var exp2val = this.exp2.value_of(Env);
        return exp1val - exp2val;
    }
}

function extend_env(Var, Val , Env) {
    var variable = Var.var;
    var value = Val.num;
    var newenv = new Environment(variable, value, Env);
    return newenv;
}

function apply_env(Env, Var)  {
    if(Env == null){
        throw 'undefined variable exists.'
    } else if (Env.Var == Var) {
        return Env.Val;
    } else {
        return apply_env(Env.Env, Var);
    }
}

var samplecode = "let a = 4\nin let b = 7\nin -(b, a)";

var AST = parser(lexer(samplecode));
console.log(samplecode);
console.log(AST);
console.log(generator(AST));