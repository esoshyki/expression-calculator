function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const isBracketIn = str => str.search(/[()]/) >= 0;

    const simple = (expr) => {

        const str = expr[0] === '&' ? '0 ' + expr : expr
        console.log(str)

        if (isBracketIn(str)) throw "ExpressionError: Brackets must be paired"

        const div = (ex) => ex.toString().split('/').reduce((a,b) => {
            if (parseFloat(b) === 0) throw "TypeError: Division by zero."
            return parseFloat(a)/parseFloat(b) 
        })
  
        const mul = (ex) => ex.toString().split('*').length > 1 ? ex.toString().split('*')
                            .reduce((a,b) => parseFloat(div(a))*parseFloat(div(b))) : div(ex);
    
        const sub = (ex) => ex.toString().split('&').length > 1 ? ex.toString().split('&')
                            .reduce((a,b)=> parseFloat(mul(a))-parseFloat(mul(b))) : mul(ex);
    
        const sum = (ex) => ex.toString().split('+').length > 1 ? ex.toString().split('+')
                            .reduce((a,b) => parseFloat(sub(a))+parseFloat(sub(b))) : sub(ex);
        return sum(str.split(' ').join(''))
    }

    const getOutBrackets = str => str.replace('( ', '').replace(' )', '');
    
    const slice_string = str => {

        const bracketsArray = str.match(/\([^()]+\)/g);

        if (!bracketsArray) return simple(str)

        const newString = bracketsArray.reduce((acc, cur) => {
            const result = simple(getOutBrackets(cur))
            return acc.replace(cur, result.toString())
        }, str)

        return slice_string(newString)
    }

    return slice_string(expr.replace(/-/g, '&'))
}


const ex = "-1 + 2 * 3"

console.log(expressionCalculator(ex))

module.exports = {
    expressionCalculator
}