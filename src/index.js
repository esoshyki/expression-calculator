function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let res;

    const del_spaces = (ex) => ex.replace(' ', '');

    const simple = (expr) => {
        const div = (ex) => ex.toString().split('/').reduce((a,b) => {
            if (parseFloat(b) === 0) throw "TypeError: Devision by zero."
            return parseFloat(a)/parseFloat(b) 
        })
    
        const mul = (ex) => ex.toString().split('*').length > 1 ? ex.toString().split('*')
                            .reduce((a,b) => parseFloat(div(a))*parseFloat(div(b))) : div(ex);
    
        const sub = (ex) => ex.toString().split('&').length > 1 ? ex.toString().split('&')
                            .reduce((a,b)=> parseFloat(mul(a))-parseFloat(mul(b))) : mul(ex);
    
        const sum = (ex) => ex.toString().split('+').length > 1 ? ex.toString().split('+')
                            .reduce((a,b) => parseFloat(sub(a))+parseFloat(sub(b))) : sub(ex);
        return sum(expr)
    }

    const bracket_check = (ex) => {
        if (ex.indexOf('(') > ex.indexOf(')')) { throw "ExpressionError: Brackets must be paired"};
        if (ex.indexOf('(') >= 0 && ex.indexOf(')') < 0) { throw "ExpressionError: Brackets must be paired"};     
        if (ex.indexOf(')') >= 0 && ex.indexOf('(') < 0) { throw "ExpressionError: Brackets must be paired"};   
        if (ex.indexOf('(') < 0 && ex.indexOf(')') < 0) {
            return false
        }
        if (ex.indexOf('(') >= 0 && ex.indexOf(')') >= 0) {
            return true
        }
}

    
    const slice_string = (str, len) => {
        let start_pad = str.lastIndexOf('(');
        let substr = str.slice(start_pad, len);
        let end_pad = substr.indexOf(')');
        let pad = str.slice(start_pad +1, start_pad + end_pad);
        let time_string = str.replace(`(${pad})`, simple(pad).toString())
        if (bracket_check(time_string)) {
            return slice_string(time_string, time_string.length)
        }
        else {
            return simple(time_string)
        }
    }
    let str = del_spaces(expr.replace(/-/g,'&'))
    let len = str.length
    res = bracket_check(str) ? slice_string(str, len) : simple(str);
    return res
}

module.exports = {
    expressionCalculator
}