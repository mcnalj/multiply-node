import React, { useState, useEffect } from "react";

import { config} from '../constants';
var url = config.url.API_URL;

export default function ListUsers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    console.log ("At component");
    useEffect(() => {
      async function getUsers() {
        console.log("Running get Users");
        const response = await fetch(`${url}/record/listUsers`);

        if (!response.ok) {
          setIsLoaded(true);
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        console.log("Got response.");
        setIsLoaded(true);
        const record = await response.json();
        setUsers(record);
        console.log(record);
      }

      getUsers();
      return;
    }, [users.length]);
        
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <h3>Usernames</h3>
            <p>from users collection in employees db:</p> 
            {users.map((user) => (
                <p key={user.username}>{user.username}</p>
            ))}
          
        </div>
      )
    }
  }