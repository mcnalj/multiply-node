import {
    getSimplifiedFraction,
    getRandomIntInclusive,
    generateReducedFraction,
    maybeNegativeCoefficient,
    maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
    applyRegexFixes,
    getReducedFraction,
    findGreatestCommonFactor,
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
        console.log("got to both terms have coefficients");
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
            console.log("Got to have coefficients and neither is a fraction")
            answerCoefficientInteger = termInteger * coefficientInteger
            answerLatex = `${answerCoefficientInteger}`;
        }
    } else if (termCoefficient) {
        console.log("Got to term coefficient only")
        if (termIsFraction) {
            answerLatex = `\\frac{${termNumerator}}{${termDenominator}}`;
        } else {
            answerLatex = `${termInteger}`;
        }
    } else if (coefficient) {
        console.log("got to exponent coefficient only")
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
    if (mix == 1) {
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
    console.log("In binomial natural log")
    let questionLatex = "";
    let answerLatex = "";
    let answerLatexArray = [];
    let exponent = getRandomIntInclusive(1, 5);
    let secondTerm = getRandomIntInclusive(1, 9);
    let choice = getRandomIntInclusive(1,4);
    if (choice == 1) {
        if (exponent == 1) {
            questionLatex = `\\ln (x+${secondTerm})`;
            console.log(questionLatex);
            answerLatex = `\\frac{1}{x+${secondTerm}}`;
        } else {
            let newExponent = exponent -1;
            let newCoefficient = exponent;
            questionLatex = `\\ln (x^${exponent}+${secondTerm})`;
            answerLatex = `\\frac{${newCoefficient}x^${newExponent}}{x^${exponent}+${secondTerm}}`;
        }
    } else {
        console.log("In choice 2")
        let [coefficient, numerator, denominator, isFraction, isNegative] = getMixOfCoefficients(2, 9, 1, 5, 2, 9, 25, 0);
        if (exponent == 1) {
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
    console.log(questionLatex)
    return [questionLatex, answerLatexArray];
}


function complexNaturalLog() {
    let [questionLatex, answerLatexArray] = binomialNaturalLog();
    console.log("In complexNaturalLog");
    console.log(questionLatex);
    return [questionLatex, answerLatexArray];

}

function mixNaturalExponentialAndLog() {

}

export {
    naturalExponential,
    complexNaturalExponential,
    simpleNaturalLog,
    complexNaturalLog,
    mixNaturalExponentialAndLog
}