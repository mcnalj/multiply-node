import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import '../App.scss';
// import '../index.scss';
import './splash.component.scss';


export default function Splash() {
    
  // these two are part of login with Google
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  // this is from useGoogleLogin
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login failed: ',error)
  });

  const logout = () => {
    googleLogout();
    setUser([]);
    //setProfile([]);
    setProfile(null);
  };
  const styleTitle = {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "4.7rem",
    textAlign: "left",
    padding: "5%",
    paddingBottom: "2%",
    color: "var(--golden-yellow)",
    textShadow: "2.5px 2.5px 0px #555"
  }

  const styleTitleSmall = {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: '3rem',
    textAlign: "center",
    padding: "0%",
    paddingBottom: "0%",
    color: "var(--golden-yellow)",
    textShadow: "2.5px 2.5px 0px #555"
  }


  const styleSubtitle = {
    fontFamily: "Nunito",
    fontWeight: "300",
    textAlign: "left",
    paddingLeft: "10%",
    fontSize: "2.5rem"
  }

  const styleSubtitleSmall = {
    fontFamily: "Nunito",
    fontWeight: "300",
    textAlign: "center",
    paddingLeft: "1%",
    fontSize: "1.5rem"
  }


  const styleSubtitleGroup = {
    paddingBottom: "0%"
  }

  const styleSVG = {
    paddingTop: "5%",
    marginLeft: "-5%",
  }

  const styleSVGSmall = {
    paddingTop: "0%",
  }

  const styleButtonGroup = {
    paddingTop: "3%",
    paddingBotton: "2%",
  }

  const styleButtonGroupSmall = {
    paddingTop: "0%",
    paddingBottom: "1%",
  }

  const buttonStyle = {
    backgroundColor: "var(--golden-yellow)",
    border: "2px solid black"
  }

  const isSmallScreen = window.innerWidth <= 900;
  
        return (
          <div id="pageBackground">
            <div className="row">
                <div className="col-12 col-md-8">
                  <div>
                    <p style={isSmallScreen ? styleTitleSmall : styleTitle}>Calculus Circus</p>
                    <div className="subTitleGroup" style={styleSubtitleGroup}>
                      <p style={isSmallScreen ? styleSubtitleSmall : styleSubtitle}>Make the computations easy.</p>
                      <p style={isSmallScreen ? styleSubtitleSmall : styleSubtitle}>Learn the concepts deeply.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center" style={isSmallScreen ? styleSVGSmall : styleSVG}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 370 400" width={isSmallScreen ? "200" : "400"} height={isSmallScreen ? "200" : "400"}>
                    {/* X and Y Axes */}
                    <line x1="0" y1="300" x2="350" y2="300" stroke="#999" strokeWidth="2"/> {/* X-axis */}
                    <line x1="50" y1="50" x2="50" y2="350" stroke="#999" strokeWidth="2"/> {/* Y-axis */}

                    {/* Curvy Graph - Flipped and Shifted */}
                    <path d="M 10,250 Q 60,350 170,180 Q 250,80 330,160" stroke="black" strokeWidth="5" fill="none"/>

                    {/* Tangent Line near the maximum */}
                    <line x1="110" y1="202" x2="300" y2="78" stroke="purple" strokeWidth="7"/>

                    {/* Tangent Point */}
                    <circle cx="210" cy="138" r="10" fill="purple"/>
                  </svg>
                </div>
            </div>
            <div className="row d-flex justify-content-center buttonGroup" style={styleButtonGroup}>
              <div className="col-12 d-flex justify-content-center">
                <NavLink to="/loginWithGoogle">
                  <Button className="px-5" id="customButton">Get Started!</Button>
                </NavLink>
              </div>
            </div>
            <div className="row p-4">
                <div className="col-12 col-md-4">
                  <NavLink to="/calculus">
                    <p className="link-hover col-6 offset-3">Differentiation</p>
                  </NavLink>
                </div>
                <div className="col-12 col-md-4">
                  <NavLink to="/integrationTopics">
                    <p className="link-hover col-5 offset-3">Integration</p>
                  </NavLink>
                </div>
                <div className="col-12 col-md-4">
                  <NavLink to="/exponentsTopics">
                    <p className="link-hover col-5 offset-3">Exponents</p>
                  </NavLink>
                </div>
            </div>
          </div>
        );
}