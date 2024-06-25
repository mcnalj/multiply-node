import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './exponentsSummer.component.summerPrep.scss';

import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

// TODO: Rewrite this entire component using map and a state object for the class(es)
// of each button instead of the hardcoaded HTML and dozens of stateVariables;


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

function populateQuestionArray (arrayLength=5, includeLevel1=true, includeLevel2=false, includeLevel3=false) {

  let randomizedQuestionArray = []
  let picked = [];
  let filteredArray = exponentsMatches.filter(obj => obj.level === 1);
  while (randomizedQuestionArray.length < arrayLength) {
    let pickIndex = getRandomIntInclusive(0, (filteredArray.length-1));
    let spliced = filteredArray.splice(pickIndex,1);
    randomizedQuestionArray.push(spliced[0]);
  }
  return randomizedQuestionArray;
}
function setLeftOptions(array) {
  let leftOptions = array.map(item => item.leftLatex)
  leftOptions = shuffle(leftOptions);
  return leftOptions;
}
function setRightOptions(array) {
  let rightOptions = array.map(item => item.rightLatex)
  rightOptions = shuffle(rightOptions);
  return rightOptions;
}

function shuffle(array) {
  for (let i=array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let randomizedQuestionArray = populateQuestionArray(5, true, false, false)
let leftOptions = setLeftOptions(randomizedQuestionArray);
let rightOptions = setRightOptions(randomizedQuestionArray);


export default function ExponentsSummer({username}) {
  const [leftSelect, setLeftSelected] = useState("");
  const [rightSelect, setRightSelected] = useState("");
  const [leftClickedIndex, setLeftClickedIndex] = useState(-1);
  const [rightClickedIndex, setRightClickedIndex] = useState(-1);
  const [isZeroClicked, setIsZeroClicked] = useState(false);
  const [isOneClicked, setIsOneClicked] = useState(false);
  const [isTwoClicked, setIsTwoClicked] = useState(false);
  const [isThreeClicked, setIsThreeClicked] = useState(false);
  const [isFourClicked, setIsFourClicked] = useState(false);
  const [isFiveClicked, setIsFiveClicked] = useState(false);
  const [isSixClicked, setIsSixClicked] = useState(false);
  const [isSevenClicked, setIsSevenClicked] = useState(false);
  const [isEightClicked, setIsEightClicked] = useState(false);
  const [isNineClicked, setIsNineClicked] = useState(false);
  const [isZeroMatched, setIsZeroMatched] = useState(false);
  const [isOneMatched, setIsOneMatched] = useState(false);
  const [isTwoMatched, setIsTwoMatched] = useState(false);
  const [isThreeMatched, setIsThreeMatched] = useState(false);
  const [isFourMatched, setIsFourMatched] = useState(false);
  const [isFiveMatched, setIsFiveMatched] = useState(false);
  const [isSixMatched, setIsSixMatched] = useState(false);
  const [isSevenMatched, setIsSevenMatched] = useState(false);
  const [isEightMatched, setIsEightMatched] = useState(false);
  const [isNineMatched, setIsNineMatched] = useState(false);
  const [isZeroIncorrect, setIsZeroIncorrect] = useState(false);
  const [isOneIncorrect, setIsOneIncorrect] = useState(false);
  const [isTwoIncorrect, setIsTwoIncorrect] = useState(false);
  const [isThreeIncorrect, setIsThreeIncorrect] = useState(false);
  const [isFourIncorrect, setIsFourIncorrect] = useState(false);
  const [isFiveIncorrect, setIsFiveIncorrect] = useState(false);
  const [isSixIncorrect, setIsSixIncorrect] = useState(false);
  const [isSevenIncorrect, setIsSevenIncorrect] = useState(false);
  const [isEightIncorrect, setIsEightIncorrect] = useState(false);
  const [isNineIncorrect, setIsNineIncorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function clearClicks(column, indexNotCleared) {
    if (indexNotCleared != 0) {
      if (column == "left") {
        setIsZeroClicked(false);
      } else {
        setIsFiveClicked(false);
      }
    }
    if (indexNotCleared != 1) {
      if (column == "left") {
        setIsOneClicked(false);
      } else {
        setIsSixClicked(false);
      }
    }
    if (indexNotCleared != 2) {
      if (column == "left") {
        setIsTwoClicked(false);
      } else {
        setIsSevenClicked(false);
      }
    }
    if (indexNotCleared != 3) {
      if (column == "left") {
        setIsThreeClicked(false);
      } else {
        setIsEightClicked(false);
      }
    }
    if (indexNotCleared != 4) {
      if (column == "left") {
        setIsFourClicked(false);
      } else {
        setIsNineClicked(false);
      }
    }
  }

  function setIsClicked(column, clickedIndex, time) {
    if (clickedIndex == 0) {
      if (column == "left") {
        setIsZeroClicked(!isZeroClicked);
      } else {
        setIsFiveClicked(!isFiveClicked);
      }
    } else if (clickedIndex === 1) {
      if (column == "left") {
        setIsOneClicked(!isOneClicked);
      } else {
        setIsSixClicked(!isSixClicked);
      }
    } else if (clickedIndex === 2) {
      if (column == "left") {
        setIsTwoClicked(!isTwoClicked);
      } else {
        setIsSevenClicked(!isSevenClicked);
      }
    } else if (clickedIndex === 3) {
      if (column == "left") {
        setIsThreeClicked(!isThreeClicked);
      } else {
        setIsEightClicked(!isEightClicked);
      }
    } else if (clickedIndex === 4) {
      if (column == "left") {
        setIsFourClicked(!isFourClicked);
      } else {
        setIsNineClicked(!isNineClicked);
      }
    }
    if (time == "first") {
      clearClicks(column, clickedIndex);
    }
  }
  function setIsMatchedLeft(index) {
    if (index == 0) {
      setIsZeroMatched(true);
    }
    if (index == 1) {
      setIsOneMatched(true);
    }
    if (index == 2) {
      setIsTwoMatched(true);
    }
    if (index == 3) {
      setIsThreeMatched(true);
    }
    if (index == 4) {
      setIsFourMatched(true);
    }
  }

  function setIsMatchedRight(index) {
    if (index == 0) {
      setIsFiveMatched(true);
    }
    if (index == 1) {
      setIsSixMatched(true);
    }
    if (index == 2) {
      setIsSevenMatched(true);
    }
    if (index == 3) {
      setIsEightMatched(true);
    }
    if (index == 4) {
      setIsNineMatched(true);
    }
  }

  function setIsIncorrectLeft(index) {
    if (index == 0) {
      setIsZeroIncorrect(true);
    }
    if (index == 1) {
      setIsOneIncorrect(true);
    }
    if (index == 2) {
      setIsTwoIncorrect(true);
    }
    if (index == 3) {
      setIsThreeIncorrect(true);
    }
    if (index == 4) {
      setIsFourIncorrect(true);
    }
  }

  function setIsIncorrectRight(index) {
    if (index == 0) {
      setIsFiveIncorrect(true);
    }
    if (index == 1) {
      setIsSixIncorrect(true);
    }
    if (index == 2) {
      setIsSevenIncorrect(true);
    }
    if (index == 3) {
      setIsEightIncorrect(true);
    }
    if (index == 4) {
      setIsNineIncorrect(true);
    }
  }

  function clearAllIncorrects() {
    setIsZeroIncorrect(false);
    setIsOneIncorrect(false);
    setIsTwoIncorrect(false);
    setIsThreeIncorrect(false);
    setIsFourIncorrect(false);
    setIsFiveIncorrect(false);
    setIsSixIncorrect(false);
    setIsSevenIncorrect(false);
    setIsEightIncorrect(false);
    setIsNineIncorrect(false);
  }

  function clearAllIsClicked() {
    setIsZeroClicked(false);
    setIsOneClicked(false);
    setIsTwoClicked(false);
    setIsThreeClicked(false);
    setIsFourClicked(false);
    setIsFiveClicked(false);
    setIsSixClicked(false);
    setIsSevenClicked(false);
    setIsEightClicked(false);
    setIsNineClicked(false);
  }

  function checkIfFinished(clickedIndex) {
    // We have to use clickedIndex to keep track of the most recent match because state is not updated 
    // on the most recent match for some reason
    let leftColumnStatus = [isZeroMatched, isOneMatched, isTwoMatched, isThreeMatched, isFourMatched];
    for (let i = 0; i < 5; i++) {
      if (!leftColumnStatus[i] && (i != clickedIndex)) {
        return false;
      }
    }
    return true;
  }
  // I can get the index by looking for the value in leftOptions and finding the index.
  // Then hold the index and have a different state variable for each index
  function onLeftClick (value) {
    if (rightSelect) {
      let clickedIndex = leftOptions.indexOf(value);
      setIsClicked("left", clickedIndex, "second");
      let matchesIndex = exponentsMatches.findIndex(obj => obj.rightLatex === rightSelect);
      if (value == exponentsMatches[matchesIndex].leftLatex) { // correct
        setIsMatchedLeft(clickedIndex);
        setIsMatchedRight(rightClickedIndex);
        let tempFinished = checkIfFinished(clickedIndex);
        if (tempFinished) {
          setIsFinished(true);
          setSuccessMessage("Excellent!");
        }
      } else { // incorrect
        setIsIncorrectRight(rightClickedIndex)
        setIsIncorrectLeft(clickedIndex)
        setTimeout(function() {
          clearAllIncorrects();
          clearAllIsClicked();
        }, 1500)
      }
      setRightSelected("");
      setRightClickedIndex(-1);
      // setClickedIndex(-1);
    } else {
      setLeftSelected(value);
      let clickedIndex = leftOptions.indexOf(value);
      // setClickedIndex(clickedIndex);
      setIsClicked("left", clickedIndex, "first");
      setLeftClickedIndex(clickedIndex);
    }
  }
  
  function onRightClick(value) {
    if (leftSelect) {
      let clickedIndex = rightOptions.indexOf(value);
      setIsClicked("right", clickedIndex, "second");
      let matchesIndex = exponentsMatches.findIndex(obj => obj.leftLatex === leftSelect);
      if (value == exponentsMatches[matchesIndex].rightLatex) { // correct
        setIsMatchedRight(clickedIndex);
        setIsMatchedLeft(leftClickedIndex);
        let tempFinished = checkIfFinished(leftClickedIndex);
        if (tempFinished) {
          setIsFinished(true);
          setSuccessMessage("Excellent!");
        }
      } else { // incorrect
        setIsIncorrectRight(clickedIndex)
        setIsIncorrectLeft(leftClickedIndex)
        setTimeout(function() {
          clearAllIncorrects();
          clearAllIsClicked();
        }, 1500)
      }
      setLeftSelected("");
      setLeftClickedIndex(-1);
    } else {
      setRightSelected(value);
      let clickedIndex = rightOptions.indexOf(value);
      // setClickedIndex(clickedIndex);
      setIsClicked("right", clickedIndex, "first");
      setRightClickedIndex(clickedIndex);
    }  
  }
  
  return (
      <div>
      <div className={`col-12 p-3 ${isFinished ? 'finished': 'matching'}`}>
        <div className="row">
            <div className="col-6 text-center mt-2">
              <Button onClick={()=> onLeftClick(leftOptions[0])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isZeroClicked ? 'clicked' : ''} ${isZeroMatched ? 'matched' : ''} ${isZeroIncorrect ? 'incorrect' : ''}`}><StaticMathField>{leftOptions[0]}</StaticMathField></Button>
            </div>
            <div className="col-6 text-center mt-2">
              <Button onClick={() => onRightClick(rightOptions[0])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isFiveClicked ? 'clicked' : ''} ${isFiveMatched ? 'matched' : ''} ${isFiveIncorrect ? 'incorrect' : ''}`}><StaticMathField>{rightOptions[0]}</StaticMathField></Button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-6 text-center mt-2">
              <Button onClick={()=> onLeftClick(leftOptions[1])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isOneClicked ? 'clicked' : ''} ${isOneMatched ? 'matched' : ''} ${isOneIncorrect ? 'incorrect' : ''}`}><StaticMathField>{leftOptions[1]}</StaticMathField></Button>
            </div>
            <div className="col-6 text-center mt-2">
              <Button onClick={() => onRightClick(rightOptions[1])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isSixClicked ? 'clicked' : ''} ${isSixMatched ? 'matched' : ''} ${isSixIncorrect ? 'incorrect' : ''}`}><StaticMathField>{rightOptions[1]}</StaticMathField></Button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-6 text-center mt-2">
              <Button onClick={()=> onLeftClick(leftOptions[2])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isTwoClicked ? 'clicked' : ''} ${isTwoMatched ? 'matched' : ''} ${isTwoIncorrect ? 'incorrect' : ''}`}><StaticMathField>{leftOptions[2]}</StaticMathField></Button>
            </div>
            <div className="col-6 text-center mt-2">
              <Button onClick={() => onRightClick(rightOptions[2])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isSevenClicked ? 'clicked' : ''} ${isSevenMatched ? 'matched' : ''} ${isSevenIncorrect ? 'incorrect' : ''}`}><StaticMathField>{rightOptions[2]}</StaticMathField></Button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-6 text-center mt-2">
              <Button onClick={()=> onLeftClick(leftOptions[3])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isThreeClicked ? 'clicked' : ''} ${isThreeMatched ? 'matched' : ''} ${isThreeIncorrect ? 'incorrect' : ''}`}><StaticMathField>{leftOptions[3]}</StaticMathField></Button>
            </div>
            <div className="col-6 text-center mt-2">
              <Button onClick={() => onRightClick(rightOptions[3])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isEightClicked ? 'clicked' : ''} ${isEightMatched ? 'matched' : ''} ${isEightIncorrect ? 'incorrect' : ''}`}><StaticMathField>{rightOptions[3]}</StaticMathField></Button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-6 text-center mt-2">
              <Button onClick={()=> onLeftClick(leftOptions[4])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isFourClicked ? 'clicked' : ''} ${isFourMatched ? 'matched' : ''} ${isFourIncorrect ? 'incorrect' : ''}`}><StaticMathField>{leftOptions[4]}</StaticMathField></Button>
            </div>
            <div className="col-6 text-center mt-2">
              <Button onClick={() => onRightClick(rightOptions[4])} variant="outline-light" className={`col-12 fs-3 p-1 box ${isNineClicked ? 'clicked' : ''} ${isNineMatched ? 'matched' : ''} ${isNineIncorrect ? 'incorrect' : ''}`}><StaticMathField>{rightOptions[4]}</StaticMathField></Button>
            </div>
        </div>
      </div>
      <div className="m-0">
        <p className="fs-2">{successMessage}</p>
      </div>
      <Link to="/summerPrepTopics">
        <button type="button" className="btn btn-lg btn-success">BACK TO SUMMER TOPICS</button><br /><br />
      </Link>
    </div>
  );
}