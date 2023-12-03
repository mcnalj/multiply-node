import {
    naturalExponential,
    complexNaturalExponential,
    simpleNaturalLog,
    complexNaturalLog,
    mixNaturalExponentialAndLog,
    exponentialFunctionsBaseA,
    logFunctionsBaseA,
  } from '../math-scripts/natural-scripts.js';

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
  


  
    ]
  }