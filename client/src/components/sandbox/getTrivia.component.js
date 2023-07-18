import React, { useState, useEffect } from "react";
import axios from 'axios';
// The API call is working, but I'm not able to set state
// Weirdly it works sometimes. I can't figure out when or why.

export default function GetTrivia() {
    const [data, setData] = useState({stuff: ""});
    const [error, setError] = useState({error: ""});
    const [isLoaded, setIsLoaded] = useState({isLoaded: false});

    useEffect(()=> {
        async function getAPIAxios() {
            await axios.get("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple")
                .then(
                    (result) => {
                        console.log(result);
                        console.log(result.data.results);
                        setIsLoaded({isLoaded: true});
                        console.log(result.data.results[0].category)
                        return result
                        // setData({stuff: result.data.results[0].category});
                        // console.log(data);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                ).then(
                    (result) => {
                         setData({stuff: result.data.results[0].category});
                        // setData({questionsArray: result.data.results});
                        console.log(data);
                    }
                )
        }
        getAPIAxios()
    }, []);

    var questions = [];
    console.log(`isLoaded: ${isLoaded.isLoaded}`);
    if (isLoaded.isLoaded == true) {

    }
    return (
        <div className="stockDisplay">
            <div>Questions go here.</div>
        </div>
    );
}
