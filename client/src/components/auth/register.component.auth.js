import React, { useState } from "react";
import { useNavigate } from "react-router";
import './styles.component.auth.scss';
import { config} from '../constants';
var url = config.url.API_URL;

// export default function SignUp({setCookie, setUsername})  {
  export default function SignUp()  {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      role: "student",
      classCode: "",
    });
    const [responseMsg, setResponseMsg] = useState("");

    const navigate = useNavigate();
    
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }

    async function onSubmit(e) {
      e.preventDefault();
      setResponseMsg("");
      const newUser = { ...form };
      const result = await fetch(`${url}/record/new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      const answer = await result.json()
      if (answer.success) {
        // console.log(answer.passportData.username);
        // depracated by login with google
        // setCookie('username', answer.passportData.username);
        // setUsername(answer.passportData.username);
        setForm({ firstName: "", lastName: "", email: "", username: "", password: "", classCode: ""});
        navigate("/summerPrepTopics"); // this looks for a route on the client
      } else {
        setResponseMsg(answer.msg);
      }
    }
    return (
      <div className="col-12">
      <div className="row">
        <div className="auth-inner mt-2 p-3 p-sm-5 col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
        <form onSubmit={onSubmit}>
          <h3>Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={form.firstName}
                onChange={(e) => updateForm({firstName: e.target.value})}
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={form.lastName}
                onChange={(e) => updateForm({lastName: e.target.value})}
                placeholder="Last name"
              />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({email: e.target.value})}
              placeholder="Enter email"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="classCode">Class Code</label>
            <input
              type="text"
              className="form-control"
              id="classCode"
              value={form.classCode}
              onChange={(e) => updateForm({classCode: e.target.value})}
              placeholder="Enter class code"
            />
          </div>          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              SIGN UP
            </button>
            <p>{responseMsg}</p>
          </div>
          {/* <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p> */}
          <p>
              <a href="/">HOME</a>
          </p>
        </form>
      </div>
      </div>
      </div>
    );
}
