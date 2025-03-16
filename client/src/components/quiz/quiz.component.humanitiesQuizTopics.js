import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import './quizBase.component.quiz.scss';



export default function QuizHumanitiesTopics() {
    const [clicked, setClicked] = useState(false);
    const [categoryArray, setCategoryObj] = useState(['Relevance', 400])
    const navigate = useNavigate();

    const handleClick = (categoryObj) => {
        setClicked(true);
        setCategoryObj(categoryObj)

    }

    const chooseCategory = (category) => {
        navigate(`/quizHumanities/${category}`, {
            categoryId: category
        });
    }

    const categories = [
        ['Relevance', 400],
        ['Witnesses', 600],
        ['Hearsay', 800],
        ['Hearsay Exceptions', 850],
        ['Mix', 1000],
    ]
    if (clicked) {
        return (
            <div id="buttonField" className="p-4">
                <div className="buttonContainer">
                    <Button className="categoryButton" value={categoryArray} onClick={e =>chooseCategory(e.target.value)}>Go to Quiz!</Button>
                </div>                
            </div>
        )
    } else {
        return (
            <div id="buttonField">
                <br></br>
                <h3>Mock Trial Quizzes</h3>
                {categories.map((category) => (
                    <div key={category[1]} className="buttonContainer m-3">
                        <Button className="categoryButton" value={category[1]} onClick={e => handleClick(e.target.value)}>{category[0]}</Button>
                    </div>
                ))}
            </div>
        );
    }
};