import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './identifyingFunctions.component.summerPrep.scss';

import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import {
    SinGraph
 } from '../SVGs/graphs/sinGraph.component.graphs.js';

// import '../SVGs/graphs/sinGraph.component.graphs.js'
import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

const functionData = [];

export default function IdentifyingFunctions({username}) {

    function handleClick() {

    }
    return (
        <div>
            <h1>Identifying Functions</h1>
            <div>
                <SinGraph />
            </div>
            <div className="matching">
                <div className="row mt-3">
                    <div className="col-6 text-center mt-2">
                        <Button onClick={handleClick} variant="outline-light" className={`col-12 fs-3 p-1 box`}><StaticMathField>{`\\sin(x)`}</StaticMathField></Button>
                    </div>
                    <div className="col-6 text-center mt-2">
                        <Button onClick={handleClick} variant="outline-light" className={`col-12 fs-3 p-1 box `}><StaticMathField>{`f(x)`}</StaticMathField></Button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6 text-center mt-2">
                    <Button onClick={handleClick} variant="outline-light" className={`col-12 fs-3 p-1 box `}><StaticMathField>{`cos(x)`}</StaticMathField></Button>
                    </div>
                    <div className="col-6 text-center mt-2">
                    <Button onClick={handleClick} variant="outline-light" className={`col-12 fs-3 p-1 box `}><StaticMathField>{`x^2`}</StaticMathField></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}