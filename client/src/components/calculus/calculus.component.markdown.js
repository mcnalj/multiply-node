import React, { useState} from "react";
import ReactMarkdown from 'react-markdown';

import { config} from '../constants.js';
var url = config.url.API_URL;

export default function Markdown() {
    const [markdownContent, setMarkdownContent] = useState('');

    async function handleClick () {
        console.log("You requested markdown.")
        // const response = await fetch("http://localhost:5000/markdownService")
        // const response = await fetch("http://localhost:5000/record/markdownRoute")
        const response = await fetch(`${url}/record/markdownRoute`)
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const text = await response.text();
        setMarkdownContent(text);
    }
    return (
        <div>
            <div>
                <h1>Markdown Route</h1>
            </div>
            <ReactMarkdown children={markdownContent} />
            <div>
                <button type="button" className="btn btn-lg btn-success" onClick={handleClick}>Request Markdown</button>
            </div>
        </div>
    );
}