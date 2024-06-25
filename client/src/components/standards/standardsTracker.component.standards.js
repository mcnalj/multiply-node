import React, { useState, useRef, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './derivativeRulesStandards.component.standards.scss';

import {
  standards
} from '../infrastructure/standards.js';


import { config } from '../constants.js';
var url = config.url.API_URL;

export default function StandardsTracker({username}) {

  const parameter = useParams()
  var category = parameter.categoryWord;
  var topic = parameter.topic;
  console.log(parameter);

  const standardsObj = standards.find((standardsInfo) => standardsInfo.id === category)
  const standardsArray = standardsObj.topicsArray;
  const standardTopic = standardsArray.find((standardTopic) => standardTopic.id == topic)
  const standardInfo = standardTopic?.topicStandards;

  console.log(standardInfo)

  var confidenceLevelObject = {
    "powerRuleConfidenceLevel": "1",
    "constantMultipleRuleConfidenceLevel": "1",
    "productRuleConfidenceLevel": "1",
    "quotientRuleConfidenceLevel": "1", 
  }

  const [confidenceLevel, setConfidenceLevel] = useState(confidenceLevelObject); 
  useEffect(() => {
    // fetchStatus has side effects, what would be the noside effect pattern
    fetchStatus();
  }, []);

  async function fetchStatus() {
    try {
      const response = await fetch(`${url}/record/getStandardsProgress`, {
          method: "POST",
          mode: 'cors',
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }

      const resultData = await response.json();

      if (resultData && resultData.progressObj) {
        setConfidenceLevel(resultData.progressObj);
      } else {
        console.warn('Data format is unexpected', resultData);
      }
    } catch(error) {
        console.error('Error fetching data:', error);
        // should show a message to the user here, maybe
    }
  }
  // const standard = "derivatives"
  // const topicName = "derivativesRules"
  const [buttonState, setButtonState] = useState({variant: "info", disabled: true});

  let sessionData = {
    userData: {
        username: username,
    },
    progress: {
      standards: {
          [category]: {
              [topic]: confidenceLevel
          }
      }        
    }
  }

  const handleConfidenceChange = (e) => {
    // console.log(e.target.id);
    // if(e.target.id == "powerRuleConfidenceLevel") {
    //   setConfidenceLevel({...confidenceLevel, "powerRuleConfidenceLevel": e.target.value})
    // } else if (e.target.id == "constantMultipleRuleConfidenceLevel") {
    //   setConfidenceLevel({...confidenceLevel, "constantMultipleRuleConfidenceLevel": e.target.value})
    // }
    setConfidenceLevel({...confidenceLevel, [e.target.id]: e.target.value})
    setButtonState({variant: "primary", disabled: false});
  };

  async function saveUpdate() {
    console.log(confidenceLevel);
    const response = await fetch(`${url}/record/saveProgressUpdate`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    const answer = await response.json();
    // show a message to the user  -- update success or failure
    setButtonState({variant: 'info', disabled: true});
    // we need to go somewhere from here.
  };

  // var standardInfo = [
  //   { 
  //     "standardTitle": "Power Rule",
  //     "standardDescription": "I can find the derivative of exponential terms.",
  //     "standardExample":`\\frac{d}{dx}\\left[x^3\\right] = 3x^2 dx`,
  //     "id": "powerRuleConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Constant Multiple Rule",
  //     "standardDescription": "I can find the derivative of terms that are multiplied by a constant coefficient.",
  //     "standardExample":`\\frac{d}{dx}\\left[2x^3\\right] = 2\\frac{d}{dx}\\left[x^3\\right] = 2\\left[3x^2 dx\\right] = 6x^2 dx`,
  //     "id": "constantMultipleRuleConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Product Rule",
  //     "standardDescription": "I can find the derivative of two functions multiplied together.",
  //     "standardExample":`\\frac{d}{dx}\\left[x^4 sin x\\right] = \\left(x^4 cos x+ 4x^3 sin x\\right) dx`,
  //     "id": "productRuleConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Quotient Rule",
  //     "standardDescription": "I can find the derivative or a rational function (one that involves division).",
  //     "standardExample":`\\frac{d}{dx}\\left[\\frac{x^4}{sin x}\\right] = \\left(\\frac{((sin x)(4x^3)) - ((cos x)(x^4))}{(sin x)^2} \\right)dx = \\left(\\frac{4x^3 sin x - x^4 cos x}{sin^2 x} \\right)dx`,
  //     "id": "quotientRuleConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Trigonometric Functions",
  //     "standardDescription": "I can find the derivative of functions involving the sine, cosine, tangent, cosecant, secant, and cotangent.",
  //     "standardExample":`\\frac{d}{dx}\\left[tax x \\right] = sec^2 x dx`,
  //     "id": "trigonometricConfidenceLevel"
  //   },    
  //   { 
  //     "standardTitle": "Chain Rule",
  //     "standardDescription": "I can find the derivative of a composite function.",
  //     "standardExample":`\\frac{d}{dx}\\left[sin \\left(2x^3\\right)\\right] = sin\\left(2x^3\\right)6x^2 dx`,
  //     "id": "chainRuleConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Natural Exponential",
  //     "standardDescription": "I can find the derivative of functions with e as the base raised to the x power. (This requires the chain rule.)",
  //     "standardExample":`\\frac{d}{dx}\\left[e^{3x^2}\\right] = e^{3x^2}6x dx`,
  //     "id": "naturalExponentialConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Natural Log",
  //     "standardDescription": "I can find the derivative of functions involving the natural log. (This requires the chain rule.)",
  //     "standardExample":`\\frac{d}{dx}\\left[\\ln(2x^2 + 3)\\right] = \\left(\\frac{4x}{2x^2 + 3}\\right)dx`,
  //     "id": "naturalLogConfidenceLevel"
  //   },                                        
  //   { 
  //     "standardTitle": "Exponential Functions",
  //     "standardDescription": "I can find the derivative of functions with any based raised to the x power. (This requires the chain rule.)",
  //     "standardExample":`\\frac{d}{dx}\\left[6^x\\right] = ln(6)6^x dx`,
  //     "id": "exponentialConfidenceLevel",
  //   },
  //   {
  //     "standardTitle": "Logarithmic Functions",
  //     "standardDescription": "I can find the derivative of functions involving logarithms with any base. (This requires the chain rule.)",
  //     "standardExample":`\\frac{d}{dx}\\left[log_4{x}\\right] = \\left(\\frac{1}{ln(4)x}\\right)dx`,
  //     "id": "logarithmicConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Inverse Functions",
  //     "standardDescription": "I can find the derivative of inverse fuctions. (You haven't seen this, p. 178 in your book.)",
  //     "standardExample":`\\frac{d}{dx}\\left[f^{-1}(x)\\right] = \\left(\\frac{1}{f'\\left(f^{-1}(x)\\right)}\\right)dx`,
  //     "id": "inverseConfidenceLevel"
  //   },
  //   { 
  //     "standardTitle": "Inverse Trigonometric Functions",
  //     "standardDescription": "I can find the derivative of arcsine, arccosine, and arctangent. (You haven't seen this, p. 179 in your book.)",
  //     "standardExample":`\\frac{d}{dx}\\left[sin{-1}x\\right] = \\left(\\frac{1}{\\sqrt{1-x^2}}\\right)dx`,
  //     "id": "inverseTrigonometricConfidenceLevel"
  //   },                                                                                                                                                                            

  // ]

  addStyles();
  return (
    <div>
      <h2>Derivative Rules - Record Your Progress</h2>
      <Button
        variant={buttonState.variant}
        type="submit"
        size="lg"
        onClick={saveUpdate}
        disabled={buttonState.disabled}
        active ="false" 
      >
        UPDATE PROGRESS
      </Button>
      <NavLink to={"/standardsTopics/" + category}>
        <Button type="button" variant="primary" size="lg">BACK TO TOPICS</Button>
      </NavLink>
      {standardInfo ? (
      standardInfo.map(function(standard) {
        const formValue = confidenceLevel.hasOwnProperty(standard.id) ? confidenceLevel[standard.id] : "1";

        return (
          <div className="standardBox" key={standard.id}>
            <p className="standardTitle">{standard.standardTitle}</p>
            <p>{standard.standardDescription}</p>
            <p>Example: <StaticMathField>{standard.standardExample}</StaticMathField></p>
            <div className="rangeBox">
              <Form.Range
                value={formValue}
                name="confidence"
                onChange={handleConfidenceChange}
                min="0"
                max="10"
                step="1"
                className="customRange"
                id={standard.id}
              />
              <p className="rangeLevelLabel">Confidence Level: {formValue}</p>
            </div>
          </div>
        )
      })
      ) : (
        <p>Sorry, there are no standards related to this topic.</p>
      )
      }
    </div>
  );
};