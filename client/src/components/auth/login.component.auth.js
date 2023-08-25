import React, { useState, useEffect } from "react";

import { Cookies, useCookies } from 'react-cookie';

import { useNavigate } from "react-router";
import './styles.component.auth.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function Login({setCookie, setUsername})  {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  // const [cookies, setCookie] = useCookies(['username'])
  // const [cookies, setCookie] = useState({
  //   username: ""
  // })
  var myCookie = "";
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // async function onSubmit(e) {
  //   e.preventDefault();
  //   // When a post request is sent to the login-user url, we'll authenticate this user.
  //   const guest = { ...form };
  //   //const response = await fetch("http://localhost:5000/record/login-user", {
  //   const response = await fetch("http://localhost:5000/record/loginPassport", {
  //     method: "POST",
  //     //mode: 'no-cors',
  //     mode: 'cors',
  //     credentials: 'include',
  //     // I needed to include credentials to get the cookie that was set on the server to show up
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(guest),
  //   })
  //   .catch(error => {
  //     window.alert(error);
  //     return;
  //   });
  //   const answer = await response.json();
  //   console.log("Here is the response json: ");
  //   console.log(answer.passportData);

  //   setCookie('username', answer.passportData.username);
  //   setUsername(answer.passportData.username);

  //   const allCookies = new Cookies();
  //   myCookie = allCookies.get('username');
  //   console.log("This is my cookie: " + myCookie);

  //   setForm({ username: "", password: ""});
  //   console.log("Successfully logged in.")
  //   console.log(process.env.NODE_ENV);
  //  if (myCookie) {
  //    console.log("I'm navigating to success, now home")
  //    navigate("/");
  //  }
  //  else {
  //    console.log("I'm navigating to home. No userId.")
  //    navigate("/");
  //  }
  // }
  
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the login-user url, we'll authenticate this user.
    const guest = { ...form };
    // const response = await fetch("http://localhost:5000/record/login-user", {
      const response = await fetch(`${url}/record/login-user`, {
      method: "POST",
      //mode: 'no-cors',
      mode: 'cors',
      credentials: 'include',
      // I needed to include credentials to get the cookie that was set on the server to show up
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guest),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    const answer = await response.json();
    // If login doesn't work we get an error here because username is undefined.
    setCookie('username', answer.username);
    setUsername(answer.username);

    const allCookies = new Cookies();
    myCookie = allCookies.get('username');

    setForm({ username: "", password: ""});
   if (myCookie) {
     navigate("/success");
   }
   else {
     navigate("/");
   }
  }

// the remember me checkbox is not wired up
    return (
      <div className="auth-inner">
        <form onSubmit={onSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={form.username}
              onChange={(e) => updateForm({username: e.target.value})}
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({password: e.target.value})}
              placeholder="Enter password"
            />
          </div>
          {/* <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div> */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
          <p>
              Return to <a href="/">Splash</a>
          </p>
        </form>
      </div>  
    );
  }
