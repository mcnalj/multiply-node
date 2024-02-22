import {
    getRandomIntInclusive,
    getReducedFraction,
  } from './utilities-scripts.js';

function constantAntiderivative(minCoefficient=1, maxCoefficient=9) {
  let answerLatexArray = [];
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let questionLatex = `${coefficient} dx`;
  let answerLatex = `${coefficient}x+C`;
  let explore = /\d1x/.test(answerLatex)
    if (!explore) {
      answerLatex = answerLatex.replace(/1x/, 'x');
    } 
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}  
  
function xTermAntiderivative(minCoefficient = 1, maxCoefficient = 9) {
  let answerLatexArray = [];
  let questionLatex = ``;
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  if (coefficient > 1) {
    questionLatex = `${coefficient}x dx`;
  } else {
    questionLatex = `x dx`;
  }
  let [numerator, denominator] = getReducedFraction(coefficient, 2);
  let answerLatex = `\\frac{${numerator}}{${denominator}}x^2+C`;
  if (denominator === 1) {
    if (numerator === 1) {
      answerLatex = `x^2+C`;  
    } else {
      answerLatex = `${numerator}x^2+C`;
    }
  }
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}  

function singleTermAntiderivative(minExponent=2, maxExponent=8) {
  let answerLatexArray = []
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let increasedExponent = exponent + 1;
  let questionLatex = `x^${exponent} dx`;
  let answerLatex = `\\frac{1}{${increasedExponent}}x^${increasedExponent}+C`;
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function singleTermAntiderivativeWithCoefficients(minCoefficient = 2, maxCoefficient = 9, allowNegativeCoefficient = "true", minExponent=2, maxExponent=8) {
  let answerLatexArray = []
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let increasedExponent = exponent + 1;
  let questionLatex = `${coefficient}x^${exponent} dx`;
  let answerLatex = ``;
  if (coefficient === increasedExponent) {
    answerLatex = `x^${increasedExponent}+C`;  
  } else {
    let [numerator, denominator] = getReducedFraction(coefficient, increasedExponent);
    answerLatex = `\\frac{${numerator}}{${denominator}}x^${increasedExponent}+C`;
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

// Once the second term was 1, the answer should have been x, but it was 1 ????
function binomialAntiderivative() {
  let answerLatexArray = [];
  let term1Latex = ``;
  let answerLatexArrayOne = [];
  let pick = getRandomIntInclusive(1, 50);
  if (pick < 25) {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivative();
    term1Latex = term1Latex.slice(0, -3);
    answerLatexArrayOne[0] = answerLatexArrayOne[0].slice(0,-2); 
  } else {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivativeWithCoefficients();
    term1Latex = term1Latex.slice(0, -3);
    answerLatexArrayOne[0] = answerLatexArrayOne[0].slice(0,-2); 
  }
  let term2Latex = ``;
  let answerLatexArrayTwo = [];
  let choice = getRandomIntInclusive(1, 50);
  if (choice <= 25) {
    [term2Latex, answerLatexArrayTwo] = constantAntiderivative();
    term2Latex = term2Latex.slice(0, -3);
    answerLatexArrayTwo[0] = answerLatexArrayTwo[0].slice(0,-2); 
  } else {
    [term2Latex, answerLatexArrayTwo] = xTermAntiderivative();
    term2Latex = term2Latex.slice(0, -3);
    answerLatexArrayTwo[0] = answerLatexArrayTwo[0].slice(0,-2);
  }
  let questionLatex = '(' + term1Latex + '+' + term2Latex + ') dx';
  let answerLatex = answerLatexArrayOne[0] + '+' + answerLatexArrayTwo[0] + '+C';
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function polynomialAntiderivative() {
  let answerLatexArray = [];
  let term1Latex = ``;
  let answerLatexArrayOne = [];
  let pick = getRandomIntInclusive(1, 50);
  if (pick < 25) {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivative();
    term1Latex = term1Latex.slice(0, -3);
    answerLatexArrayOne[0] = answerLatexArrayOne[0].slice(0,-2); 
  } else {
    [term1Latex, answerLatexArrayOne] = singleTermAntiderivativeWithCoefficients();
    term1Latex = term1Latex.slice(0, -3);
    answerLatexArrayOne[0] = answerLatexArrayOne[0].slice(0,-2); 
  }
  let term2Latex = ``;
  let answerLatexArrayTwo = [];
  [term2Latex, answerLatexArrayTwo] = xTermAntiderivative();
  term2Latex = term2Latex.slice(0, -3);
  answerLatexArrayTwo[0] = answerLatexArrayTwo[0].slice(0,-2);
  let term3Latex = ``;
  let answerLatexArrayThree = [];
  [term3Latex, answerLatexArrayThree] = constantAntiderivative(1, 9);
  term3Latex = term3Latex.slice(0, -3);
  answerLatexArrayThree[0]= answerLatexArrayThree[0].slice(0, -2); 
  let questionLatex = '(' + term1Latex + '+' + term2Latex + '+' + term3Latex + ') dx';
  let answerLatex = answerLatexArrayOne[0] + '+' + answerLatexArrayTwo[0] + '+' + answerLatexArrayThree[0] + '+C';
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

// This does not yet have negative coefficients
function trigonometricIntegrals(minCoefficient=1, maxCoefficient=9) {
  let answerLatexArray = [];
  let questionLatex = ``;
  let answerLatex = ``;
  let answerLatex2 = ``;
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let trigBase = "";
  let answerBase = "";
  // We need this because the form \\cosx doesn't display
  let answerBase2 = "";
  let isNegative = false;
  let pick = getRandomIntInclusive(1, 100);
  if (pick < 30) {
    trigBase = "\\sin x dx";
    answerBase = "\\cos x";
    answerBase2 = "\\cosx";
    isNegative = true;
  } else if (pick < 60) {
    trigBase = "\\cos x dx";
    answerBase = "\\sin x";
    answerBase2 = "\\sinx";
  } else if (pick < 70) {
    trigBase = "\\sec^2 x dx";
    answerBase = "\\tan x";
    answerBase2 = "\\tanx";
  } else if (pick < 80) {
    trigBase = "\\csc^2 x dx";
    answerBase = "\\cot x";
    answerBase2 = "\\cotx";
    isNegative = true;
  } else if (pick < 90) {
    trigBase = "\\sec x \\tan x dx";
    answerBase = "\\sec x";
    answerBase2 = "\\secx";
  } else {
    trigBase = "\\csc x \\cot x dx";
    answerBase = "\\csc x";
    answerBase2 = "\\cscx";
    isNegative = true
  }
  let pick2 = getRandomIntInclusive(1, 100);
  let hasNegativeCoefficient = false;
  if (pick2 > 70) {
    hasNegativeCoefficient = true;
  }
  if (coefficient > 1) {
    if (hasNegativeCoefficient) {
      questionLatex = `-${coefficient}${trigBase}`;
    } else {
    questionLatex = `${coefficient}${trigBase}`;
    }
    answerLatex = `${coefficient}${answerBase}+C`;
    answerLatex2 = `${coefficient}${answerBase2}+C`;
  } else {
    if (hasNegativeCoefficient) {
      questionLatex = `-${trigBase}`;      
    } else {
      questionLatex = `${trigBase}`;
    }
    answerLatex = `${answerBase}+C`;
    answerLatex2 = `${answerBase2}+C`;
  }
  if (isNegative) {
    if (!hasNegativeCoefficient) {
      answerLatex = `-${answerLatex}`;
      answerLatex2 = `-${answerLatex2}`;
    }
  } else {
    if (hasNegativeCoefficient) {
      answerLatex = `-${answerLatex}`;
      answerLatex2 = `-${answerLatex2}`;
    }
  }
  answerLatexArray.push(answerLatex);
  answerLatexArray.push(answerLatex2);
  return [questionLatex, answerLatexArray];
}

// function naturalExponentialIntegrals() {
//   let answerLatexArray = [];
//   let questionLatex = ``;
//   let answerLatex = ``;
//   let coefficient = getRandomIntInclusive(2, 9);
//   let pick = getRandomIntInclusive(1, 100);
//   if (pick < 85) {
//     questionLatex = `${coefficient}e^x dx`;
//     answerLatex = `${coefficient}e^x+C`;
//   } else {
//     questionLatex = `e^x dx`;
//     answerLatex = `e^x+C`;
//   }
//   answerLatexArray.push(answerLatex);
//   return [questionLatex, answerLatexArray];
// }

// function naturalExponentialChainRuleIntegrals() {
  function naturalExponentialIntegrals() {
  // rename this as naturalExponential Integrals and test it
  let answerLatexArray = [];
  let questionLatex = ``;
  let answerLatex = ``;
  let pick = getRandomIntInclusive(1,6);
  if (pick === 1) {
    let exponentCoefficient = getRandomIntInclusive(2, 9);
    questionLatex = `${exponentCoefficient}e^{${exponentCoefficient}x} dx`;
    answerLatex = `e^{${exponentCoefficient}x}+C`;
  } else if (pick === 2){
    let coefficient = getRandomIntInclusive(2,9);
    let exponentCoefficient = 11;
    let integralCoefficient = coefficient * exponentCoefficient;
    while (integralCoefficient >= 21) {
      exponentCoefficient = getRandomIntInclusive(2, 9);
      integralCoefficient = coefficient*exponentCoefficient;
    }
    questionLatex = `${integralCoefficient}e^{${exponentCoefficient}x} dx`;
    answerLatex = `${coefficient}e^{${exponentCoefficient}x}+C`;
  } else if (pick === 3) {
    // no coefficient, just an exponent
    let exponent = getRandomIntInclusive(2, 6)
    let integralExponent = exponent - 1;
    if (integralExponent > 1) {
      questionLatex = `${exponent}x^{${integralExponent}}e^{x^${exponent}} dx`;  
    } else {
      questionLatex = `${exponent}xe^{x^${exponent}} dx`;
    }
    answerLatex = `e^{x^${exponent}}+C`    
  } else if (pick === 4) {
    // routine for something with a coefficient and an exponent
    let exponentCoefficient = getRandomIntInclusive(2,9);
    let exponent = getRandomIntInclusive(2, 6)
    while (exponentCoefficient*exponent > 12) {
      exponent = getRandomIntInclusive(2, 6)
    }
    let integralExponent = exponent - 1;
    let integralCoefficient = exponent * exponentCoefficient;
    if (integralExponent > 1) {
      questionLatex = `${integralCoefficient}x^${integralExponent}e^{${exponentCoefficient}x^${exponent}} dx`;  
    } else {
      questionLatex = `${integralCoefficient}xe^{${exponentCoefficient}x^${exponent}} dx`;
    }
    answerLatex = `e^{${exponentCoefficient}x^${exponent}}+C`;
  } else if (pick === 5) {
    // exponent with a coefficient but no exponent coefficient
    let exponent = getRandomIntInclusive(2, 6)
    let coefficient = 5;
    let integralCoefficient = 25;
    while (integralCoefficient > 24) {
      coefficient = getRandomIntInclusive(2,4);
      integralCoefficient = exponent*coefficient;
    }
    let integralExponent = exponent - 1;
    if (integralExponent > 1) {
      questionLatex = `${integralCoefficient}x^{${integralExponent}}e^{x^${exponent}} dx`;  
    } else {
      questionLatex = `${integralCoefficient}xe^{x^${exponent}} dx`;
    }
    answerLatex = `${coefficient}e^{x^${exponent}}+C`
  } else if (pick === 6) {
        // routine for something with a coefficient and an exponent with a coefficient
    let exponent = getRandomIntInclusive(2, 6)
    let exponentCoefficient = getRandomIntInclusive(2,4);
    let coefficient = 5;
    let integralCoefficient = 51;
    while (integralCoefficient > 50) {
      coefficient = getRandomIntInclusive(2,4);
      integralCoefficient = exponent*coefficient*exponentCoefficient;
    }
    let integralExponent = exponent - 1;
    if (integralExponent > 1) {
      questionLatex = `${integralCoefficient}x^{${integralExponent}}e^{${exponentCoefficient}x^{${exponent}}} dx`;  
    } else {
      questionLatex = `${integralCoefficient}xe^{${exponentCoefficient}x^{${exponent}}} dx`;
    }
    answerLatex = `${coefficient}e^{${exponentCoefficient}x^${exponent}}+C`    
  }
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function naturalLogIntegrals() {
  let answerLatexArray = [];
  let questionLatex = ``;
  let answerLatex = ``;
  let coefficient = getRandomIntInclusive(2, 9);
  let pick = getRandomIntInclusive(1, 100);
  if (pick < 85) {
    questionLatex = `\\frac{${coefficient}}{x} dx`;
    answerLatex =`${coefficient}\\ln\\midx\\mid+C`
  } else {
    questionLatex = `\\frac{1}{x} dx`;
    answerLatex =`\\ln\\midx\\mid+C`
  }
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

function indefiniteIntegralsNaturalLogBinomial() {
  let answerLatexArray = [];
  let questionLatex = ``;
  let answerLatex = ``;
  let coefficient = getRandomIntInclusive(2, 9);
  let term2 = 10;
  while (((term2 > 9) || (coefficient % term2 === 0) || (term2 % coefficient === 0)) && term2 !== 1) {
    term2 = getRandomIntInclusive(1, 9);
  }
  let pick = getRandomIntInclusive(1, 5);
  if (pick === 1) {
    // do I want a lot of these
    questionLatex = `\\frac{${coefficient}}{x + ${term2}} dx`;
    answerLatex =`${coefficient}\\ln\\midx+${term2}\\mid+C`
  } else if (pick === 2) {
    questionLatex = `\\frac{${coefficient}}{${coefficient}x + ${term2}} dx`
    answerLatex =`\\ln\\mid${coefficient}x+${term2}\\mid+C`
  } else if (pick === 3) {
    let exponent = getRandomIntInclusive(2, 5);
    let derivativeExponent = exponent - 1;
    if (derivativeExponent === 1) {
      questionLatex = `\\frac{${exponent}x}{x^${exponent} + ${term2}} dx`;
    } else {
      questionLatex = `\\frac{${exponent}x^${derivativeExponent}}{x^${exponent} + ${term2}} dx`;
    }
    answerLatex = `\\ln\\midx^${exponent}+${term2}\\mid+C`
  } else if (pick === 4) {
    let exponent = getRandomIntInclusive(2, 5);
    let derivativeExponent = exponent - 1;
    let topCoefficient = exponent * coefficient;
    if (derivativeExponent === 1) {
      questionLatex = `\\frac{${topCoefficient}x}{${coefficient}x^${exponent} + ${term2}} dx`
    } else {
      questionLatex = `\\frac{${topCoefficient}x^${derivativeExponent}}{${coefficient}x^${exponent} + ${term2}} dx`
    }
    answerLatex = `\\ln\\mid${coefficient}x^${exponent}+${term2}\\mid+C`
  } else if (pick === 5) {
    questionLatex = `\\frac{1}{x} dx`;
    answerLatex =`\\ln\\midx\\mid+C`
  } 
  answerLatexArray.push(answerLatex);
  return [questionLatex, answerLatexArray];
}

// function simpleDefiniteIntegral() {
//   let lowerLimit = getRandomIntInclusive(0, 3);
//   let upperLimit = getRandomIntInclusive(lowerLimit+ 1, 9)
//   let coefficient = getRandomIntInclusive(1, 9);
//   let maxExponent = 4;
//   if (upperLimit > 5) {
//     maxExponent = 1
//   } else if (upperLimit >= 4 ) {
//     maxExponent = 2
//   } else if (upperLimit === 3) {
//     maxExponent = 3
//   } else {
//     maxExponent = 4
//   }
//   let exponent = getRandomIntInclusive(1, maxExponent);
//   let questionLatex = `\\int_${lowerLimit}^${upperLimit}${coefficient}x^${exponent} dx`;
//   if (coefficient === 1) {
//     if (exponent === 1) {
//       questionLatex = `\\int_${lowerLimit}^${upperLimit}xdx`;
//     } else {
//       questionLatex = `\\int_${lowerLimit}^${upperLimit}x^${exponent}dx`;
//     }
//   } else {
//     if (exponent === 1) {
//       questionLatex = `\\int_${lowerLimit}^${upperLimit}xdx`;
//     }
//   }
//   let integratedExponent = exponent + 1;
//   let [numerator, denominator] = getReducedFraction(coefficient, integratedExponent);
//   let exponentTermValue = upperLimit**integratedExponent;
//   let upperTermNumerator = exponentTermValue * numerator;
//   exponentTermValue = lowerLimit**integratedExponent;
//   let lowerTermNumerator = exponentTermValue * numerator;
//   let answerNumeratorValue = upperTermNumerator - lowerTermNumerator;
//   let answerLatex = `\\frac{${answerNumeratorValue}}{${denominator}}+C`;
//   let answerLatexArray = [];
//   answerLatexArray.push(answerLatex);
// }

function indefiniteIntegralsSingleTerm() {
  return getMixAntiderivatives();
}

function indefiniteIntegralsBinomial() {
  return binomialAntiderivative();
}

function indefiniteIntegralsPolynomial() {
  return polynomialAntiderivative();  
}

function indefiniteIntegralsTrigonometric() {
  return trigonometricIntegrals();
}

function indefiniteIntegralsNaturalExponential() {
  return naturalExponentialIntegrals();
}

function indefiniteIntegralsNaturalLog() {
  return naturalLogIntegrals();
}

function definiteIntegrals() {
  
}

export {
  indefiniteIntegralsSingleTerm,
  indefiniteIntegralsBinomial,
  indefiniteIntegralsPolynomial,
  indefiniteIntegralsTrigonometric,
  indefiniteIntegralsNaturalExponential,
  indefiniteIntegralsNaturalLog,
  indefiniteIntegralsNaturalLogBinomial,
  definiteIntegrals,    
}

