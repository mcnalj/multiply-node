import React, { useEffect, useState } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import './loginWithGoogle.component.auth.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function LoginWithGoogle({setUserEmail}) {

    const [status, setStatus] = useState({ message: "", type: ""});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    let loginTimeout;

    const handleLoginSuccess = (response) => {
        clearTimeout(loginTimeout);
        loginTimeout = setTimeout(() => {
            setLoading(true);

            console.log('Google Login Success:', response);
      
            //Extract token information
            const { credential } = response; // This is a JWT token from Google
          
            // Send token to backend for verification
            fetch(`${url}/record/googleLogin`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: credential }),
              // this was added - ensures the browser sends and accepts cookies
              credentials: 'include'
            })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setStatus({ message: "Login successful!", type: "success" });
                console.log('Backend Verification Success:', data);
                console.log("Should be navigating to integration Topics");
                console.dir(data.user);
                setUserEmail(data.user.email);
                // This is where I should be setting the global userId and setting info for navBar
                // (or I guess I should do it when I'm doing the backend verification); in record/googleLogin
                navigate("/calculus");
            })
            .catch((err) => {
                setLoading(false);
                console.error('Backend Verification Error:', err);
                setStatus({ message: "Login failed. Please try again.", type: "error" });
            });
        }, 300);
    };

    const handleLoginError = (error) => {
        console.error('Google Login Error:',error);
        const message = error?.details || "An error occurred uring login. Please try again.";
        setStatus({ message: message , type: "error" })
    };

    const logout = () => {
        googleLogout();
    };

    const styleTitle = {
        fontFamily: "Montserrat",
        fontWeight: "600",
        fontSize: '4rem',
        textAlign: "center",
        paddingBottom: "5%",
        color: "var(--golden-yellow)",
        textShadow: "2.5px 2.5px 0px #555"
      }

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12 d-flex justify-content-end p-5">
                    <NavLink to="/">
                        <Button
                            variant="dark"
                            type="submit"
                            id="submitBtn"
                            size="lg"
                        >Home
                        </Button>
                    </NavLink><br /><br />
                </div>
            </div>
            {/* <div>
                <NavLink to="/login">
                    <Button
                        variant="primary"
                        type="submit"
                        id="submitBtn"
                        size="md"  
                    >Login
                    </Button>
                </NavLink>
                <br></br>
                <NavLink to="/register">
                    <Button
                        variant="primary"
                        type="submit"
                        id="submitBtn"
                        size="md"
                    >Register
                    </Button>
                </NavLink><br /><br />
            </div>
            <h5>or</h5>
            <br /> */}
            { status.message && (
                <div className="row">
                    <div className={`alert alert-${status.type}`} role="alert">
                        { status.message }
                    </div>
                </div>
            )}
            <div className="row">
                <p style={styleTitle}>Calculus Circus</p>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center">
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading . . .</span>
                        </div>
                    ) : (
                        <GoogleOAuthProvider clientId={
                            process.env.NODE_ENV === "development"
                            ? process.env.REACT_APP_GOOGLE_CLIENT_ID_DEV
                            : process.env.REACT_APP_GOOGLE_CLIENT_ID_PROD
                        }>
                            <div style={{transform: "scale(2)", display: "inline-block", marginTop: "5%"}}>
                            <GoogleLogin 
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                disabled={loading}
                            />
                            </div>
                        </GoogleOAuthProvider>
                    )}
                </div>                
            </div>
        </div>
    );
}

// I was using this to set to profile data
// useEffect(
//     () => {
//         if (user) {
//         console.log(user);
//         axios
//             .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.access_token}`,
//                     Accept: 'application/json',
//                 }
//             })
//             .then((response) => {
//                 console.log(response);
//                 setProfile(response.data);
//             })
//             .catch((error) => {
//                 console.error('There was an error!', error);
//             });
//         }
//     }, [ user ]);

// function App() {
//     const handleLoginSuccess = async (credentialResponse) => {
//         const token = credentialResponse.credential; // ID token from Google

//         try {
//             // Send the token to your server
//             const response = await axios.post("http://localhost:5000/api/auth/google", { token });
            
//             // Handle response from the server
//             console.log("Server response:", response.data);
//         } catch (error) {
//             console.error("Error during login:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <div>
//             <h3>Login with Google</h3>
//             <GoogleLogin 
//                 onSuccess={handleLoginSuccess}
//                 onError={() => console.log("Login Failed")} 
//             />
//         </div>
//     );
// }

// export default App;


                // <div className="google-btn-container">
                //     <div className="google-btn">
                //         <div className="google-icon-wrapper">
                //             <img className="google-icon" src="https://accounts.google.com/favicon.ico" alt="Google logo"/>
                //      </div>
                //         <p className="btn-text"><b>Sign in with Google</b></p>
                //     </div>
                // </div>


                    // const login = useGoogleLogin({
    // onSuccess: (codeResponse) => setUser(codeResponse),
    // onError: (error) => console.log('Login failed: ',error)
    // });
    // const handleLoginSuccess = (response) => setUser(response);
    // const handleLoginError = (error) => console.log('Login failed: ',error);

