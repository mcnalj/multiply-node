import React, { useState, useEffect } from "react";

import { config} from '../constants';
var url = config.url.API_URL;

export default function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    console.log ("At component");
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      async function getRecord() {
        console.log("Running get Record");
        const response = await fetch(`${url}/record/fetch`);

        if (!response.ok) {
          setIsLoaded(true);
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        console.log("Got response.");
        setIsLoaded(true);
        const record = await response.json();
        setItems(record.unitTopics);
        console.log(record);
        console.log(record.unitTopics);
      }

      getRecord();
      return;
    }, [items.length]);
        
    //     .then(response => response.json())
    //     .then(
    //       (result) => {
    //         console.log(result)
    //         setIsLoaded(true);
    //         setItems(result);
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )
    // }, [items])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((item) => (
            <p key={item.topicId}>{item.topicData.displayName}</p>
          ))}
          
        </div>
      )
    }
  }