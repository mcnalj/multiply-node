import React, { useState } from "react";
import { useNavigate } from "react-router";
import './styles.component.auth.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function Login({setCookie, setUsername})  {
  const [form, setForm] = useState({
    username: "",
    password: "",
    classCode: "",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
  async function onSubmit(e) {
    e.preventDefault();
    const guest = { ...form };
      const response = await fetch(`${url}/record/login-user`, {
      method: "POST",
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
    setForm({ username: "", password: ""});
    if (answer.success) {
      setCookie('username', answer.username);
      setUsername(answer.username);
      navigate("/success");
    } else {
      navigate("/");
    }
  }

  async function signIn(e) {
    e.preventDefault();
    try {
      console.log("About to try the fetch.")
      const response = await fetch(`${url}/record/login-google`, {
      method: "GET",
      // mode: 'no-cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("After the fetch.");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const answer = await response.json();
    console.log(answer);

    setForm({ username: "", password: ""});

    if (answer.success) {
      setCookie('username', answer.username);
      setUsername(answer.username);
      navigate("/success");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}
    return (
      <div className="col-12">
        <div className="row">
          <div className="auth-inner mt-2 p-3 p-sm-5 col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
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
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="mt-3">
                  <a href="/"><button className="btn btn-primary">HOME</button></a>
              </p>
            </form>
          </div>
        </div>
          {/* <button type="submit" className="btn btn-primary" onClick={signIn}>Sign in with Google</button> */}
        </div> 
    );
  }
