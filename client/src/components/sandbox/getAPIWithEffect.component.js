import React, { useState, useEffect } from "react";


export default function GetAPIWithRef() {
    const [data, setData] = useState({
        result: []
    });
    const [error, setError] = useState({
        error: ""
    });
    const [isLoaded, setIsLoaded] = useState({
        isLoaded: false
    });
    useEffect(()=> {
        getAPIData();
    }, []);
    var tickerItems = [];
    console.log(`isLoaded: ${isLoaded.isLoaded}`);
    if (isLoaded.isLoaded == true) {
        var day = "positive";
        tickerItems = data.result.map(
            ticker=> {
            if (ticker.regularMarketChangePercent>=0) {
                day = "positive";
            } else {
                day = "negative";
            }
            return (
            <div className="stock" key={ticker.symbol}>
                <p className="ticker">{ticker.symbol}</p>
                <p className="price">Price: {ticker.regularMarketPrice}</p>
                <p className="price">Change: <span className={day}>{Math.round(ticker.regularMarketChangePercent * 100)/100} % </span></p>
                <p className="high52">52 week high: {ticker.fiftyTwoWeekHigh}</p>
                <p className="low52">52 week low: {ticker.fiftyTwoWeekLow}</p>
            </div>
            );
            }
            );
    }
    
    async function getAPIData() {
        await fetch("http://localhost:5000/record/getAPI")
            .then(res => res.json())
            .then(
                (result) => {
                console.log(result);
                setIsLoaded({isLoaded: true});
                setData({result: result.result});
                console.log(data);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
    }
    return (
        <div className="stockDisplay">
            <div>{tickerItems}</div>
        </div>
    );
}