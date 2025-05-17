import React, { useEffect, useState } from "react";
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import '../../App.scss';
// import '../index.scss';
import './calculus.component.calculusHome.scss';


export default function CalculusHome({isAuthenticated, userId}) {
  const [buttonText, setButtonText] = useState("Sign In");
  const [buttonLink, setButtonLink] = useState("/loginWithGoogle")

  useEffect(() => {
    if (isAuthenticated) {
      setButtonText("Let's Go!");
      setButtonLink("/calculus");
    }
  }, [isAuthenticated]);

  addStyles();

  const styleTitle = {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: '3.7rem',
    textAlign: "left",
    padding: "5%",
    paddingBottom: "2%",
    color: "var(--golden-yellow)",
    textShadow: "2.5px 2.5px 0px #555",
  }
  const styleSkillTitle = {
    fontFamily: "Nunito",
    fontWeight: "300",
    textAlign: "left",
    marginLeft: "10%",
    width: "80%",
    fontSize: "1.8rem",
  }

  const styleSkillList = {
    fontFamily: "Nunito",
    fontWeight: "300",
    paddingLeft: "12%",
    fontSize: "1.3rem",
  }
  const styleListItem = {
    fontFamily: "Nunito",
    fontWeight: "300",
    marginLeft: "5%",
    fontSize: "1rem",
    color: "#333",
  }

  const styleButtonGroup = {
    paddingTop: "3%",
    paddingBotton: "2%",
  }

  const buttonStyle = {
    backgroundColor: "var(--golden-yellow)",
    border: "2px solid black"
  }

  const styleMath = {
    fontSize: "2rem",
    marginTop: "5%",
    marginLeft: "-10%",
    color: "purple",
  }

  
        return (
          <div id="pageBackground">
            <div className="row">
                <div className="col-9">
                  <div>
                    <p style={styleTitle}>Calculus Skills</p>
                  </div>
                </div>
                <div className="col-3 mt-5">
                    <div className="row d-flex justify-content-center buttonGroup" style={styleButtonGroup}>
                    <NavLink to={buttonLink}>
                        <Button id="customButton">{buttonText}</Button>
                    </NavLink>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                  <NavLink to="/calculus">
                    <p className="link-hover" style={styleSkillTitle}>Differentiation Practice</p>
                  </NavLink>  
                  <ul className="skillList" style={styleSkillList} >
                      <li style={styleListItem}>Exponential terms</li>
                      <li style={styleListItem}>Polynomials</li>
                      <li style={styleListItem}>Trigonometric Functions</li>
                      <li style={styleListItem}>The Natural Exponential Function</li>
                      <li style={styleListItem}>The Natural Log Function</li>
                  </ul>
                </div>
                <div className="col-5 svgColumn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="200" height="200">
                      {/* X and Y Axes */}
                      <line x1="0" y1="300" x2="350" y2="300" stroke="#999" stroke-width="1"/> {/* X-axis */}
                      <line x1="50" y1="50" x2="50" y2="350" stroke="#999" stroke-width="1"/> {/* Y-axis */}

                      {/* Curvy Graph - Flipped and Shifted */}
                      <path d="M 10,250 Q 220,10 330,220" stroke="black" stroke-width="5" fill="none"/>

                      {/* Tangent Line near the maximum */}
                      <line x1="65" y1="168" x2="225" y2="97" stroke="purple" stroke-width="7"/>

                      {/* Tangent Point */}
                      <circle cx="145" cy="135" r="10" fill="purple"/>

                      {/* hashmarks at tangent value */}
                      {/* <line x1="40" y1="135" x2="60" y2="135" stroke="#999" stroke-width="4"/> 
                      <line x1="145" y1="290" x2="145" y2="310" stroke="#999" stroke-width="4"/>  */}
                  </svg>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                  <NavLink to="/integrationTopics">
                    <p className="link-hover" style={styleSkillTitle}>Integration Practice</p>
                  </NavLink>  
                  <ul className="skillList" style={styleSkillList}>
                      <li style={styleListItem}>Exponential terms</li>
                      <li style={styleListItem}>Polynomials</li>
                      <li style={styleListItem}>Trigonometric Functions</li>
                      <li style={styleListItem}>The Natural Exponential Function</li>
                      <li style={styleListItem}>The Natural Log Function</li>
                  </ul>
                </div>    
                <div className="col-5 svgColumn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="200" height="200">
                      {/* Four Rectangles */}
                      <rect x="50" y="205" width="60" height="95" fill="rgba(128, 0, 128, 0.15)" stroke="black"/>
                      <rect x="110" y="125" width="60" height="175" fill="rgba(128, 0, 128, 0.15)" stroke="black"/>
                      <rect x="170" y="90" width="60" height="210" fill="rgba(128, 0, 128, 0.15)" stroke="black"/>
                      <rect x="230" y="65" width="60" height="235" fill="rgba(128, 0, 128, 0.15)" stroke="black"/>


                      {/* X and Y Axes */}
                      <line x1="0" y1="300" x2="350" y2="300" stroke="#999" stroke-width="1"/> {/* X-axis */}
                      <line x1="50" y1="50" x2="50" y2="350" stroke="#999" stroke-width="1"/> {/* Y-axis */}

                      {/* Function Line */}
                      <path d="M 35,340 Q 150,60 340,60" stroke="black" stroke-width="5" fill="none"/>


                      {/* Upper Limit */}
                      <line x1="290" y1="50" x2="290" y2="350" stroke="black" stroke-width="4" stroke-dasharray="12 10" /> {/* Y-axis */}
                  </svg>
                </div>    
            </div>
            <div className="row">
                <div className="col-7">
                  <NavLink to="/exponentsTopics">
                    <p className="link-hover" style={styleSkillTitle}>ManipulatingExponents</p>
                  </NavLink>  
                  <ul className="skillTitle" style={styleSkillList}>
                      <li style={styleListItem}>Negative Exponents</li>
                      <li style={styleListItem}>Fractional Exponents</li>
                      <li style={styleListItem}>Negative Fractional Exponents</li>
                      <li style={styleListItem}>Factoring Trinomials</li>
                  </ul>
                </div>
                <div className="col-5 svgColumn">
                  <StaticMathField style={styleMath}>{`\\frac{1}{\\sqrt{x}} = \\frac{1}{x^{\\frac{1}{2}}} = x^{-\\frac{1}{2}}` }</StaticMathField>
                </div>                    
            </div>                        
          </div>
        );
}