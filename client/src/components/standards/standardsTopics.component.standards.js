import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import {
    standards
  } from '../infrastructure/standards.js';

export default function StandardsTopics({username}) {

    const parameter = useParams()
    var category = parameter.category;
    function setCategoriesArray(category) {
        let categoryObj = standards.find((categoryObj) => categoryObj.id === category)
        console.log(categoryObj);
        let topicsArray = categoryObj.topicsArray;
        if (topicsArray) {
            return(topicsArray);
        } else {
            return("We could not find that category!");
        }
    }

    var categoryTopicsArray = setCategoriesArray(category);

    console.log(categoryTopicsArray);

    return (
        <div className="row">
            <div className="col-12">
                <div className="m-2">
                    <h1>Standards Topics</h1>
                    <h3>Choose a category and assess your progress on the topics in that category.</h3>
                </div>
                <div style={{display: "block"}} className="m-2">
                {categoryTopicsArray.map(function(topic) {
                return (
                        <div key={topic.id}>
                            <NavLink to={"/standardsTracker/" +topic.id}>
                                <Button  variant="primary" className="m-3">{topic.topicTitle}</Button>
                            </NavLink>
                        </div>
                        )
                  })}                                

                    <NavLink to="/standardsCategories" >
                        <Button variant="success" className="m-2">Back to Standards Categories</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}