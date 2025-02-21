import React from "react";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';

addStyles();

export default function IndefiniteIntegralsSingleTerm({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Evaluating Indefinite Integrals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To find an integral, reverse the Power Rule: increase the exponent by one and divide by the new exponent.</p>
        <div className="row">
          <p><StaticMathField className="col-4 offset-4 text-center">{`\\int x^n dx = \\frac{1}{n}x^{n+1} + C`}</StaticMathField></p>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int 3x^2 dx = \\frac{3}{3}x^{2+1} + C`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\int 3x^2 dx = x^3 + C`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int x^4 dx = \\frac{1}{5}x^{4+1} + C`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\int x^4 dx= \\frac{1}{5}x^5 + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
            <div className="col-8 offset-2">
                <p>Integrating and taking the derivative are <strong>inverse</strong> operations.</p>
                <p>After you integrate, you can check your answer by taking the derivative of your answer.</p>
                <p>If the derivative of your integral gets you back to the original function, you have integrtated correctly.</p>
                <p>This is an <strong>indefinite integral</strong> because we can add any constant to our answer.</p>
                <p>If you take the derivative of a constant you get 0, so we can add any constant to our indefinite integral and still take the derivative and get back to our original function.</p>
                <p>The <i>C</i> is called the <strong>constant of integration.</strong></p>
                <p>The <i>dx</i> tells you what you are integrating with respect to. It disappears after you integrate. It is known as a <strong>dummy variable</strong>.</p>
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

export function IndefiniteIntegralsBinomial({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Integrating a Binomial Function.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To integrate a binomial function, simply integrate each term of the function.</p>
        <div className="row">
          <StaticMathField className="col-6 offset-3 text-left">{`\\int (f(x) + g(x)) dx`}</StaticMathField>
          <StaticMathField className="col-6 offset-3 text-left">{`= \\int f(x) dx + \\int g(x) dx`}</StaticMathField>
          <StaticMathField className="col-6 offset-3 text-left">{`= F(x) +G(x) + C`}</StaticMathField>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          &nbsp; &nbsp; &nbsp;<StaticMathField className="col-6 offset-3 text-left">{`\\int (x^3 + 2x) dx`}</StaticMathField>
          <StaticMathField className="col-6 offset-3 text-left">{`= \\int x^3 dx + \\int 2x dx`}</StaticMathField>
          <StaticMathField className="col-6 offset-3 text-left">{`= \\frac{1}{4}x^4 + x^2 +C`}</StaticMathField>
        </div>
        <div className="row mt-4">
          <p>This same pattern work whether the terms are added or subtracted. It does NOT apply when terms are multiplied or divided.</p>
        </div>
        <div className="row mt-4">
          <p>The same rule applies for a polynomial term of any length. Simply integrate each term independently.</p>
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

export function IndefiniteIntegralsPolynomial({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Polynomial Integration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To integrate a polynomial, simply integrate one term at a time.</p>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{`\\int (f(x) + g(x) - h(x)) dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = \\int f(x) dx + \\int g(x) dx - \\int h(x) dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = F(x) + G(x) - H(x) + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{`\\int (3x^2 + \\frac{1}{2}x - 3) dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = \\int 3x^2 dx + \\int \\frac{1}{2}x dx - \\int 3 dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = x^3 + \\frac{1}{4}x^2 - 3x + C`}</StaticMathField><br />
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

export function IndefiniteIntegralsTrigonometric({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Integrating Trigonometric Functions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To find the integral of these trigonometric functions, ask what function has this function as its derivative?</p>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} sin x = cos xdx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int cos x dx = sin x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} cos x = -sin x dx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int sin x dx = -cos x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} tan x = sec^2 x dx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int sec^2 x dx = tan x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} csc x = (-csc x cot x) dx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int (csc x cot x) dx = -csc x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} sec x = (sec x tan x) dx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int (sec x tan x) dx = sec x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx} cot x = -csc^2 x dx`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\int csc^2 x dx = -cot x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
            <p>If there is a coefficient in front of the trigonometric function, the constant multiple rule applies.</p>
            <p>You can integrate and leave the coefficient unchanged.</p>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Examples:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int 5 sin x dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = -5 cos x + C`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int \\frac{1}{2} cos x dx`}</StaticMathField><br />
            <StaticMathField className="text-end">{` = \\frac{1}{2} sin x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
            <p>Always check yourself by taking the derivative of your answer to confirm you got the sign right.</p>
        </div>
        <div className="row mt-2">
            <p>If the coefficient is multiplying the <i>x</i> like this: <StaticMathField>{`\\int sin 3x dx`}</StaticMathField>,</p>
            <p>you have to use u-substitution to integrate (in other words, do the inverse of the chain rule).</p>
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

export function IndefiniteIntegralsNaturalExponential({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Evaluating Integrals of Natural Exponential Functions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The natural exponential function is its own derivative, so the integral of a natural exponetial is itself.</p>
        <div className="row">
          <p><StaticMathField className="col-4 offset-4 text-center">{`\\int e^x dx = e^x + C`}</StaticMathField></p>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Examples:</p>
          </div>
        </div>        
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int 3e^x dx = 3e^x + C`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\int \\frac{1}{4}e^x dx = \\frac{1}{4}e^x + C`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
            <div className="col-10 offset-1">
                <p>If the exponent has a coefficient, like this: <StaticMathField>{`\\int e^3x dx`}</StaticMathField>,</p>
                <p>You have to use <strong>u-substitution</strong> to integrate (because you had to use the Chain Rule to find the derivative).</p>
                <p>Simply define the exponential term as <i>u</i>, define the exponential term's derivative as <i>du</i>, then rewrite the problem.</p>
                <p>After you rewrite the problem using <i>u</i> and <i>du</i>, you can integrate and then subtitute back in for <i>u</i>.</p>
            </div>
        </div>   
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>  
        <div className="row mt-2">
          <div className="col-10 offset-1">
            <StaticMathField className="text-end">{`\\int 2e^{2x} dx`}</StaticMathField>
            <p><StaticMathField className="text-end">{`u = 2x`}</StaticMathField> and <StaticMathField className="text-end">{`du = 2`}</StaticMathField></p>
            <p>Rewrite the problem as <StaticMathField className="text-end">{`\\int e^u du`}</StaticMathField></p>
            <p>After you integrate, you have <StaticMathField className="text-end">{` = e^u + C`}</StaticMathField></p>
            <p>Substitue <i>2x</i> back in for <i>u</i>: <StaticMathField className="text-end">{`=e^{2x} + C`}</StaticMathField></p>
            <p>Take the derivative of your answer to confirm you are correct: <StaticMathField className="text-end">{`\\frac{d}{dx}[e^{2x} + C] = 2e^{2x} dx`}</StaticMathField></p>
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

export function IndefiniteIntegralsNaturalLog({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Integrating Functions of the Form <StaticMathField>{`\\frac{n}{x}`}</StaticMathField></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The derivative of <StaticMathField>{`ln x`}</StaticMathField> is <StaticMathField>{`\\frac{1}{x} dx`}</StaticMathField> so the integral of <StaticMathField>{`\\frac{1}{x} dx`}</StaticMathField> is <StaticMathField>{`ln \\mid x \\mid + C`}</StaticMathField>. The absolute value is necessary because <StaticMathField>{`ln x`}</StaticMathField> is undefined for <StaticMathField>{`x < 0`}</StaticMathField>.</p>
        <div className="row">
          <div className="col-6">
              <StaticMathField className="text-end">{`\\int \\frac{1}{x} dx = ln \\mid x \\mid + C`}</StaticMathField><br />
          </div>
          <div className="col-6">
              <StaticMathField className="text-end">{`\\int \\frac{3}{x} dx = 3 ln \\mid x \\mid + C`}</StaticMathField><br />
          </div>
        </div>
        <p>We can play with the second example to remind ourselves about the rules of logarithms and see that this integral is correct.</p>          
        <div className="row">
          <p><StaticMathField>{`3 ln \\mid x \\mid + C`}</StaticMathField> can be rewritten as <StaticMathField>{`ln x^3 + C`}</StaticMathField> because the rules of logarithms tell us that <StaticMathField>{`n ln x = ln x^n`}</StaticMathField>.</p>
          <p>Using the chain rule, we see that <StaticMathField>{`\\frac{d}{dx} ln x^3 = \\frac{3x^2}{x^3} dx = \\frac{3}{x} dx`}</StaticMathField>.</p>
          <p>I ignored the <StaticMathField>+ C</StaticMathField> part of the answer because the derivative of any constant is 0.</p>
        </div>
        <div className="row mt-4">
          <p>When you subtract one from the exponent, that might make the fraction negative.</p>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} -4x^2 = 2 \\cdot -4 x^{2-1}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} -4x^2 = -8x^{1} = -8x`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-4">
            <p>We don't have to write the 1 in <StaticMathField>{`2x^1`}</StaticMathField>.</p>
            <p>If there is no coefficient, that means the coefficient is 1.</p>
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
export function IndefiniteIntegralsNaturalLogBinomial({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Integrating Functions with a Polynomial Denominator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To integrate functions of the form <StaticMathField>{`\\frac{2x}{x^2 + 3}`}</StaticMathField> we have to use u-substitution.</p>
        <p>In this example <StaticMathField>{`u = x^2 + 3`}</StaticMathField> and <StaticMathField>{`du = 2x dx`}</StaticMathField>.</p>
        <p>We can rewrite <StaticMathField>{`\\int \\frac{2x}{x^2 + 3} dx`}</StaticMathField> as <StaticMathField>{`\\int \\frac{1}{u} du`}</StaticMathField>.</p>
        <p>We know that <StaticMathField>{`\\int \\frac{1}{u}du = ln \\mid u \\mid + C`}</StaticMathField>.</p>
        <p>We substitue <StaticMathField>{`x^2 + 3`}</StaticMathField> back in for <i>u</i> and get the final answer: <StaticMathField>{`\\int \\frac{2x}{x^2 + 3}dx = ln \\mid x^2 + 3 \\mid + C`}</StaticMathField>.</p>
        <p><strong>Further Explanation:</strong></p>
        <p>To integrate functions of the form <StaticMathField>{`\\frac{2x}{x^2 + 3}dx`}</StaticMathField> we have to recognize this as the derivative of a natural log function.</p>
        <p>Notice that <StaticMathField>{`\\frac{d}{dx} ln(x^2+3) = \\frac{1}{x^2 + 3}2xdx`}</StaticMathField>. We push the <StaticMathField>{`x^2 + 3`}</StaticMathField> term to the denominator. Then, following the chain rule we find that <StaticMathField>{`\\frac{d}{dx} x^2 + 3 = 2x dx`}</StaticMathField>.</p>
        <p>That gives us the final result: <StaticMathField>{`\\frac{d}{dx} ln(x^2+3) = \\frac{2x}{x^2 + 3}dx`}</StaticMathField>.</p>
        <p>When we face an integral like <StaticMathField>{`\\int \\frac{2x}{x^2 + 3}dx`}</StaticMathField>, it helps if we can recognize that the <StaticMathField>{`x^2 + 3`}</StaticMathField> term was a natural log that got pushed to the denominator when the derivative was taken.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) 
}

export function DefiniteIntegrals({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Power Rule on terms with fractional exponents and fractional coefficients.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>When you multiply the exponent times the coefficient, you are multiplying fractions.</p>
        <p>When you multiply two fractions, multiply the numerator times the numerator and the denominator times the denominator.</p>
        <div className="row">
          <div className="col-6 offset-1">
              <StaticMathField className="text-end">{`\\frac{1}{2} \\cdot \\frac{2}{3} = \\frac{1 \\cdot 2}{2 \\cdot 3} = \\frac{2}{6} = \\frac{1}{3}`}</StaticMathField><br />
              <StaticMathField className="text-end">{``}</StaticMathField><br />
          </div>
        </div>
        <p>Apply the Power Rule in the usual way. Multiply the fractional exponent times the fractional coefficient and subtract one from the exponent.</p>          
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^{\\frac{4}{3}} = \\frac{4}{3}x^{\\frac{4}{3} - 1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = \\frac{4}{3}x^{\\frac{4}{3} - \\frac{3}{3}} `}</StaticMathField><br />
            <StaticMathField className="text-end">{`= \\frac{4}{3}x^{\\frac{1}{3}}`}</StaticMathField>
          </div>
        </div>
        <div className="row mt-4">
          <p>When you subtract one from the exponent, that might make the fraction negative.</p>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} \\frac{1}{3}x^{\\frac{1}{2}} = \\frac{1}{2} \\cdot \\frac{1}{3} x^{\\frac{1}{2} - \\frac {2}{2}}`}</StaticMathField><br /><br />
            <StaticMathField className="text-end">{` = \\frac{1}{6}x^{-\\frac{1}{2}} = \\frac{1}{6x^{\\frac{1}{2}}} = \\frac{1}{6 \\sqrt{x}}`}</StaticMathField><br />
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

export function PowerRuleNegativeFractionalExponents({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Applying the Power Rule when the term has a negative fractional exponent.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The fraction makes it a radical (the numerator is the power, the denominator is the root). The negative part pushes the variable term to the denominator.</p>
        <div className="row">
          <div className="col-4">
              <StaticMathField className="text-end">{`x^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{x}}`}</StaticMathField><br />
          </div>
          <div className="col-4">
              <StaticMathField className="text-end">{`2x^{-\\frac{1}{3}} = \\frac{2}{\\sqrt[3]{x}}`}</StaticMathField><br />
          </div>
          <div className="col-4">
              <StaticMathField className="text-end">{`5x^{-\\frac{2}{3}} = \\frac{5}{\\sqrt[3]{x^2}}`}</StaticMathField><br />
          </div>
        </div>
        <p>Use the Power Rule to find the derivative of a term with a negative fractional exponent.</p>          
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^{=\\frac{4}{3}} = -\\frac{4}{3}x^{-\\frac{4}{3} - 1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = -\\frac{4}{3}x^{-\\frac{4}{3} - \\frac{3}{3}} `}</StaticMathField><br />
            <StaticMathField className="text-end">{`= -\\frac{4}{3}x^{-\\frac{7}{3}}`}</StaticMathField>
            <StaticMathField className="text-end">{`= -\\frac{4}{3\\sqrt[3]{x^7}}`}</StaticMathField>
          </div>
        </div>
        <div className="row mt-4">
          <p>When you subtract one from a negative exponent, the exponent becomes more negative.</p>
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

export function PowerRuleNegativeFractionalExponentsIntegerCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Applying the power rule to find the derivative of terms with negative fractional exponents and integer coefficients</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the same as when the exponent is a positive fraction, except you are multiplying the coefficient by a negative fraction and subtracting from a negative exponent:</p>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5x^{-\\frac{4}{3}} = 5 \\cdot -\\frac{4}{3}x^{-\\frac{4}{3} - 1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = -\\frac{5 \\cdot 4}{3}x^{-\\frac{4}{3} - \\frac{3}{3}} `}</StaticMathField><br />
            <StaticMathField className="text-end">{`= -\\frac{20}{3}x^{-\\frac{7}{3}}`}</StaticMathField>
            <StaticMathField className="text-end">{`= -\\frac{20}{3x^{\\frac{7}{3}}}`}</StaticMathField>
            <StaticMathField className="text-end">{`= -\\frac{20}{3 \\sqrt[3]{x^7}}`}</StaticMathField>
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

export function PowerRuleNegativeFractionalExponentsFractionalCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Applying the power rule to find the derivative of terms with negative fractional exponents and fractional coefficients</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the same as when the exponent is a positive fraction, except you are multiplying the coefficient by a negative fraction and subtracting from a negative exponent.</p>
        <p className="mt-2">Apply the Power Rule as usual. Multiply the negative fractional exponent times the fractional coefficient and subtract one from the exponent to make it more negative.</p>          
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} \\frac{1}{3}x^{-\\frac{1}{2}} = -\\frac{1}{2} \\cdot \\frac{1}{3} x^{-\\frac{1}{2} - \\frac {2}{2}}`}</StaticMathField><br /><br />
            <StaticMathField className="text-end">{` = -\\frac{1}{6}x^{-\\frac{3}{2}} = -\\frac{1}{6x^{\\frac{3}{2}}} = -\\frac{1}{6 \\sqrt{x^3}}`}</StaticMathField><br />
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