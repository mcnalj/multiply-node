import React, { useState, useEffect  } from "react";
import { Card, Form } from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './derivativeRules.component.flashcards.scss';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles()

export default function DerivativeRules({username}) {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleFlip = () => {
        console.log(isFlipped);
        setIsFlipped(!isFlipped);
    };
    return(
        <div>
            <div className="row">
                <div className="col-4 offset-4 container">
                    <Card className={`flip-card ${isFlipped ? "flipped" : ''}`}>
                        <Card.Body className="flip-card-inner">
                            <div className="front" onClick={handleFlip}>
                                <div className="card-content">
                                <div className="row">
                                    <p className="title-section">CONSTANT MULTIPLE RULE</p>
                                </div>
                                <div className="row">
                                    <p className="content-section"><StaticMathField>{"\\frac{d}{dx}[C \\quad (f(x))]"}</StaticMathField></p>
                                </div>
                                </div>
                            </div>
                            <div className="back" onClick={handleFlip}>
                                <div className="card-content">
                                <div className="row">
                                    <p className="title-section">CONSTANT MULTIPLE RULE</p>
                                </div>
                                <div className="row">
                                    <p className="content-section"><StaticMathField>{"C \\quad (f'(x))"}</StaticMathField></p>
                                </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <SliderComponent />
            </div> 
        </div>
    )
}

function SliderComponent() {
    const [sliderValue, setSliderValue] = useState(20);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    }
    return (
        <div className="col-6 offset-3">
            <Form.Label>Confidence: {sliderValue}%</Form.Label>
            <Form.Range
                value={sliderValue}
                onChange={handleSliderChange}
                step="5"
            />
        </div>
    );
};



// return(
//     <div className="row">
//     <div className="col-4 offset-4 mt-2">
//     <Card
//         className={`flippable-card ${isFlipped ? 'flipped' : ''}`}
//         onClick={handleFlip}
//     >
//         <Card.Body>
//         <div className={`card-side front ${isFlipped ? 'hidden' : ''}`}>
//             <Card.Text>This is the question.</Card.Text>
//         </div>
//         <div className={`card-side back ${isFlipped ? '' : 'hidden'}`}>
//             <Card.Text>This is the answer</Card.Text>
//         </div>
//         </Card.Body>
//     </Card>
//     </div>
//     </div>
// );


// return(
//     <div>
//         <div className="row">
//             <div className="col-4 offset-4">
//                 <Card className={`card ${isFlipped ? "flipped" : ''}`}>
//                     <Card.Body>
//                         <div className={`front ${isFlipped ? "hidden" : ''}`} onClick={handleFlip}>
//                             <div className="row">
//                                 <p className="title-section">CONSTANT MULTIPLE RULE</p>
//                             </div>
//                             <div className="row">
//                                 <p className="content-section"><StaticMathField>{"\\frac{d}{dx}[C \\quad (f(x))]"}</StaticMathField></p>
//                             </div>
//                         </div>
//                         <div className={`back ${isFlipped ? "flip" : ""}`} onClick={handleFlip}>
//                             <div className="row">
//                                 <p className="title-section">CONSTANT MULTIPLE RULE</p>
//                             </div>
//                             <div className="row">
//                                 <p className="content-section"><StaticMathField>{"C \\quad (f'(x))"}</StaticMathField></p>
//                             </div>
//                         </div>
//                     </Card.Body>
//                 </Card>
//             </div>
//         </div>
//         <div className="row">
//             <SliderComponent />
//         </div> 
//     </div>
// )
