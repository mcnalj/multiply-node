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

}

function complexNaturalLog() {

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