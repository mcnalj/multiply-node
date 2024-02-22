import {
    naturalExponential,
    complexNaturalExponential,
    simpleNaturalLog,
    complexNaturalLog,
    mixNaturalExponentialAndLog,
    exponentialFunctionsBaseA,
    logFunctionsBaseA,
  } from '../math-scripts/natural-scripts.js';

  import {
    indefiniteIntegralsSingleTerm,
    indefiniteIntegralsBinomial,
    indefiniteIntegralsPolynomial,
    indefiniteIntegralsTrigonometric,
    indefiniteIntegralsNaturalExponential,
    indefiniteIntegralsNaturalLog,
    indefiniteIntegralsNaturalLogBinomial,
    definiteIntegrals,  
  } from '../math-scripts/integral-scripts.js';

export const questionTopics = {
    "derivatives": [
        {
            topicId: 500,
            topicName: "naturalExponential",
            questionEngine: naturalExponential,
        },
        {
            topicId: 510,
            topicName: "complexNaturalExponential",
            questionEngine: complexNaturalExponential,
        },
        {
            topicId: 520,
            topicName: "simpleNaturalLog",
            questionEngine: simpleNaturalLog,
        },
        {
            topicId: 530,
            topicName: "complexNaturalLog",
            questionEngine: complexNaturalLog,
        },
        {
            topicId: 540,
            topicName: "mixNaturalExponentialAndLog",
            questionEngine: mixNaturalExponentialAndLog,
        },
        {
            topicId: 550,
            topicName: "exponentialFunctionsBaseA",
            questionEngine: exponentialFunctionsBaseA,
        },
        {
            topicId: 560,
            topicName: "logFunctionsBaseA",
            questionEngine: logFunctionsBaseA,
        },
    ],
    "integrals": [
        {
            topicId: 3010,
            topicName: "indefiniteIntegralsSingleTerm",
            questionEngine: indefiniteIntegralsSingleTerm
        },
        {
            topicId: 3020,
            topicName: "indefiniteIntegralsBinomial",
            questionEngine: indefiniteIntegralsBinomial
        },
        {
            topicId: 3030,
            topicName: "indefiniteIntegralsPolynomial",
            questionEngine: indefiniteIntegralsPolynomial
        },
        {
            topicId: 3040,
            topicName: "indefiniteIntegralsTrigonometric",
            questionEngine: indefiniteIntegralsTrigonometric
        },
        {
            topicId: 3050,
            topicName: "indefiniteIntegralsNaturalExponential",
            questionEngine: indefiniteIntegralsNaturalExponential
        },
        {
            topicId: 3060,
            topicName: "indefiniteIntegralsNaturalLog",
            questionEngine: indefiniteIntegralsNaturalLog
        },
        {
            topicId: 3070,
            topicName: "indefiniteIntegralsNaturalLogBinomial",
            questionEngine: indefiniteIntegralsNaturalLogBinomial
        },        
        {
            topicId: 3080,
            topicName: "definiteIntegrals",
            questionEngine: definiteIntegrals
        },
    ]
  }