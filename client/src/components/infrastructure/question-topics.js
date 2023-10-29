import {
    naturalExponential,
    complexNaturalExponential,
    simpleNaturalLog,
    complexNaturalLog,
    mixNaturalExponentialAndLog
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
            topicName: "comlexNaturalExponential",
            questionEngine: complexNaturalExponential,
          },
          {
              topicId: 520,
              topicName: "simpleNaturalLog",
              questionEngine: simpleNaturalLog,
          },
          {
              topicId: 530,
              topicName: "comlexNaturalLog",
              questionEngine: complexNaturalLog,
          },
          {
              topicId: 540,
              topicName: "mixNaturalExponentialAndLog",
              questionEngine: mixNaturalExponentialAndLog,
          },
  
      ]
  }