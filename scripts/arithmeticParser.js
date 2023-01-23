const parse = () => {
    const expressionNode = getUserAnswer();
    let errorNumber = checkValidity(expressionNode);
    const resultNode = document.getElementById('checkEQN');
    const result = splitPlus(expressionNode, '+');
    if (result == parseInt(document.querySelector('.result').innerHTML)) {
        resultNode.innerHTML = "That computes correctly, congrats!";
        startConfetti();
    } else if (isNaN(result)) {
        resultNode.innerHTML = "Try again! Error at tile number: " + (errorNumber + 1);
    } else {
        resultNode.innerHTML = "Sorry, but your equation makes " + result;
    }
};

const splitDiv = (expression) => {
    const numbersString = splitParan(expression, '/');
    const numbers = numbersString.map(noStr => {
        if (noStr[0] == '(') {
            const expr = noStr.substr(1, noStr.length - 2);
            return splitPlus(expr);
        }
        return +noStr;
    });
    const initialValue = numbers[0];
    const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
    return result;
};

const splitMult = (expression) => {
    const numbersString = splitParan(expression, '*');
    const numbers = numbersString.map(noStr => splitDiv(noStr));
    const initialValue = 1.0;
    const result = numbers.reduce((acc, no) => acc * no, initialValue);
    return result;
};

const splitMinus = (expression) => {
    const numbersString = splitParan(expression, '-');
    const numbers = numbersString.map(noStr => splitMult(noStr));
    const initialValue = numbers[0];
    const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
    return result;
};

const splitPlus = (expression) => {
    const numbersString = splitParan(expression, '+');
    const numbers = numbersString.map(noStr => splitMinus(noStr));
    const initialValue = 0.0;
    const result = numbers.reduce((acc, no) => acc + no, initialValue);
    return result;
};

const splitParan = (expression, operator) => {
    const result = [];
    let braces = 0;
    let currentChunk = "";
    for (let i = 0; i < expression.length; ++i) {
        const curCh = expression[i];
        if (curCh == '(') {
            braces++;
        } else if (curCh == ')') {
            braces--;
        }
        if (braces == 0 && operator == curCh) {
            result.push(currentChunk);
            currentChunk = "";
        } else currentChunk += curCh;
    }
    if (currentChunk != "") {
        result.push(currentChunk);
    }
    //console.log("SplitParan: " + result)
    return result;
};

function checkValidity(expression) {
    const operatorsStr = "+-*/()";
    const paranStr = "()";
    const numStr = "0123456789";
    var leftParan = 0;
    var rightParan = 0;
    for (var i = 0; i < expression.length; i++) {
        var c0 = expression.charAt(i).toString();
        var c1 = expression.charAt(i + 1).toString();

        if (expression[i] == "(") {
            leftParan++;
        } else if (expression[i] == ")") {
            rightParan++;
        } else if (paranStr.includes(c1)) {
            //console.log("Paran found at i + 1 (" + i + ")");
        } else if ((numStr.includes(c0) && !operatorsStr.includes(c1)) || (!numStr.includes(c1) && operatorsStr.includes(c0))) {
            //console.log("big dummy c0: " + c0 + " c1: " + c1)
            return i + 1;
        } else if (i == (expression.length - 1)) {

        }
    }
    if (leftParan > rightParan) {
        //console.log("Left paran bigger");
        return expression.split("(", leftParan).join("(").length;
    } else if (rightParan > leftParan) {
        //console.log("Right paran bigger");
        return expression.split(")", rightParan).join(")").length;
    } else {
        return -1;
    }
}