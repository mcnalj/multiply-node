import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function UsersCC({userId})  {
    const [usersList, setUsersList] = useState([]);
    useEffect(()=> {    
        fetchUsersList();
    }, []);

    async function fetchUsersList() {
        console.log("fetchingUsers");
        try {
        const result = await fetch(`${url}/users/usersCC`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
        })
        const data = await result.json();
        console.log("Fetched users: ", data);
        let sortedUsers = data.data.sort((a,b) => new Date(b.lastLogin) - new Date(a.lastLogin));
        setUsersList(sortedUsers);
        } catch(error) {
            console.error("Error fetching users: ", error.message);
            return;
        }
    }

    function sortByDateCreated() {
        let sortedUsers = [...usersList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsersList(sortedUsers);
    }

    function sortByLastLogin() {
        let sortedUsers = [...usersList].sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
        setUsersList(sortedUsers);
    }

    function sortByLastName() {
        console.log("sorting by last name")
        let sortedUsers = [...usersList].sort((a, b) => a.family_name.localeCompare(b.family_name));
        setUsersList(sortedUsers);
    }

    function sortByFirstName() {
        console.log("sorting by first name")
        let sortedUsers = [...usersList].sort((a, b) => a.given_name.localeCompare(b.given_name));
        setUsersList(sortedUsers);
    }

    function sortByMostRecentAction() {
        console.log("sorting by most recent action")
        let sortedUsers = [...usersList].sort((a, b) => new Date(b.actions[0]?.timeStamp) - new Date(a.actions[0]?.timeStamp));
        setUsersList(sortedUsers);
    }

    function sortByMostActions() {
        console.log("sorting by most actions")
        let sortedUsers = [...usersList].sort((a, b) => b.actions.length - a.actions.length);
        setUsersList(sortedUsers);
    }

    return (
        <div>
            <div>
                <h3>Circus Performers</h3>
                <div className="row">
                    <div className="col-2" onClick={sortByDateCreated}>
                        <p>DATE CREATED</p>
                    </div>
                    <div className="col-2" onClick={sortByLastLogin}>
                        <p>LAST LOGIN</p>
                    </div>
                    <div className="col-2" onClick={sortByLastName}>
                        <p>LAST NAME</p>
                    </div>
                    <div className="col-2" onClick={sortByFirstName}>
                        <p>FIRST NAME</p>
                    </div>
                    <div className="col-2" onClick={sortByMostRecentAction}>
                        <p>RECENT ACTION</p>
                    </div>
                    <div className="col-2" onClick={sortByMostActions}>
                        <p>MOST ACTIONS</p>
                    </div>
                </div>
            </div>
            { usersList.length === 0 ?
                (        
                    <div>
                        <p> Loading users . . .</p>
                        <Button onClick={fetchUsersList}> Click</Button>
                    </div>
                ) :
                (
                    <div>
                        {usersList.map((user) => {
                                let options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                }
                                let dateCreatedObj = new Date(user.createdAt);
                                let dateCreatedString = dateCreatedObj.toLocaleString("en-US", options);
                                let dateLoginObj = new Date(user.lastLogin);
                                let dateLoginString = dateLoginObj.toLocaleString("en-US", options);
                                let dateRecentAction = "none";
                                if (user.actions.length > 0) {
                                    let dateRecentActionObj = new Date(user.actions[0]?.timeStamp);
                                    dateRecentAction = dateRecentActionObj.toLocaleString("en-US", options);   
                                }                                    
                                return (
                                    <div key={user._id}>
                                        <Link 
                                            to={`/userActionsCC`}
                                            state={{ user }}
                                            style={{ textDecoration: "none", color: "blue"}}>
                                            <p>{user.name}</p>
                                        </Link>
                                        <p>Account created: {dateCreatedString}</p>
                                        <p>Last login: {dateLoginString}</p>
                                        <p>Total actions: {user.actions.length}</p>
                                        <p>Most recent Action: {dateRecentAction}</p>
                                        <br></br>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}