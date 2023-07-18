import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import './quizBase.component.quiz.scss';
// turn this into a react-boostrap dropdown situation. I think it will replace <Categor />
// I mean I think it will replace the first function

export default function QuizCategories() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const navigate = useNavigate();

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
    return (
        <div className="quizContent">
            <Category
                open={open}
                trigger={<Button variant="info" onClick={handleOpen}>Dropdown</Button>}
                menu={categories}
                chooseCategory={chooseCategory}
             />
        </div>
    );
};

function Category ({open, trigger, menu, chooseCategory}) {
    return (
        <div className="dropdown">
            {trigger}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem) => (
                        <li key={menuItem[1]} className="menu-item">
                            <Button variant="info" value={menuItem[1]} onClick={e => chooseCategory(e.target.value)}>{menuItem[0]}</Button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};


