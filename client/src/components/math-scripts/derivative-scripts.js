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

  function simplePowerRuleWithIntegerCoefficient(minCoefficient=1, maxCoefficient=5, minExponent=0, maxExponent=7) {
    let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
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
  function simplePowerRuleWithNegativeExponentAsNegative(minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let reducedExponent = exponent + 1;
    let questionLatex = `x^{-${exponent}}`;
    let answerLatex = `-${exponent}x^{-${reducedExponent}}`;
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponentAsFraction(minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let reducedExponent = exponent + 1;
    let questionLatex = `\\frac{1}{x^${exponent}}`;
    let answerLatex = `-\\frac{${exponent}}{x^${reducedExponent}}`;
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponent(pctAsNegative=50) {
    let choice = getRandomIntInclusive(1, 100);
    let questionLatex = "";
    let answerLatex = "";
    if (choice <=pctAsNegative) {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAsNegative();
    } else {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAsFraction();
    }
    return [questionLatex, answerLatex];
  }

  // // need to add the second answer if they put term in denominator
  // function simplePowerRuleWithNegativeExponentAndIntegerCoefficient(minCoefficient=2, maxCoefficient=7, minExponent=2, maxExponent=7) {
  //   let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  //   let exponent = getRandomIntInclusive(minExponent, maxExponent);
  //   let answerCoefficient = coefficient * exponent;
  //   let answerExponent = exponent + 1;
  //   let questionLatex = `${coefficient}x^{-${exponent}}`;
  //   let answerLatex = `-${answerCoefficient}x^{-${answerExponent}}`;
  //   let answerLatex2 = `-\\frac{${answerCoefficient}}{x^${answerExponent}}`;
  //   [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
  //   [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  //   return [questionLatex, answerLatex];
  // }

  function simplePowerRuleWithNegativeExponentAndIntegerCoefficientAsNegative(minCoefficient=2, maxCoefficient=7, minExponent=2, maxExponent=7) {
    let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let answerCoefficient = coefficient * exponent;
    let answerExponent = exponent + 1;
    let questionLatex = `${coefficient}x^{-${exponent}}`;
    let answerLatex = `-${answerCoefficient}x^{-${answerExponent}}`;
    let answerLatex2 = "";
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponentAndIntegerCoefficientAsFraction(minCoefficient=2, maxCoefficient=7, minExponent=2, maxExponent=7) {
    let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let answerCoefficient = coefficient * exponent;
    let answerExponent = exponent + 1;
    let questionLatex = `\\frac{${coefficient}}{x^${exponent}}`;
    let answerLatex = `-\\frac{${answerCoefficient}}{x^${answerExponent}}`;
    let answerLatex2 = "";
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    console.log(questionLatex);
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponentAndIntegerCoefficient(pctAsNegative=50) {
    let choice = getRandomIntInclusive(1, 100);
    let questionLatex = '';
    let answerLatex = '';
    console.log(choice)
    if (choice <= pctAsNegative) {
      console.log("Is negative");
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndIntegerCoefficientAsNegative();
    } else {
      console.log("Is positive");
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndIntegerCoefficientAsFraction();
      console.log(questionLatex);
    }
    console.log(questionLatex);
    return [questionLatex, answerLatex];
  }

  
  // need to handle negatives for multiple answers and same with regEx fixes
  
  // function simplePowerRuleWithNegativeExponentAndFractionalCoefficient(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
  //   let exponent = getRandomIntInclusive(minExponent, maxExponent);
  //   let [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
  //   let answerNumerator = numerator * exponent;
  //   let answerDenominator = denominator;
  //   let answerExponent = exponent + 1;
  //   [answerNumerator, answerDenominator] = getReducedFraction(answerNumerator, answerDenominator);
  //   // now the denominator could be 1
  //   let questionLatex = `\\frac{${numerator}}{${denominator}}x^{-${exponent}}`;
  //   let answerLatex = `-\\frac{${answerNumerator}}{${answerDenominator}}x^{-${answerExponent}}`;
  //   let answerLatex2 = `-\\frac{${answerNumerator}x^{-${answerExponent}}}{${answerDenominator}}`;
  //   let answerLatex3 = `-\\frac{${answerNumerator}}{${answerDenominator}x^${answerExponent}}`;
  //   if (answerDenominator == 1) {
  //     answerLatex = `-${answerNumerator}x^{-${answerExponent}}`;
  //     answerLatex2 = `-${answerNumerator}x^{-${answerExponent}}`;
  //     answerLatex3 = `-\\frac{${answerNumerator}}{x^${answerExponent}}`;
  //   }
  //   [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
  //   [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  //   return [questionLatex, answerLatex];
  // }

  function simplePowerRuleWithNegativeExponentAndFractionalCoefficientAsNegative(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
    let answerNumerator = numerator * exponent;
    let answerDenominator = denominator;
    let answerExponent = exponent + 1;
    [answerNumerator, answerDenominator] = getReducedFraction(answerNumerator, answerDenominator);
    // now the denominator could be 1. Is this comment accurate 10/27?
    let questionLatex = `\\frac{${numerator}}{${denominator}}x^{-${exponent}}`;
    let answerLatex = `-\\frac{${answerNumerator}}{${answerDenominator}}x^{-${answerExponent}}`;
    let answerLatex2 = `-\\frac{${answerNumerator}x^{-${answerExponent}}}{${answerDenominator}}`;
    if (answerDenominator == 1) {
      answerLatex = `-${answerNumerator}x^{-${answerExponent}}`;
      answerLatex2 = `-${answerNumerator}x^{-${answerExponent}}`;
    }
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponentAndFractionalCoefficientAsFraction(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
    let exponent = getRandomIntInclusive(minExponent, maxExponent);
    let [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
    let answerNumerator = numerator * exponent;
    let answerDenominator = denominator;
    let answerExponent = exponent + 1;
    [answerNumerator, answerDenominator] = getReducedFraction(answerNumerator, answerDenominator);
    // now the denominator could be 1
    let questionLatex = `\\frac{${numerator}}{${denominator}x^${exponent}}`;
    let answerLatex = `-\\frac{${answerNumerator}}{${answerDenominator}x^${answerExponent}}`;
    let answerLatex2 = ``;
    if (answerDenominator == 1) {
      answerLatex = `-\\frac{${answerNumerator}}{x^${answerExponent}}`;
    }
    [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
    [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
    return [questionLatex, answerLatex];
  }

  function simplePowerRuleWithNegativeExponentAndFractionalCoefficient(pctAsNegative=50) {
    let pick = getRandomIntInclusive(1, 100);
    let questionLatex = ``;
    let answerLatex = ``;
    if (pick <= pctAsNegative) {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndFractionalCoefficientAsNegative();
    } else {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndFractionalCoefficientAsFraction();
    }
    return [questionLatex, answerLatex];
  }

  // function simplePowerRuleWithFractionalExponent() {
  //   // minNum, maxNum, minDenom, maxDenom
  //   let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
  //   let questionLatex = `x^{\\frac{${exponentNumerator}}{${exponentDenominator}}}`;
  //   let answerHasNegativeExponent = exponentDenominator > exponentNumerator ? true : false;
  //   let answerExponentNumerator = Math.abs(exponentNumerator - exponentDenominator);
  //   let answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}}x^{\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`
  //   if (answerHasNegativeExponent) {
  //     answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}}x^{-\\frac{${answerExponentNumerator}}{${exponentDenominator}}}`
  //   }
  //   return [questionLatex, answerLatex]
  // }

  function simplePowerRuleWithFractionalExponentAsFraction() {
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
  function simplePowerRuleWithFractionalExponentAsRadical() {
    // minNum, maxNum, minDenom, maxDenom
    let [exponentNumerator, exponentDenominator] = generateReducedFraction(1, 7, 2, 5)
    let questionLatex = `\\sqrt[${exponentDenominator}]{x^${exponentNumerator}}`;
    let answerHasNegativeExponent = exponentDenominator > exponentNumerator ? true : false;
    let answerExponentNumerator = Math.abs(exponentNumerator - exponentDenominator);
    let answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}}\\sqrt[${exponentDenominator}]{x^${answerExponentNumerator}}`
    if (answerHasNegativeExponent) {
      answerLatex = `\\frac{${exponentNumerator}}{${exponentDenominator}\\sqrt[${exponentDenominator}]{x^${answerExponentNumerator}}}`
    }
    return [questionLatex, answerLatex]
  }
  function simplePowerRuleWithFractionalExponent(pctAsFraction=100) {
    let choice = getRandomIntInclusive(1, 100);
    let questionLatex = ``;
    let answerLatex = ``;
    if (choice <= pctAsFraction) {
      [questionLatex, answerLatex] = simplePowerRuleWithFractionalExponentAsFraction();
    } else {
      [questionLatex, answerLatex] = simplePowerRuleWithFractionalExponentAsRadical();
    }
    return [questionLatex, answerLatex];
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

  const angles = [
    { angle: 0, label: '0', sin: '0', cos: '1', tan: '0' },
    { angle: Math.PI / 6, label: 'π/6', sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{\\sqrt{3}}{3}' },
    { angle: Math.PI / 4, label: 'π/4', sin: '\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tan: '1' },
    { angle: Math.PI / 3, label: 'π/3', sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}' },
    { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', tan: 'undefined' },
    { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tan: '-\\sqrt{3}' },
    { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tan: '-1' },
    { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tan: '-\\frac{\\sqrt{3}}{3}' },
    { angle: Math.PI, label: 'π', sin: '0', cos: '-1', tan: '0' },
    { angle: ( 7 * Math.PI ) / 6, label: '7π/6', sin: '-\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tan: '\\sqrt{3}' },
    { angle: ( 5 * Math.PI ) / 4, label: '5π/4', sin: '-\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tan: '1' },
    { angle: ( 4 * Math.PI ) / 3, label: '4π/3', sin: '-\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tan: '\\sqrt{3}' },
    { angle: ( 3 * Math.PI ) / 2, label: '3π/2', sin: '-1', cos: '0', tan: 'undefined' },
    { angle: ( 5 * Math.PI ) / 3, label: '5π/3', sin: '=\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '-\\sqrt{3}' },
    { angle: ( 7 * Math.PI ) / 4, label: '7π/4', sin: '-\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tan: '-1' },
    { angle: ( 11 * Math.PI ) / 6, label: '11π/6', sin: '-\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '-\\frac{\\sqrt{3}}{3}' },
    { angle: 2 * Math.PI, label: '2π', sin: '0', cos: '1', sinOffset: -15, tan: '0' },
];


function pickTrigFunction() {
  let trigFunction = '';
  let pickTrig = getRandomIntInclusive(1,20);
  if (pickTrig >= 16) {
      trigFunction = 'sin'; 
  } else if (pickTrig >=11) {
      trigFunction = 'cos';
  } else if (pickTrig >= 7) {
      trigFunction = 'tan';
  } else if (pickTrig >=5) {
      trigFunction = 'csc';
  } else if (pickTrig >=3) {
      trigFunction = 'sec';
  } else if (pickTrig >= 1) {
      trigFunction = 'cot';
  }
  return trigFunction;
}

function pickCoefficient() {
  let coefficient = ""
  let pick = getRandomIntInclusive(1, 30);
  if (pick >= 29) {
    coefficient = '\\pi';
  } else if ( pick >= 27) {
    coefficient = 'e';
  } else if (pick >= 25) {
    coefficient = '\\frac{1}{3}';
  } else if (pick >= 22) {
    coefficient = '\\frac{1}{2}'
  } else if (pick >= 20) {
    coefficient = "6";
  } else if (pick >= 17) {
    coefficient = "5";
  } else if (pick >= 14) {
    coefficient = "4";
  } else if (pick >= 9) {
    coefficient = "3";
  } else if (pick >= 5) {
    coefficient = "2";
  } else if (pick >= 1) {
    coefficient = "";
  }
  return coefficient;
}

// function pickVariableTerm(min, max, addCoefficient=true) {
//   // add: overTwo, overThree, negativeExponent, root, binomialRoot, trinomialRoot
//   let variableTerm = "x";
//   let coefficient = "";
//   let termPick = getRandomIntInclusive(min, max);
//   if (termPick >= 15) {
//     if (addCoefficient) {
//       coefficient = getRandomIntInclusive(1, 9)
//       if (coefficient === 1) {
//         coefficient = "";
//       }
//     }
//     variableTerm = coefficient + "x";
//   } else if (termPick>=11) {
//     variableTerm = "x^2";
//   } else if (termPick >= 7) {
//     variableTerm = "x^3";
//   } else if (termPick >= 4) {
//     variableTerm = "x^2 + 1"
//   } else if (termPick >= 1) {
//     variableTerm = "x^2 + 2x + 3";
//   }
//   return variableTerm;
// }

function pickVariableTerm(complexity) {
  let questionLatex = "";
  let answerLatex = "";
  if (complexity==="simpleChainRule") {
    let choice = getRandomIntInclusive(1, 15);
    if (choice >= 11) {
      let coefficient = getRandomIntInclusive(2, 9);
      questionLatex = coefficient+'x';
      answerLatex = coefficient;
    } else if (choice >= 7) {
      //this is a problem because it posts terms with no x
    [questionLatex, answerLatex] = simplePowerRuleWithIntegerCoefficient(1,5,2,7);
    } else if (choice >=5) {
      [questionLatex, answerLatex] = simplePowerRuleWithIntegerCoefficient(1,5,2,7);
    } else if (choice >=3) {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponent(100);
    } else if (choice >=1) {
      [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponent(100);
    }
    return [questionLatex, answerLatex];
  }

}

function buildAnswerLatex(coefficient, trigFunction, variableTerm) {
  let [trigDerivative1, trigDerivative2, trigDerivative3, isNegative] = setTrigDerivative(trigFunction, variableTerm)
  if (isNegative) {
    coefficient = "-" + coefficient;
  }  
  let answerLatex1 = coefficient + trigDerivative1;
  let answerLatex2 = coefficient + trigDerivative2;
  let answerLatex3 = coefficient + trigDerivative3;

  return [answerLatex1, answerLatex2, answerLatex3];
}

function setTrigDerivative(trigFunction, variableTerm) {
  let trigDerivative1 = "";
  let trigDerivative2 = ""
  let trigDerivative3 = ""
  let isNegative = false;
  if (trigFunction == "sin") {
    trigDerivative1 = "\\cos(" + variableTerm + ")";
    trigDerivative2 = "\\cos" + variableTerm;
    trigDerivative3 = "\\cos\\;" + variableTerm;
  } else if (trigFunction == "cos") {
    trigDerivative1 = "\\sin(" + variableTerm + ")";
    trigDerivative2 = "\\sin" + variableTerm;
    trigDerivative3 = "\\sin\\;" + variableTerm;
    isNegative = true;
  } else if (trigFunction == "tan") {
    trigDerivative1 = "\\sec^2(" + variableTerm + ")";
    trigDerivative2 = "\\sec^2" + variableTerm;
    trigDerivative3 = "\\sec^2\\;" + variableTerm;    
  }  else if (trigFunction == "csc") {
    trigDerivative1 = "\\csc(" + variableTerm + ")\\cot(" + variableTerm + ")";
    trigDerivative2 = "\\csc" + variableTerm + "\\cot" + variableTerm;
    trigDerivative3 = "\\csc\\;" + variableTerm + "\\cot\\;" + variableTerm;
    isNegative = true;
  } else if (trigFunction == "sec") {
    trigDerivative1 = "\\sec(" + variableTerm + ")\\tan(" + variableTerm + ")";
    trigDerivative2 = "\\sec" + variableTerm + "\\tan" + variableTerm;
    trigDerivative3 = "\\sec\\;" + variableTerm + "\\tan\\;" + variableTerm;
  } else if (trigFunction == "cot") {
    trigDerivative1 = "\\csc^2(" + variableTerm + ")";
    trigDerivative2 = "\\csc^2" + variableTerm;
    trigDerivative3 = "\\csc^2\\;" + variableTerm;        
    isNegative = true;
  }
  return [trigDerivative1, trigDerivative2, trigDerivative2, isNegative];
}

function setVariableDerivative(variableTerm) {

}

function simpleTrigonometric () {
  let coefficient = pickCoefficient();
  // let variableTerm = pickVariableTerm(11, 14);
  let variableTerm = 'x';
  let trigFunction = pickTrigFunction();
  let questionLatex = coefficient + trigFunction + variableTerm;
  let answerLatexArray = buildAnswerLatex(coefficient, trigFunction, variableTerm);
  return [questionLatex, answerLatexArray]
}

function simpleChainRuleTrigonometric() {
  let coefficient = pickCoefficient();
  let [variableTerm, variableDerivative] = pickVariableTerm("simpleChainRule");
  let trigFunction = pickTrigFunction();
  let questionLatex = coefficient + trigFunction + variableTerm;
  let answerLatexArray = buildAnswerLatex(coefficient, trigFunction, variableTerm);
  answerLatexArray = [answerLatexArray[0] + variableDerivative];
  return [questionLatex, answerLatexArray]
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
    simpleTrigonometric,
    simpleChainRuleTrigonometric,   
  }
  