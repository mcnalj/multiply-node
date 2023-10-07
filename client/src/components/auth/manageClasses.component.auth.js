import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function ManageClasses({username}) {
    return (
        <div className="auth-inner">
            <div>
                <h1>Manage Classes</h1>
            </div>
            <ClassList
                username={username}
            />

            <div>
                {/* <NavLink to="/createClass">
                    <Button type="button" variant="primary" size="lg">Create a Class</Button><br /><br />
                </NavLink> */}
                <NavLink to="/success">
                    <Button className="mt-3" type="button" variant="primary" size="lg">Home</Button>
                </NavLink>
            </div>
        </div>
    );
}

// function JoinClass({username}) {
//     const [form, setForm] = useState({
//         classCode: ""
//     });
//     const [joinMsg, setJoinMsg] = useState("");

//     function updateForm(value) {
//         return setForm((prev) => {
//             return { ...prev, ...value };
//         });
//     }

//     async function onSubmit(e) {
//         const msg = "";
//         e.preventDefault();
//         const classInfo = { ...form };
//         const response = await fetch(`${url}/class/join-class`, {
//           method: "POST",
//           mode: 'cors',
//           credentials: 'include',
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(classInfo),
//         })
//         .catch(error => {
//           window.alert(error);
//           return;
//         });
//         const answer = await response.json();
//         setForm({ classCode: ""});
//         setJoinMsg(answer.msg);
//     }

//     return (
//         <div className="auth-inner">
//             <form onSubmit={onSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="username">Join a Class</label>
//                     <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     value={form.classCode}
//                     onChange={(e) => updateForm({classCode: e.target.value})}
//                     placeholder="Enter class code"
//                     />
//                 </div>
//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-primary">
//                     Join
//                     </button><br></br>
//                 </div>
//                 <p>{joinMsg}</p>
//             </form>
//         </div>  
//       )
// }

function ClassList({username}) {
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
                <p className="m-5">Sorry, {username} is not a member of any classes.</p>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h3>{username}'s' Classes</h3>
                </div>
                <div>
                    {classData.map((data) => (
                        <div key={data}>
                            <NavLink to={`/viewClass/${data}`}>
                                <Button className="mt-3" size="lg" type="button" variant="primary">{data}</Button>
                            </NavLink>                        
                        </div>
                    ))}
                </div>
                {/* <JoinClass
                    username={username}
                /> */}
            </div>
        );
    }    
}

