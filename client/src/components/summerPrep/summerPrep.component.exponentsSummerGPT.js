import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'
import { Link } from "react-router-dom";

import '../../App.scss';
import '../../index.scss';
import './summerPrep.component.exponentsSummer.scss';

import {
  MatchingComponent
} from '../infrastructure/answerComponents/matchingComponent.component.answerComponents.js';

// import confetti from 'canvas-confetti';

addStyles();

// TODO: import this from answerComponents
const exponentsMatches = [
  {
    leftLatex: `x^2`,
    rightLatex: `x \\cdot x`,
    level: 1
  },
  {
    leftLatex: `x^{-1}`,
    rightLatex: `\\frac{1}{x}`,
    level: 1
  },
  {
    leftLatex: `x^{-3}`,
    rightLatex: `\\frac{1}{x \\cdot x \\cdot x}`,
    level: 1
  },
  {
    leftLatex: `x^{-2}`,
    rightLatex: `\\frac{1}{x^2}`,
    level: 1
  },
  {
    leftLatex: `x^0`,
    rightLatex: `1`,
    level: 1
  },
  {
    leftLatex: `x^1`,
    rightLatex: `x`,
    level: 1
  },
  {
    leftLatex: `x^4`,
    rightLatex: `x \\cdot x \\cdot x \\cdot x`,
    level: 1
  },
  {
    leftLatex: `x^{-4}`,
    rightLatex: `\\frac{1}{x^4}`,
    level: 1
  },
  {
    leftLatex: `3^2`,
    rightLatex: `3 \\cdot 3`,
    level: 2
  },
  {
    leftLatex: `4^{-1}`,
    rightLatex: `\\frac{1}{4}`,
    level: 2
  },
  {
    leftLatex: `2^{-3}`,
    rightLatex: `\\frac{1}{2 \\cdot 2 \\cdot 2`,
    level: 2
  },
  {
    leftLatex: `4^{-2}`,
    rightLatex: `\\frac{1}{16}`,
    level: 2
  },
  {
    leftLatex: `3^0`,
    rightLatex: `1`,
    level: 2
  },
  {
    leftLatex: `8^1`,
    rightLatex: `8`,
    level: 2
  },
  {
    leftLatex: `5^4`,
    rightLatex: `5 \\cdot 5 \\cdot 5 \\cdot 5`,
    level: 2
  },
  {
    leftLatex: `2^{-4}`,
    rightLatex: `\\frac{1}{16}`,
    level: 2
  },
  {
    leftLatex: `x^{\\frac{1}{2}}`,
    rightLatex: `\\sqrt{x}`,
    level: 3
  },
  {
    leftLatex: `x^{\\frac{1}{3}}`,
    rightLatex: `\\sqrt[3]{x}`,
    level: 3
  },  
  {
    leftLatex: `x^{\\frac{3}{2}}`,
    rightLatex: `\\sqrt{x^3}`,
    level: 3
  },
  {
    leftLatex: `x^{\\frac{4}{3}}`,
    rightLatex: `\\sqrt[3]{x^4}`,
    level: 3
  },
  {
    leftLatex: `x^{-\\frac{1}{2}}`,
    rightLatex: `\\frac{1}{sqrt{x}}`,
    level: 3
  },
  {
    leftLatex: `x^{-\\frac{1}{3}}`,
    rightLatex: `\\frac{1}{\\sqrt[3]{x}}`,
    level: 3
  },  
  {
    leftLatex: `x^{-\\frac{3}{2}}`,
    rightLatex: `\\frac{1}{\\sqrt{x^3}}`,
    level: 3
  },
  {
    leftLatex: `x^{-\\frac{4}{3}}`,
    rightLatex: `\\frac{1}{\\sqrt[3]{x^4}}`,
    level: 3
  },
]

export default function ExponentsSummerGPT ({username,}) {
  const [isFinished, setIsFinished] = useState(false);
  const [leftOptions, setLeftOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);

  useEffect(() => {
    const randomizedQuestionArray = populateQuestionArray(exponentsMatches, 5, true, false, false);
    const options = setOptions(randomizedQuestionArray);
    setLeftOptions(options.leftOptions);
    setRightOptions(options.rightOptions);
  }, []);

  if (isFinished) {
    return (
      <div>
        <h2>Great job, {username}! You've completed the Exponents Matching Game!</h2>
        <Link to="/summerPrepTopics">
          <button type="button" className="btn btn-lg btn-success">BACK TO SUMMER TOPICS</button><br /><br />
        </Link>
      </div>
    )
  } else {
    return (
        <>
            <h2 className="text-center">Exponents Matching</h2>
            <MatchingComponent 
                matchObjects={exponentsMatches}
                leftOptions={leftOptions}
                rightOptions={rightOptions}
                setIsFinished={setIsFinished}
            />
        </>
    )
  }
}


// TODO: import these functions from answerComponents
function populateQuestionArray (matchesArray, arrayLength=5, includeLevel1=true, includeLevel2=false, includeLevel3=false) {

  const levels = [];
  if (includeLevel1) levels.push(1);
  if (includeLevel2) levels.push(2);
  if (includeLevel3) levels.push(3);

  const filteredArray = matchesArray.filter(obj => levels.includes(obj.level));
  return shuffle(filteredArray).slice(0, arrayLength);
}

function shuffle(array) {
  for (let i=array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setOptions(array) {
  const leftOptions = shuffle(array.map(item => item.leftLatex));
  const rightOptions = shuffle(array.map(item => item.rightLatex));
  return {leftOptions, rightOptions};
}



