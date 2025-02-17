import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


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

  // useEffect(
  //   () => {
  //     console.log(user);
  //     if (user.length > 0) {
  //       console.log("got here")
  //       axios
  //         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json',
  //           }
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           setProfile(response.data);
  //         })
  //         .catch((error) => {
  //           console.error('There was an error!', error);
  //         });
  //     }
  //   },
  //   [ user ]
  // );

  const logout = () => {
    googleLogout();
    setUser([]);
    //setProfile([]);
    setProfile(null);
  };
        return (
            <div className="col-12">
                <h3 className="mt-3">Splash Page</h3>
                <div>
                    <NavLink to="/login">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"  
                        >Login
                        </Button>
                    </NavLink>
                    <br></br>
                    <NavLink to="/register">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"
                        >Register
                        </Button>
                    </NavLink><br /><br />
                    <NavLink to="/loginWithGoogle">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"
                        >to Google Login
                        </Button>
                    </NavLink><br /><br />
                </div>
                <div>
                    {/* <NavLink to="/multiply">
                        <button type="button" className="btn btn-lg btn-success">Practice Multiplication</button><br /><br />
                    </NavLink>
                    <NavLink to="/categories">
                        <button type="button" className="btn btn-lg btn-success">Play Trivia</button>
                    </NavLink> */}
                </div>
                          {/* <div>
            <h2>React Google Login</h2>
              <br />
              <br />
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} clientId="663678074975-okh3nd143cbh75umkqsikt2boeobmimc.apps.googleusercontent.com" />
          </div>                                    */}
          {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
              <div>
                <img src={profile.picture} alt="profile" />
                <h3> Loggin in User</h3>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <br />
                <br />
                <button onClick={logout}>Logout</button>

              </div>
            ) : (
              <button onClick={login}>Sign in with Google</button>
            )}
          </div> */}

            </div>
        );
    
}