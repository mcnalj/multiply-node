import {
    getRandomIntInclusive,
    getReducedFraction,
    getMixOfCoefficients,
  } from './utilities-scripts.js';

function naturalExponential() {
    // works as of 10/28 - except if a fraction reduces to 1 it expects a 1 as the coefficient
    // create an array of acceptable answers
    let termInteger, termNumerator, termDenominator, termIsFraction, termIsNegative;
    let coefficientInteger, coefficientNumerator, coefficientDenominator, coefficientIsFraction, coefficientIsNegative;
    let answerLatexArray = [];
    let exponentVariableTerm = `x`;
    let termCoefficient = "";
    let coefficient = "";
    let termCoefficientPick = getRandomIntInclusive(1, 4);
    if(termCoefficientPick === 1) {
        termCoefficient = "";
    } else {
        [termInteger, termNumerator, termDenominator, termIsFraction, termIsNegative] = getMixOfCoefficients();
        if (termIsFraction) {
            termCoefficient = `\\frac{${termNumerator}}{${termDenominator}}`;
        } else {
            termCoefficient = termInteger;
        }
        if (termIsNegative) {
            termCoefficient = `-${termCoefficient}`
        }
    }   
    let coefficientPick = getRandomIntInclusive(1, 4);
    if (coefficientPick === 1) {
        coefficient = "";
    } else {
        [coefficientInteger, coefficientNumerator, coefficientDenominator, coefficientIsFraction, coefficientIsNegative] = getMixOfCoefficients();
        if (coefficientIsFraction) {
            coefficient = `\\frac{${coefficientNumerator}}{${coefficientDenominator}}`;
        } else {
            coefficient = `${coefficientInteger}`;
        }
        if (coefficientIsNegative) {
            coefficient = `-${coefficient}`
        }
    }
    let exponentialTerm = "e^x"
    if (termCoefficient) {
        exponentialTerm = `e^{${termCoefficient}${exponentVariableTerm}}`
    }
    let questionLatex = `${coefficient}${exponentialTerm}`;
    let answerCoefficientInteger, answerCoefficientNumerator, answerCoefficientDenominator;
    let answerLatex = "";
    if ( termCoefficient && coefficient ) {
        if (termIsFraction && coefficientIsFraction) {
            [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(termNumerator*coefficientNumerator, termDenominator*coefficientDenominator)
            if (answerCoefficientDenominator > 1) {
            answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}`;
            } else {
                answerLatex = `${answerCoefficientNumerator}`;
            }
        } else if (termIsFraction) {
            [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(termNumerator*coefficientInteger, termDenominator)
            if (answerCoefficientDenominator > 1) {
                answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}`;
            } else {
                answerLatex = `${answerCoefficientNumerator}`;
            }
        } else if (coefficientIsFraction) {
            [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(termInteger*coefficientNumerator, coefficientDenominator)
            if (answerCoefficientDenominator > 1) {
                answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}`;
            } else {
                answerLatex = `${answerCoefficientNumerator}`;
            }
        } else {
            answerCoefficientInteger = termInteger * coefficientInteger
            answerLatex = `${answerCoefficientInteger}`;
        }
    } else if (termCoefficient) {
        if (termIsFraction) {
            answerLatex = `\\frac{${termNumerator}}{${termDenominator}}`;
        } else {
            answerLatex = `${termInteger}`;
        }
    } else if (coefficient) {
        if (coefficientIsFraction) {
            answerLatex = `\\frac{${coefficientNumerator}}{${coefficientDenominator}}`;
        } else {
            answerLatex = `${coefficientInteger}`;
        }
    } else {
        answerLatex = '';
    }
    answerLatex = `${answerLatex}${exponentialTerm}`;
    if ((termIsNegative && !coefficientIsNegative) || (!termIsNegative && coefficientIsNegative)) {
        answerLatex = `-${answerLatex}`;
    }
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}

function complexNaturalExponential() {

}

function simpleNaturalLog() {
    let choice = getRandomIntInclusive(1, 100)
    let questionLatex = '';
    let answerLatexArray = [];
    if (choice < 5) {
        [questionLatex, answerLatexArray] = constantLog();
    } else if (choice < 30) {
        [questionLatex, answerLatexArray] = coefficientLog();
    } else {
        [questionLatex, answerLatexArray] = exponentLog();
    } 
    return [questionLatex, answerLatexArray];
}

function constantLog() {
    let questionLatex = '';
    let answerLatex = '';
    let answerLatexArray = [];
    let constant = getRandomIntInclusive(1, 9);
    questionLatex = `\\ln${constant}`;
    answerLatex = '0';
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray]
}

function coefficientLog() {
    let questionLatex = '';
    let answerLatex = '';
    let answerLatexArray = [];
    let [integer, numerator, denominator, isFraction, isNegative] = getMixOfCoefficients(2,9,1,7,2,9,30,0);
    if (isFraction) {
        questionLatex = `\\ln\\frac{${numerator}}{${denominator}}x`;
        answerLatex = `\\frac{1}{x}`;
        answerLatexArray.push(answerLatex);
    } else {
        questionLatex = `\\ln${integer}x`;
        answerLatex = `\\frac{1}{x}`;
        answerLatexArray.push(answerLatex);
    }
    return [questionLatex, answerLatexArray]
}

function exponentLog() {
    let questionLatex = '';
    let answerLatex = '';
    let answerLatexArray = [];
    let mix = getRandomIntInclusive(1,4);
    if (mix === 1) {
        let exponent = getRandomIntInclusive(2, 6);
        questionLatex = `\\ln x^${exponent}`;
        answerLatex = `\\frac{${exponent}}{x}`;
        answerLatexArray.push(answerLatex);
    } else {
        let exponent = getRandomIntInclusive(2, 6);
        let [integer, numerator, denominator, isFraction, isNegative] = getMixOfCoefficients(2,9,1,7,2,9,30,0);
        if (isFraction) {
            questionLatex = `\\ln\\frac{${numerator}}{${denominator}}x^${exponent}`;
        } else {
            questionLatex = `\\ln${integer}x^${exponent}`;
        }
        answerLatex = `\\frac{${exponent}}{x}`;
        answerLatexArray.push(answerLatex);
    }
    return [questionLatex, answerLatexArray]
}

function binomialNaturalLog() {
    let questionLatex = "";
    let answerLatex = "";
    let answerLatexArray = [];
    let exponent = getRandomIntInclusive(1, 5);
    let secondTerm = getRandomIntInclusive(1, 9);
    let choice = getRandomIntInclusive(1,4);
    if (choice === 1) {
        if (exponent === 1) {
            questionLatex = `\\ln (x+${secondTerm})`;
            answerLatex = `\\frac{1}{x+${secondTerm}}`;
        } else {
            let newExponent = exponent -1;
            let newCoefficient = exponent;
            questionLatex = `\\ln (x^${exponent}+${secondTerm})`;
            if (newExponent === 1) {
                answerLatex = `\\frac{${newCoefficient}x}{x^${exponent}+${secondTerm}}`;    
            } else {
                answerLatex = `\\frac{${newCoefficient}x^${newExponent}}{x^${exponent}+${secondTerm}}`;
            }            
        }
    } else {
        let [coefficient, numerator, denominator, isFraction, isNegative] = getMixOfCoefficients(2, 9, 1, 5, 2, 9, 25, 0);
        if (exponent === 1) {
            if (isFraction) {
                questionLatex = `\\ln (\\frac{${numerator}}{${denominator}}x + ${secondTerm})`;
                answerLatex = `\\frac{\\frac{${numerator}}{${denominator}}{\\frac{${numerator}}{${denominator}}x + ${secondTerm}}`;
            } else {
                questionLatex = `\\ln (${coefficient}x+${secondTerm})`;
                answerLatex = `\\frac{${coefficient}}{${coefficient}x+${secondTerm}}`;
            }

        } else {
            let newExponent = "";
            let newCoefficient = coefficient*exponent
            // if (isFraction) {
            //     questionLatex = `\\ln (\\frac{${numerator}}{${denominator}}x^${exponent} + ${secondTerm})`;
            //     answerLatex = `\\frac{${exponent}}{\\frac{${numerator}{${denominator}}x^${exponent} + ${secondTerm}}`;    
            // } else {
            //     questionLatex = `\\ln (${coefficient}x^${exponent} + ${secondTerm})`;
            //     newExponent = exponent > 2 ? exponent -1 : newExponent;
            //     answerLatex = `\\frac{${exponent}x^${newExponent}}{${coefficient}x^${exponent} + ${secondTerm}}`;    
            // }
                questionLatex = `\\ln (${coefficient}x^${exponent}+${secondTerm})`;
                newExponent = exponent > 2 ? exponent -1 : newExponent;
                answerLatex = `\\frac{${newCoefficient}x^${newExponent}}{${coefficient}x^${exponent}+${secondTerm}}`;    
        }
    }
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}


function complexNaturalLog() {
    let [questionLatex, answerLatexArray] = binomialNaturalLog();
    return [questionLatex, answerLatexArray];
}

function mixNaturalExponentialAndLog() {

}

function exponentialFunctionsBaseA() {
    // Should I add questions where there's an coefficient and and exponent on the x?
    let questionLatex = "";
    let answerLatexArray = [];
    let type = getRandomIntInclusive(1, 5);
    if (type < 4) {
        [questionLatex, answerLatexArray] = exponentialFunctionsBaseASimpleX();
    } else if (type < 5) {
        [questionLatex, answerLatexArray] = exponentialFunctionsBaseACoefficientX();
    } else {
        [questionLatex, answerLatexArray] = exponentialFunctionsBaseAExponentX();
    }
    return [questionLatex, answerLatexArray];
}

function exponentialFunctionsBaseASimpleX() {
    let answerLatexArray = [];
    let base = getRandomIntInclusive(2, 9)
    let questionLatex = `${base}^x`;
    let answerLatex = `(\\ln${base})${questionLatex}`;
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}

function exponentialFunctionsBaseACoefficientX() {
    let answerLatexArray = [];
    let base = getRandomIntInclusive(2, 9);
    let coefficient = getRandomIntInclusive(2, 9);
    let questionLatex = `${base}^{${coefficient}x}`;
    let answerLatex = `(${coefficient}\\ln${base})${questionLatex}`;
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}

function exponentialFunctionsBaseAExponentX() {
    let answerLatexArray = [];
    let base = getRandomIntInclusive(2, 9);
    let exponent = getRandomIntInclusive(2, 4);
    let questionLatex = `${base}^{x^${exponent}}`;
    let answerLatex = "";
    if (exponent === 2) {
        answerLatex = `(${exponent}\\ln${base})x${questionLatex}`;
    } else {
        let newExponent = exponent - 1;
        answerLatex = `(${exponent}\\ln${base})x^${newExponent}${questionLatex}`;
    }
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}

function logFunctionsBaseA() {
    let answerLatexArray = [];
    let exponent = getRandomIntInclusive(2, 9)
    let questionLatex = `\\log_${exponent}x`;
    let answerLatex = `\\frac{1}{(\\ln${exponent})x}`;
    answerLatexArray.push(answerLatex);
    return [questionLatex, answerLatexArray];
}



export {
    naturalExponential,
    complexNaturalExponential,
    simpleNaturalLog,
    complexNaturalLog,
    mixNaturalExponentialAndLog,
    exponentialFunctionsBaseA,
    logFunctionsBaseA,
}