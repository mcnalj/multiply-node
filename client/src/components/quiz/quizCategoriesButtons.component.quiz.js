import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";



export default function QuizCategoriesButtons() {
    const [clicked, setClicked] = useState(false);
    const [categoryArray, setCategoryObj] = useState(['General Knowledge', 9])
    const navigate = useNavigate();

    const handleClick = (categoryObj) => {
        setClicked(true);
        setCategoryObj(categoryObj)

    }

    const chooseCategory = (category) => {
        navigate(`/getQuestions/${category}`, {
            categoryId: category
        });
    }

    const categories = [
        ['General Knowledge', 9],
        ['Entertainment: Books', 10],
        ['Entertainment: Cartoons & Animations', 32],
        ['Entertainment: Comics', 29],
        ['Entertainment: Film', 11 ],
        ['Entertainment: Japanese Anime & Manga', 31 ],
        ['Entertainment: Music', 12],
        ['Entertainment: Musicals & Theater',13 ],
        ['Entertainment: Television', 14],
        ['Entertainment: Video Game', 15],    
        ['Entertainment: Board Games', 16],
        ['Science & Nature', 17],
        ['Science: Computers', 18],
        ['Science: Gadgets', 30],
        ['Science: Mathematics', 19],
        ['Mythology', 20],
        ['Sports', 21],
        ['Geography', 22],
        ['History', 23],
        ['Politics', 24],
        ['Art', 25],
        ['Celebrities', 26],
        ['Animals', 27],
        ['Vehicles', 28]
    ]
    if (clicked) {
        return (
            <div id="buttonField">
                <h3>{categoryArray[0]}</h3>
                <div className="buttonContainer">
                    <button className="categoryButton" value={categoryArray} onClick={e =>chooseCategory(e.target.value)}>Go to Quiz!</button>
                </div>                
            </div>
        )
    } else {
        return (
            <div id="buttonField">
                {categories.map((category) => (
                    <div key={category[1]} className="buttonContainer">
                        <button className="categoryButton" value={category[1]} onClick={e => handleClick(e.target.value)}>{category[0]}</button>
                    </div>
                ))}
            </div>
        );
    }
};