import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function ViewClass({username}) {
    const parameter = useParams()
    var chosenClass = parameter.classCode;

    const [classCode, setClassCode] = useState(chosenClass);
    const [classData, setClassData] = useState();

    useEffect(()=> {
        fetchClassData();
    }, [])
    // need to add a unique key and format my list
    async function fetchClassData() {
        let resultData = {};
        const result = await fetch(`${url}/class/view-class`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({classCode:classCode}),
        })
        .catch(error => {
            console.error(error);
            return;
        });
        resultData = await result.json()
        setClassData(resultData.classInfo);
    }  

    {
        if (!classData) {
            return (
                <div>
                    <p>Fetching class data . . .</p>
                    <NavLink to="/manageClasses">
                        <Button>Manage Classes</Button>
                    </NavLink>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{classData.className}</p>
                    <p>{classData.classDescription}</p>
                    <p>Teacher: {classData.classTeacher}</p>
                    <p>Class Code: {classData.classCode}</p>
                    <NavLink to="/manageClasses">
                        <Button>Manage Classes</Button>
                    </NavLink>
                </div>
            )
        }
    }

    

}