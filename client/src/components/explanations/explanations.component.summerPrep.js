import React from "react";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';

addStyles();

export function FunctionCoordinates({show, handleClose}){
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Function Coordinates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We use function notation to describe a function like this:</p>
        <div className="row">
          <StaticMathField className="col-4 offset-4 text-center">{`f(x) = x^2 + 3x + 5`}</StaticMathField>
        </div>
        <div className="row mt-2">
            <p> The function's name is <StaticMathField>{`f`}</StaticMathField>.</p>
        </div>

        <div className="row mt-2">
            <p> When we write <StaticMathField>{`f(2)`}</StaticMathField>, we are saying "plug 2 in where the <StaticMathField>{`x`}</StaticMathField>'s are" like this:</p>
            <p className="col-4 offset-4 text-center"><StaticMathField>{`f(2) = (2)^2 + 3(2) - 5`}</StaticMathField></p>
            <p className="col-4 offset-4 text-center"><StaticMathField>{`f(2) = 5`}</StaticMathField></p>
        </div>
        <div className="row mt-2">
            <p> We now have all the information we need to plot the point on the coordinate plane (xy axes).</p>
            <p> We know <StaticMathField>{`x = 2`}</StaticMathField> and <StaticMathField>{`y = 5`}</StaticMathField> so we have the point <StaticMathField>{`(2, 5)`}</StaticMathField>.</p>
            <p> We can also call this point <StaticMathField>{`(2, f(2))`}</StaticMathField>. The <StaticMathField>{`2`}</StaticMathField> is what we are using for <StaticMathField>{`x`}</StaticMathField> and <StaticMathField>{`f(2)`}</StaticMathField> is the result we get when we plug <StaticMathField>{`2`}</StaticMathField> into the function named <StaticMathField>{`f`}</StaticMathField>.</p>
        </div>
        <div className="row mt-2">
            <p>In these practice exercises click the location of the correct coordinates on the coordinate plane.</p>
            <p>For each problem think of the first number in the coordinate pair as the <StaticMathField>{`x`}</StaticMathField> and the second numer in the pair, the <StaticMathField>{`f(x)`}</StaticMathField>, as the y.</p>
            <p>In the above example, you would click the location on the coordinate plane where <StaticMathField>{`x=2`}</StaticMathField> and <StaticMathField>{`y = 5`}</StaticMathField>.</p>
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