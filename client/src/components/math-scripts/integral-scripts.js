import {
    getSimplifiedFraction,
    getRandomIntInclusive,
    generateReducedFraction,
    getReducedFraction,
    maybeNegativeCoefficient,
    maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
    applyRegexFixes,
    getReducedFraction,
    findGreatestCommonFactor
  } from './utilities-scripts.js';

function constantAntiderivative(minCoefficient=1, maxCoefficient=9) {
  let answerLatexArray = [];
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let questionLatex = `${coefficient} \\; dx`;
  let answerLatex = `${coefficient} \\; + \\; C`;
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}  
  
function xTermAntiderivative(minCoefficient = 1, maxCoefficient = 9) {
  let answerLatexArray = [];
  let questionLatex = ``;
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  if (coefficient > 1) {
    questionLatex = `${coefficient}x \\; dx`;
  } else {
    questionLatex = `x \\; dx`;
  }
  [numerator, denominator] = getReducedFraction(coefficient, 2);
  let answerLatex = `\\frac{${numerator}}{${denominator}}x^2 \\; + \\; C`;
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}  

function singleTermAntiderivative(minExponent=2, maxExponent=8) {
  let answerLatexArray = []
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let increasedExponent = exponent + 1;
  let questionLatex = `x^${exponent} \\; dx`;
  let answerLatex = `\\frac{1}{${increasedExponent}}x^${increasedExponent} \\; + \\; C`;
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function singleTermAntiderivativeWithCoefficients(minCoefficient = 2, maxCoefficient = 9, allowNegativeCoefficient = "true", minExponent=2, maxExponent=8) {
  let answerLatexArray = []
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let increasedExponent = exponent + 1;
  let questionLatex = `${coefficient}x^${exponent} \\; dx`;
  let answerLatex = ``;
  if (coeffcient == increasedExponent) {
    answerLatex = `x^${increasedExponent} \\; + \\; C`;  
  } else {
    let [numerator, denominator] = getReducedFraction(coefficient, increasedExponent);
    answerLatex = `\\frac{${numerator}}{${denominator}}x^${increasedExponent} \\; + \\; C`;
  }
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function getMixAntiderivatives(percentConstant=10, percentX=20, percentTermWithCoefficient=50, percentTermNoCoefficient=20) {
  let choice = getRandomIntInclusive(1, 100);
  if (choice <= percentConstant) {
    return constantAntiderivative();
  } else if (choice <= (percentConstant + percentX)) {
    return xTermAntiderivative();
  } else if (choice <= percentTermWithCoefficient) {
    return singleTermAntiderivativeWithCoefficients();
  } else {
    return singleTermAntiderivative();
  }
}


function binomialAntiderivative() {
  let answerLatexArray = [];
  let term1Latex = ``;
  let answerLatexArrayOne = [];
  let pick = getRandomIntInclusive(1, 50);
  if (pick < 25) {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivative();
  } else {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivativeWithCoefficients();
  }
  let term2Latex = ``;
  let answerLatexArrayTwo = [];
  let choice = getRandomIntInclusive(1, 50);
  if (choice <= 25) {
    [term2Latex, answerLatexArrayTwo] = constantAntiderivative();
  } else {
    [term2Latex, answerLatexArrayTwo] = xTermAntiderivative();
  }
  let questionLatex = term1Latex + ' ' + term2Latex;
  let answerLatex = answerLatexArrayOne[0] + ' ' + answerLatexArrayTwo[0];
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}