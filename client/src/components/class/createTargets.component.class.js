import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
// import './styles.component.auth.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function CreateTargets({setCookie, setUsername})  {
    const [form, setForm] = useState({
        expeditionName: "",
        expeditionDescription: "",
        classCode: "MT2023",
    });
    const [expeditionCreated, setExpeditionCreated] = useState(false);
    const [showTargetEntry, setShowTargetEntry] = useState(false);
    const [targetsArray, setTargetsArray] = useState([]);
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
  
    async function onSubmit(e) {
        e.preventDefault();
        const expedition = { ...form };
        const response = await fetch(`${url}/class/create-expedition`, {
          method: "POST",
          mode: 'cors',
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(expedition),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        const answer = await response.json();
        if (answer.success) {
          setExpeditionCreated(true);    
        } 
    }

    async function openTargetEntry() {
      setShowTargetEntry(true);
    }

    async function createTarget() {
    }

    if (!expeditionCreated) {
      return (
        <div>
          <form onSubmit={onSubmit}>
            <h3>Create Learning Targets for an Expedition or Unit</h3>
            <div className="mb-3">
              <label htmlFor="expeditionName">Expedition Name</label>
              <input
                type="text"
                className="form-control"
                id="expeditionName"
                value={form.expeditionName}
                onChange={(e) => updateForm({expeditionName: e.target.value})}
                placeholder="Enter expedition or unit name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expeditionDescription">Expedition description</label>
              <input
                type="text"
                className="form-control"
                id="expeditionDescription"
                value={form.expeditionDescription}
                onChange={(e) => updateForm({expeditionDescription: e.target.value})}
                placeholder="Enter a description of the expedition or unit"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button><br></br>
              <NavLink className="btn btn-primary" to="../manageClasses">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>  
      );
    } else {
      return(
        <div>
            <div>
                <h3>{form.expeditionName}</h3>
                <p>{form.expeditionDescription}</p>
            </div>
            {targetsArray.map((target) => (
                <div>
                    <p>target.targetName</p>
                    <p>target.target</p>
                    <p>target.guidance</p>
                    <p>target.targetRating</p>
                    <p>target.maxRating</p>
                    <p>target.maxGuidance</p>
                    <p>target.minRating</p>
                    <p>target.minGuidance</p>
                </div>
            ))}
           if (!showTargetEntry) {(
            <div className="d-grid">
              <button className="btn btn-primary" onClick={openTargetEntry}>
                    Add a Target
              </button><br></br>
              <NavLink className="btn btn-primary" to="/calculus">
                    Done
              </NavLink>
            </div>
          )} else { (
            <div className="d-grid">
              <p>Create the target entry form.</p>
              <button className="btn btn-primary" onClick={createTarget}>
                    Create Target
              </button><br></br>
              <NavLink className="btn btn-primary" to="/calculus">
                    Cancel
              </NavLink>
            </div>
          )} 
        </div>
      );
    }
  } 
