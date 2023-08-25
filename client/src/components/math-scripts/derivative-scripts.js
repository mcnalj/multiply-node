import {
    getSimplifiedFraction,
    getRandomIntInclusive,
    generateReducedFraction,
    maybeNegativeCoefficient,
    maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
    applyRegexFixes,
    getReducedFraction,
    findGreatestCommonFactor
  } from './utilities-scripts.js';
  
  
  
  function simplePowerRule(minExponent=2, maxExponent=9) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let reducedExponent = exponent -1;
    let questionLatex = `x^${exponent}`;
    let answerLatex = `${exponent}x^${reducedExponent}`;
    if (reducedExponent == 1) {
      answerLatex = `2x`
    }
    if (exponent == 1) {
      questionLatex = `x`;
      answerLatex = `1`;
    }
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithIntegerCoefficient() {
    let coefficient = getRandomIntInclusive(1, 5);
    let exponent = getRandomIntInclusive(0, 7);
    let reducedExponent = exponent -1;
    let newCoefficient = coefficient * exponent;
    let questionLatex = `${coefficient}x^${exponent}`;
    let answerLatex = `${newCoefficient}x^${reducedExponent}`
    if (exponent == 1) {
      answerLatex = `${coefficient}`
    }
    [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, 40)
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex]
  }  
  
  //this doesn't handle 0 exponents
  function simplePowerRuleWithFractionalCoefficient(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent); //0-5
    let numerator = 1;
    let denominator = 1;
    [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
    let answerExponent = exponent - 1;
    let answerNum = exponent * numerator;
    let answerDenom = denominator;
    [answerNum, answerDenom] = getReducedFraction(answerNum, answerDenom);
    let questionLatex = `\\frac{${numerator}}{${denominator}}x^${exponent}`;
    let answerLatex = `\\frac{${answerNum}}{${answerDenom}}x^${answerExponent}`;
    if (answerDenom == 1) {
      answerLatex = `${answerNum}x^${answerExponent}`;
    }
    [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, 40)
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }
  
  // this doesn't allow the exponent to be  1
  function simplePowerRuleWithNegativeExponent(minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let reducedExponent = exponent + 1;
    let questionLatex = `x^{-${exponent}}`;
    let answerLatex = `-${exponent}x^{-${reducedExponent}}`;
    return [questionLatex, answerLatex];
  }
  
  // need to add the second answer if they put term in denominator
  function simplePowerRuleWithNegativeExponentAndIntegerCoefficient(minCoefficient=2, maxCoefficient=7, minExponent=2, maxExponent=7) {
    let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let answerCoefficient = coefficient * exponent;
    let answerExponent = exponent + 1;
    let questionLatex = `${coefficient}x^{-${exponent}}`;
    let answerLatex = `-${answerCoefficient}x^{-${answerExponent}}`;
    let answerLatex2 = `-\\frac{${answerCoefficient}}{x^${answerExponent}}`;
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }
  
  // need to handle negatives for multiple answers and same with regEx fixes
  
  function simplePowerRuleWithNegativeExponentAndFractionalCoefficient(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
    let answerNumerator = numerator * exponent;
    let answerDenominator = denominator;
    let answerExponent = exponent + 1;
    [answerNumerator, answerDenominator] = getReducedFraction(answerNumerator, answerDenominator);
    // now the denominator could be 1
    let questionLatex = `\\frac{${numerator}}{${denominator}}x^{-${exponent}}`;
    let answerLatex = `-\\frac{${answerNumerator}}{${answerDenominator}}x^{-${answerExponent}}`;
    let answerLatex2 = `-\\frac{${answerNumerator}x^{-${answerExponent}}}{${answerDenominator}}`;
    let answerLatex3 = `-\\frac{${answerNumerator}}{${answerDenominator}x^${answerExponent}}`;
    if (answerDenominator == 1) {
      answerLatex = `-${answerNumerator}x^{-${answerExponent}}`;
      answerLatex2 = `-${answerNumerator}x^{-${answerExponent}}`;
      answerLatex3 = `-\\frac{${answerNumerator}}{x^${answerExponent}}`;
    }
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithFractionalExponent() {
    // minNum, maxNum, minDenom, maxDenom
    let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
    let questionLatex = `x^{\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
    let answerHasNegativeExponent = exponentDenominator > exponentNumerator ? true : false;
    let answerExponentNumerator = Math.abs(exponentNumerator - exponentDenominator);
    let answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`
    if (answerHasNegativeExponent) {
      answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`
    }
    return [questionLatex, answerLatex]
  }

  function simplePowerRuleWithFractionalExponentAndIntegerCoefficient() {
    // This doesn't account for giving an unreduced coefficient as an answer.
      let questionCoefficient = getRandomIntInclusive(2, 7);
      // minNum, maxNum, minDenom, maxDenom
      let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
      let questionLatex = `${questionCoefficient}x^{\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
      let answerHasNegativeExponent = exponentDenominator > exponentNumerator ? true : false;
      let answerExponentNumerator = Math.abs(exponentNumerator - exponentDenominator);
      let answerInitialCoefficientNumerator = questionCoefficient * exponentNumerator;
      let [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(answerInitialCoefficientNumerator, exponentDenominator);
      let answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
      if (answerHasNegativeExponent) {
        answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
      }
      if (answerCoefficientDenominator == 1) {
        answerLatex = `${answerCoefficientNumerator}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        if (answerHasNegativeExponent) {
          answerLatex = `${answerCoefficientNumerator}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        }
        if (answerCoefficientNumerator == 1) {
          answerLatex = `x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
          if (answerHasNegativeExponent) {
            answerLatex = `x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
          }
        }
      }
      return [questionLatex, answerLatex]
  }

  function simplePowerRuleWithFractionalExponentAndFractionalCoefficient() {
    // This doesn't account for giving an unreduced coefficient as an answer.
      let [questionCoefficientNumerator, questionCoefficientDenominator] = generateReducedFraction(1, 5, 2, 5)
      // minNum, maxNum, minDenom, maxDenom
      let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
      let questionLatex = `\\frac{${questionCoefficientNumerator}}{${questionCoefficientDenominator}}x^{\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
      let answerHasNegativeExponent = exponentDenominator > exponentNumerator ? true : false;
      let answerExponentNumerator = Math.abs(exponentNumerator - exponentDenominator);
      let answerInitialCoefficientNumerator = questionCoefficientNumerator * exponentNumerator;
      let answerInitialCoefficientDenominator = questionCoefficientDenominator * exponentDenominator;
      let [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(answerInitialCoefficientNumerator, answerInitialCoefficientDenominator);
      let answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
      if (answerHasNegativeExponent) {
        answerLatex = `\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
      }
      if (answerCoefficientDenominator == 1) {
        answerLatex = `${answerCoefficientNumerator}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        if (answerHasNegativeExponent) {
          answerLatex = `${answerCoefficientNumerator}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        }
        if (answerCoefficientNumerator == 1) {
          answerLatex = `x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
          if (answerHasNegativeExponent) {
            answerLatex = `x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
          }
        }
      }
      return [questionLatex, answerLatex]
  }
  
  function simplePowerRuleWithNegativeFractionalExponent() {
    // minNum, maxNum, minDenom, maxDenom
    let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
    let questionLatex = `x^{-\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
    let answerExponentNumerator = exponentNumerator + exponentDenominator;
    let answerLatex = `-\\frac{${exponentNumerator}}{${exponentDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`
    return [questionLatex, answerLatex]
  }

  function simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient() {
    // This doesn't account for giving an unreduced coefficient as an answer.
      let questionCoefficient = getRandomIntInclusive(2, 7);
      // minNum, maxNum, minDenom, maxDenom
      let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
      let questionLatex = `${questionCoefficient}x^{-\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
      
      let answerExponentNumerator = exponentNumerator + exponentDenominator;
      let answerInitialCoefficientNumerator = questionCoefficient * exponentNumerator;
      let [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(answerInitialCoefficientNumerator, exponentDenominator);
      let answerLatex = `-\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;

      if (answerCoefficientDenominator == 1) {
        answerLatex = `-${answerCoefficientNumerator}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        if (answerCoefficientNumerator == 1) {
          answerLatex = `-x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        }
      }
      return [questionLatex, answerLatex]
  }

  function simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient() {
    // This doesn't account for giving an unreduced coefficient as an answer.
      let [questionCoefficientNumerator, questionCoefficientDenominator] = generateReducedFraction(1, 5, 2, 5)
      // minNum, maxNum, minDenom, maxDenom
      let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
      let questionLatex = `\\frac{${questionCoefficientNumerator}}{${questionCoefficientDenominator}}x^{-\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
      let answerExponentNumerator = exponentNumerator + exponentDenominator;
      let answerInitialCoefficientNumerator = questionCoefficientNumerator * exponentNumerator;
      let answerInitialCoefficientDenominator = questionCoefficientDenominator * exponentDenominator;
      let [answerCoefficientNumerator, answerCoefficientDenominator] = getReducedFraction(answerInitialCoefficientNumerator, answerInitialCoefficientDenominator);
      let answerLatex = `-\\frac{${answerCoefficientNumerator}}{${answerCoefficientDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
      if (answerCoefficientDenominator == 1) {
        answerLatex = `-${answerCoefficientNumerator}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        if (answerCoefficientNumerator == 1) {
          answerLatex = `-x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`;
        }
      }
      return [questionLatex, answerLatex]
  }  
  
  function powerRuleMix() {
    let engineArray = [
      simplePowerRule,
      simplePowerRuleWithIntegerCoefficient,
      simplePowerRuleWithFractionalCoefficient,
      simplePowerRuleWithNegativeExponent,
      simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
      simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
      simplePowerRuleWithFractionalExponent,
      simplePowerRuleWithFractionalExponentAndIntegerCoefficient,
      simplePowerRuleWithFractionalExponentAndFractionalCoefficient,
      simplePowerRuleWithNegativeFractionalExponent,
      simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient,
      simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient,
    ]
    let choice = getRandomIntInclusive(0, 11);
    let questionLatex = "";
    let answerLatex = "";
    switch (choice) {
      case 0:
        [questionLatex, answerLatex] = simplePowerRule();
        break;
      case 1:
        [questionLatex, answerLatex] = simplePowerRuleWithIntegerCoefficient();
        break;
      case 2:
        [questionLatex, answerLatex] = simplePowerRuleWithFractionalCoefficient();
        break;
      case 3:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponent();
        break;
      case 4:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndIntegerCoefficient();
        break;
      case 5:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndFractionalCoefficient();
        break;
      case 6:
        [questionLatex, answerLatex] = simplePowerRuleWithFractionalExponent();
        break;
      case 7:
        [questionLatex, answerLatex] = simplePowerRuleWithFractionalExponentAndIntegerCoefficient();
        break;
      case 8:
        [questionLatex, answerLatex] = simplePowerRuleWithFractionalExponentAndFractionalCoefficient();
        break;
      case 9:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeFractionalExponent();
        break;
      case 10:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient();
        break;
      case 11:
        [questionLatex, answerLatex] = simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient();
        break;
    }
    return [questionLatex, answerLatex];
  }

  export {
    simplePowerRule,
    simplePowerRuleWithIntegerCoefficient,
    simplePowerRuleWithFractionalCoefficient,
    simplePowerRuleWithNegativeExponent,
    simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
    simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
    simplePowerRuleWithFractionalExponent,
    simplePowerRuleWithFractionalExponentAndIntegerCoefficient,
    simplePowerRuleWithFractionalExponentAndFractionalCoefficient,
    simplePowerRuleWithNegativeFractionalExponent,
    simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient,
    simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient,
    powerRuleMix,   
  }
  