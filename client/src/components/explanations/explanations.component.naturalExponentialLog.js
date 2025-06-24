import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
// import './calculus.component.derivatives.scss';

import {
  questionTopics
} from '../infrastructure/question-topics.js';

addStyles();

export default function NaturalExponential({show, handleClose}){
  console.log("Inside natural")
  console.log(show)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Derivative of the Natural Exponential</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The natural exponential function is its own derivative: </p>
        <div className="row">
          <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} e^x = e^x`}</StaticMathField>
        </div>
        <p>When the x term is multiplied by a coefficient, we apply the chain rule to find the derivative. </p>
        <div className="row">
          <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} e^u = e^u u'`}</StaticMathField><br />
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <StaticMathField className="text-end">{`\\frac{d}{dx} e^{4x} = e^{4x} \\cdot 4`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} e^{4x} = 4e^{4x}`}</StaticMathField>
          </div>
          <div className="col-4">
            <StaticMathField className="text-end">{`\\frac{d}{dx} 3e^{5x} = 3e^{5x} \\cdot 5`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} 3e^{5x} = 15e^{5x}`}</StaticMathField>
          </div>            
          <div className="col-4">
            <StaticMathField className="text-end">{`\\frac{d}{dx} 2e^{-\\frac{1}{3}x} = 2e^{-\\frac{1}{3}x} \\cdot -\\frac{1}{3}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} 2e^{-\\frac{1}{3}x} = -\\frac{2}{3}e^{-\\frac{1}{3}x}`}</StaticMathField>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function NaturalLog({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Derivative of the Natural Log</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The term inside the logarithm (the argument) gets pushed to the denominator. The derivative of the argument stays in the numerator.</p>
        <div className="row">
          <div className="col-4 offset-1 text-center">
            <StaticMathField>{`\\frac{d}{dx} lnx = \\frac{1}{x}`}</StaticMathField>
          </div>
          <div className="col-4 offset-1 text-center">
          <StaticMathField>{`\\frac{d}{dx} lnu = \\frac{u'}{u}`}</StaticMathField><br />
          </div>            
        </div>        
        <div className="row mt-3">
          <div className="col-4">
            <p>Example 1</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x = \\frac{3}{3x}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x = \\frac{1}{x}`}</StaticMathField>
          </div>
          <div className="col-4">
            <p>Example 2</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 17x = \\frac{17}{17x}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 17x = \\frac{1}{x}`}</StaticMathField>
          </div>          
          <div className="col-4">
            <p>Example 3</p>  
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln \\frac{2}{3}x = \\frac{\\frac{2}{3}}{\\frac{2}{3}x}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln \\frac{2}{3}x = {\\frac{1}{x}}`}</StaticMathField>
          </div>
        </div>
        <p>The examples above show that the derivative of <StaticMathField>{`ln cx`}</StaticMathField> will simplify to <StaticMathField>{`\\frac{1}{x}`}</StaticMathField>.</p>
        <div className="row mt-3">
          <div className="col-4">
            <p>Example 4</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^4 = \\frac{4x^3}{x^4}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^4 = \\frac{4}{x}`}</StaticMathField>
          </div>
          <div className="col-4">
            <p>Example 5</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^7 = \\frac{7x^6}{x^7}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^7 = \\frac{7}{x}`}</StaticMathField>
          </div>          
          <div className="col-4">
            <p>Example 6</p>  
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x^2 = \\frac{6x}{3x^2}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x^2 = \\frac{2}{x}`}</StaticMathField>
          </div>
        </div>
        <p>Notice that the derivative of <StaticMathField>{`ln x^a`}</StaticMathField> is always <StaticMathField>{`\\frac{a}{x}`}</StaticMathField>.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function NaturalLogBinomials({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Derivative of the Natural Log of Binomials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The derivative is one over the binomial times the derivative of the binomial.</p>
        <div className="row">
          <div className="col-4 offset-1 text-center">
            <StaticMathField>{`\\frac{d}{dx} ln(x + b) = \\frac{1}{x + b}`}</StaticMathField>
          </div>
          <div className="col-4 offset-1 text-center">
          <StaticMathField>{`\\frac{d}{dx} ln(u + b) = \\frac{1}{u + b}\\frac{du}{dx}`}</StaticMathField><br />
          </div>            
        </div>        
        <div className="row mt-3">
          <div className="col-6">
            <p>Example 1</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(2x + 7) = \\frac{1}{2x + 7}(2)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(2x + 7) = \\frac{2}{2x + 7}`}</StaticMathField><br />
          </div>
          <div className="col-6">
            <p>Example 2</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(x^3 + 4) = \\frac{1}{x^3 + 4}(3x^2)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(x^3 + 4) = \\frac{3x^2}{x^3 + 4}`}</StaticMathField>
          </div>          
        </div>
        <div className="row mt-3">
          <div className="col-6 offset-3">
            <p>Example 3</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(4x^5 + 8) cos x = \\frac{1}{4x^5 + 8}(20x^4)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln(4x^5 + 8) cos x = \\frac{20x^4}{4x^5 + 8}`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10 offset-1">
            <p>For these questions, calculus cirucs can only handle unsimplified fractions. So no need to factor and reduce the fractions.</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function ExponentialBaseA({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Derivative of Exponential Functions with Base Other Than e</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The derivative is the natural log of the base times the exponential times the derivative of the exponent.</p>
        <div className="row">
          <div className="col-4 offset-1 text-center">
            <StaticMathField>{`\\frac{d}{dx} b^x = ln(b)b^x`}</StaticMathField>
          </div>
          <div className="col-4 offset-1 text-center">
          <StaticMathField>{`\\frac{d}{dx} b^u = ln(b)b^u(u')`}</StaticMathField><br />
          </div>            
        </div>        
        <div className="row mt-3">
          <div className="col-6">
            <p>Example 1</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5^x = ln(5)5^x`}</StaticMathField><br />
          </div>
          <div className="col-6">
            <p>Example 2</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 4^{3x} = ln(4)4^{3x}(3)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} ln 4^{3x} = (3 ln 4)4^{3x}`}</StaticMathField>
          </div>          
        </div>
        <div className="row mt-3">
          <div className="col-6 offset-3">
            <p>Example 3</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} 3^{x^2} = ln(3)3^{x^2}(2x)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} 3^{x^2} = (2 ln 3)x3^{x^2}`}</StaticMathField><br />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function LogBaseA({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Derivative of Log Functions with Base Other Than e</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The derivative follows the patterns presented below.</p>
        <div className="row">
          <div className="col-4 offset-1 text-center">
            <StaticMathField>{`\\frac{d}{dx} log_a x = \\frac{1}{(ln a)x}`}</StaticMathField>
          </div>
          <div className="col-4 offset-1 text-center">
          <StaticMathField>{`\\frac{d}{dx} log_a u = \\frac{1}{(ln a)u}\\frac{du}{}dx}`}</StaticMathField><br />
          </div>            
        </div>        
        <div className="row mt-3">
          <div className="col-6">
            <p>Example 1</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} log_3 x = \\frac{1}{(ln 3)x}`}</StaticMathField><br />
          </div>
          <div className="col-6">
            <p>Example 2</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} log_5 4x = \\frac{1}{(ln 5)(4x)}(4)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} log_5 4x = \\frac{4}{(ln 5)(4x)}`}</StaticMathField>
          </div>          
        </div>
        <div className="row mt-3">
          <div className="col-6 offset-3">
            <p>Example 3</p>
            <StaticMathField className="text-end">{`\\frac{d}{dx} log_{10} cos x = \\frac{1}{(ln 10)(cos x)}(-sin x)`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} log_{10} cos x = \\frac{-sin x}{(ln 10)(cos x)}`}</StaticMathField><br />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}