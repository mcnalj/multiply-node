import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
    standards
  } from '../infrastructure/standards.js';
 
export default function StandardsCategories({username}) {
    console.log(standards[0]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="m-2">
                    <h1>Standards Categories</h1>
                    <h3>Choose a category and assess your progress on the topics in that category.</h3>
                </div>
                <div style={{display: "block"}} className="m-2">
                {standards.map(function(category) {
                return (
                        <NavLink to={"/standardsTopics/" + category.id} key={category.id}>
                            <Button variant="primary" className="m-2">{category.categoryTitle}</Button><br></br>
                        </NavLink>
                        )
                  })}                                
                    <NavLink to="/calculus" >
                        <Button variant="success" className="m-2">Back to Calculus</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}