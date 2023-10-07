import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;


function JoinClass({username}) {
    const [form, setForm] = useState({
        classCode: ""
    });
    const [joinMsg, setJoinMsg] = useState("");

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const classInfo = { ...form };
        const response = await fetch(`${url}/class/join-class`, {
          method: "POST",
          mode: 'cors',
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(classInfo),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        const answer = await response.json();
        setForm({ classCode: ""});
        setJoinMsg(answer.msg);
    }

    return (
        <div className="auth-inner">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="username">Join a Class</label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={form.classCode}
                    onChange={(e) => updateForm({classCode: e.target.value})}
                    placeholder="Enter class code"
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                    Join
                    </button><br></br>
                </div>
                <p>{joinMsg}</p>
            </form>
        </div>  
      )
}

export default function ListClasses({username}) {
    const [classData, setClassData] = useState([]);

    useEffect(()=> {
        fetchClassData();
    }, [])
    // need to add a unique key and format my list
    async function fetchClassData() {
        let resultData = {};
        const result = await fetch(`${url}/record/listClasses`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
        })
        .catch(error => {
            console.error(error);
            return;
        });
        resultData = await result.json()
        setClassData(resultData.usersData);
    }
    if (!classData || classData.length === 0) {
        return (
            <div>
            <div>
                <p className="m-5">Sorry, {username} is not a member of any classes.</p>
            </div>
            <JoinClass
                username={username}
            />
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h1>{username}'s' Classes</h1>
                </div>
                <div>
                    {classData.map((data) => (
                        <div key={data.classCode}>
                            <div>
                                <p>Class Name: {data.className}</p>
                                <p>Description: {data.classDescription}</p>
                                <p>Teacher: {data.classTeacher}</p>
                                <p>Class Code: {data.classCode}</p>
                            </div>
                            <br></br>                        
                        </div>
                    ))}
                </div>
                <JoinClass
                    username={username}
                />
                <div>
                    <NavLink to="/manageClasses">
                        <Button type="button" variant="primary" size="lg">Back to Manage Classes</Button><br /><br />
                    </NavLink>
                    <NavLink to="/createClass">
                        <Button type="button" variant="primary" size="lg">Create a Class</Button><br /><br />
                    </NavLink>
                </div>
            </div>
        );
    }
}
