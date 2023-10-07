import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './styles.component.auth.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function CreateClass({setCookie, setUsername})  {
    const [form, setForm] = useState({
        className: "",
        classDescription: "",
        classTeacher: "",
        classCode: "",
    });
    const [classCreated, setClassCreated] = useState(false);
    const [resultMsg, setResultMsg] = useState("");

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
  
    async function onSubmit(e) {
        const resultMsg = "";
        e.preventDefault();
        const guest = { ...form };
        const response = await fetch(`${url}/record/create-class`, {
          method: "POST",
          mode: 'cors',
          credentials: 'include',
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
        // setForm({ className: "", classDescription: "", classTeacher: "", classCode:""});
        if (answer.success) {
          setClassCreated(true);
            
        } 
        setResultMsg(answer.msg);
    }

    async function createAnother() {
      setForm({ className: "", classDescription: "", classTeacher: "", classCode:""});
      setResultMsg("");
      setClassCreated(false);
    }

    if (!classCreated) {
      return (
        <div className="auth-inner">
          <form onSubmit={onSubmit}>
            <h3>Create a Class</h3>
            <div className="mb-3">
              <label htmlFor="username">className</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={form.className}
                onChange={(e) => updateForm({className: e.target.value})}
                placeholder="Enter class name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="classDescription">Class description</label>
              <input
                type="text"
                className="form-control"
                id="classDescription"
                value={form.classDescription}
                onChange={(e) => updateForm({classDescription: e.target.value})}
                placeholder="Enter class description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="classTeacher">Class Teacher</label>
              <input
                type="text"
                className="form-control"
                id="classTeacher"
                value={form.classTeacher}
                onChange={(e) => updateForm({classTeacher: e.target.value})}
                placeholder="Enter username of class teacher"
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
                placeholder="Enter six character, case sensitive alpha-numerical class code"
              />
            </div>
            <div className="mb-3">
              <p>{resultMsg}</p>
            </div>                              

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button><br></br>
              <NavLink className="btn btn-primary" to="../manageClasses">
                Cancel
              </NavLink>
            </div>

          </form>
        </div>  
      );
    } else {
      return(
        <div className="auth-inner">
          <p>{resultMsg}</p>
          <p>Class Name: {form.className}</p>
          <p>Description: {form.classDescription}</p>
          <p>Teacher: {form.classTeacher}</p>
          <p>Class Code: {form.classCode}</p>
          <div className="d-grid">
            <button className="btn btn-primary" onClick={createAnother}>
                  Create Another
            </button><br></br>
            <NavLink className="btn btn-primary" to="/calculus">
                  Back to Classes
            </NavLink>
          </div>
        </div>

      );
    }
  } 
