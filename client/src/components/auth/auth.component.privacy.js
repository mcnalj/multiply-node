import React, { useState} from "react";
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

import { config} from '../constants.js';

const API_URL = config.url.API_URL;

function MarkdownViewer({markdownContent, isLoading, error}) {
    return (
        <div>
            {isLoading ? (
                <p>Loading . . .</p>
            ) : error ? (
                <p>An error ocurred: {error}</p>
            ) : (
                <ReactMarkdown children={markdownContent} />
            )}
        </div>
    );
}

export default function PrivacyPolicy() {
    const [markdownRequested, setMarkdownRequested] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleClick () {
        setMarkdownRequested(true);
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/markdownPrivacyPolicy`)
            if (!response.ok) {
                setError(`Status: ${response.status}`);
                return;
            }
            const text = await response.text();
            setMarkdownContent(text);    
        } catch (error) {
            setError('An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleClearMarkdown() {
        setMarkdownRequested(false);
        setMarkdownContent('');
        setIsLoading(false);
        setError('');
    }

    return (
        <div>
            { markdownRequested ? (
                <div>
                    <MarkdownViewer
                        markdownContent={markdownContent}
                        isLoading={isLoading}
                        error={error}
                    />
                    <button
                        type="button"
                        className="btn btn-lg btn-success"
                        onClick={handleClearMarkdown}
                    >
                        Hide Privacy Policy
                    </button>
                </div>
            ) : (
                <div>
                    <div>
                        <h1>Markdown Route</h1>
                    </div>
                    <button
                        type="button"
                        className="btn btn-lg btn-success"
                        onClick={handleClick}
                    >
                        Get Calculus Circus Privacy Policy
                    </button>
                </div>
            )}
        </div>    
    );
}