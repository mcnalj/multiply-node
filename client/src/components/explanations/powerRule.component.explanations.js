import React from "react";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';

addStyles();

export default function PowerRule({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>The Power Rule for Calculating Derivatives</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Multiply the coefficient by the exponent and subtract one from the exponent.</p>
        <div className="row">
          <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} x^n = nx^{n-1}`}</StaticMathField>
        </div>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^3 = 3x^{3-1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <StaticMathField className="text-end">{` = 3x^2`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^2 = 2x^{2-1}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^2 = 2x^{1} = 2x`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
            <div className="col-8 offset-2">
                <p>We don't have to write the 1 in <StaticMathField>{`2x^1`}</StaticMathField>.</p>
                <p>No coefficient is the same as having a coefficient of 1.</p>
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

export function PowerRuleCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Applying the Power Rule when the term has a coefficient.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Multiply the coefficient by the exponent and subtract one from the exponent.</p>
        <div className="row">
          <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} ax^n = nax^{n-1}`}</StaticMathField>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5x^3 = 3 \\cdot5 x^{3-1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <StaticMathField className="text-end">{` = 15x^2`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-4">
          <p>If the coefficient is negative, then remeber that a positive times a negative is negative.</p>
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
            <p>We don't have to write the 1 in <StaticMathField>{`-8x^1`}</StaticMathField>.</p>
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

export function PowerRuleFractionalCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Power Rule when the term has a fractional coefficient.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Apply the Power Rule in the normal way, but it involves multiplying by a fraction.</p>
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} \\frac{2}{5}x^3 = 3 \\cdot \\frac{2}{5} x^{3-1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <StaticMathField className="text-end">{` = \\frac{6}{5}x^2`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-4">
          <p>When <strong>multiplying fractions</strong>, you multiply the numerator times the numerator and the denominator times the denomonator.</p>
          <p>You can treat a whole number as if its denominator is 1.</p>
          <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`3 \\cdot \\frac{2}{5} \\quad = \\frac{3}{1} \\cdot \\frac{2}{5} \\quad = \\frac{3 \\cdot 2}{1 \\cdot 5} \\quad = \\frac{6}{5}`}</StaticMathField><br />
          </div>
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

export function PowerRuleNegativeExponents({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>The Power Rule with Negative Exponents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>A negative exponent means division and pushes the exponential term to the denominator.</p>

        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` x^{-5} \\quad = \\frac{1}{x^5}`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` 7x^{-3} \\quad = \\frac{7}{x^{3}}`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-2">
          <p>When you take the derivative, and subtract one from the exponent, it becomes more negative.</p>
          <div className="row mt-2">
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{`\\frac{d}{dx} x^{-4} = -4 \\cdot x^{-4-1}`}</StaticMathField><br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <StaticMathField className="text-end">{` = -4x^{-5}`}</StaticMathField><br />
            </div>
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{`\\frac{d}{dx} 3x^{-2} = -2 \\cdot 3x^{-2-1}`}</StaticMathField><br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = -6x^{-3}`}</StaticMathField><br />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <p>When you encounter an exponential term in the denominator, you can rewrite it as a negative exponent.</p>
          <div className="row mt-2">
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{` \\frac{1}{x^{4}} \\quad = x^{-4}`}</StaticMathField><br />
            </div>
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{` \\frac{3}{x^2}  \\quad = 3x^{-2}`}</StaticMathField><br />
            </div>
          </div>
          <div className="row mt-2">
            <p>Once rewritten, it is easier to use the Power Rule to find the derivative. (After you find the derivative, it is good practice to rewrite it back to its original, fractional form.)</p>
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{`\\frac{d}{dx} \\frac{1}{x^4} \\quad = \\frac{d}{dx} x^{-4} \\quad = -4x^{-5} \\quad =\\frac{-4}{x^5}`}</StaticMathField><br />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-4 offset-1">
              <StaticMathField className="text-end">{`\\frac{d}{dx} \\frac{3}{x^2} \\quad = \\frac{d}{dx} 3x^{-2} \\quad = -6x^{-3} \\quad =\\frac{-6}{x^3}`}</StaticMathField><br />
            </div>
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

export function PowerRuleNegativeExponentsCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>The Power Rule with Negative Exponents and Coefficients</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>These problems are presented as a mix of two forms.</p>
        <p>Some have negative exponents and some have exponential terms in the denominator.</p>
        <p>To get credit for being correct, the answer has to be presented in the same form as the question.</p>
        <div className="row mt-2">
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx}2x^{-5} \\quad = -10x^{-6}`}</StaticMathField><br />
          </div>
          <div className="col-4 offset-1">
            <StaticMathField className="text-end">{` \\frac{d}{dx}\\frac{2}{x^5} \\quad = \\frac{-10}{x^6}`}</StaticMathField><br />
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

export function PowerRuleFractionalExponents({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Applying the Power Rule when the term has a fractional exponent.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>A fractional exponent is another way to write a radical term. The numerator of the fraction is the power, the denominator is the root. Power over root.</p>
        <div className="row">
          <div className="col-4">
              <StaticMathField className="text-end">{`x^{\\frac{1}{2}} = \\sqrt{x}`}</StaticMathField><br />
          </div>
          <div className="col-4">
              <StaticMathField className="text-end">{`2x^{\\frac{1}{3}} = 2\\sqrt[3]{x}`}</StaticMathField><br />
          </div>
          <div className="col-4">
              <StaticMathField className="text-end">{`5x^{\\frac{2}{3}} = 5\\sqrt[3]{x^2}`}</StaticMathField><br />
          </div>
        </div>
        <p>Use the Power Rule as usual: multiply the coefficient times the exponent and subtract one from the exponent.</p>          
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^{\\frac{4}{3}} = \\frac{4}{3}x^{\\frac{4}{3} - 1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = \\frac{4}{3}x^{\\frac{4}{3} - \\frac{3}{3}} `}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{`= \\frac{4}{3}x^{\\frac{1}{3}}`}</StaticMathField>
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
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5x^{\\frac{2}{3}} = \\frac{2}{3} \\cdot 5 x^{\\frac{2}{3}-1}`}</StaticMathField><br />
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5x^{\\frac{2}{3}} = \\frac{10}{3}x^{\\frac{2}{3} - \\frac{3}{3}} = \\frac{10}{3}x^{-\\frac{1}{3}}`}</StaticMathField><br />
          </div>
        </div>
        <div className="row mt-4">
            <p>We could rewrite that as <StaticMathField>{`\\frac{10}{3x^{\\frac{1}{3}}}`}</StaticMathField>.</p>
            <p>And we could rewrite <StaticMathField>{`x^{\\frac{1}{3}}`}</StaticMathField> in radical form as <StaticMathField>{`\\sqrt[3]{x}`}</StaticMathField>.</p>
            <p>So <StaticMathField>{`\\frac{10}{3}x^{-\\frac{1}{3}}`}</StaticMathField> could also be written as <StaticMathField>{`\\frac{10}{3\\sqrt[3]{x}}`}</StaticMathField>.</p>
            <p>(Sorry that the "3" in the "root 3" symbol is hard to read!)</p>
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
export function PowerRuleFractionalExponentsIntegerCoefficients({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Applying the power rule to find the derivative of terms with fractional exponents and integer coefficients</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Multiply an integer times a fraction by multiplying the integer times the numerator of the fraction:</p>
        <div className="row">
          <div className="col-6 offset-2">
              <StaticMathField className="text-end">{`5 \\cdot \\frac{2}{3} = \\frac{5 \\cdot 2}{3} = \\frac{10}{3}`}</StaticMathField><br />
          </div>
        </div>
        <p>Or you can think of an integer as being a fraction with the integer over one: <StaticMathField>{`5 \\quad = \\quad \\frac{5}{1} `}</StaticMathField></p>
        <div className="row">
          <div className="col-6">
              <StaticMathField className="text-end">{`5 \\cdot \\frac{2}{3} = \\frac{5}{1} \\cdot \\frac {2}{3} = \\frac{5 \\cdot 2}{1 \\cdot 3} = \\frac{10}{3}`}</StaticMathField><br />
          </div>
        </div>
        <p className="mt-2">Apply the Power Rule as usual and multiply the fractional exponent times the integer coefficient.</p>          
        <div className="row">
          <div className="col-10 offset-1">
            <p>Example:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2">
            <StaticMathField className="text-end">{`\\frac{d}{dx} 5x^{\\frac{4}{3}} = 5 \\cdot \\frac{4}{3}x^{\\frac{4}{3} - 1}`}</StaticMathField><br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<StaticMathField className="text-end">{` = \\frac{5 \\cdot 4}{3}x^{\\frac{4}{3} - \\frac{3}{3}} `}</StaticMathField><br />
            <StaticMathField className="text-end">{`= \\frac{20}{3}x^{\\frac{1}{3}}`}</StaticMathField>
          </div>
        </div>
        <br></br>
        <p>To get credit for a correct answer, your fractions have to be reduced to their simplest form.</p>
        <p>For example, an answer of <StaticMathField>{`\\frac{10}{4}x^{\\frac{1}{4}}`}</StaticMathField> has to be written as <StaticMathField>{`\\frac{5}{2}x^{\\frac{1}{4}}`}</StaticMathField>.</p>
        <p>And the coefficient in <StaticMathField>{`\\frac{42}{3}x^{\\frac{1}{3}}`}</StaticMathField> has to be reduced to a whole number and written as <StaticMathField>{`14x^{\\frac{1}{3}}`}</StaticMathField>.</p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) 
}

export function PowerRuleFractionalExponentsFractionalCoefficients({show, handleClose}) {
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
            <StaticMathField className="text-end">{`\\frac{d}{dx} x^{-\\frac{4}{3}} = -\\frac{4}{3}x^{-\\frac{4}{3} - 1}`}</StaticMathField><br />
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