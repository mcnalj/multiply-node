import React from "react";
import { Link } from 'react-router-dom';
export default function DerivativesTopics() {
    return (
        <div>
            <div>
                <h1>Derivatives: Power Rule Practice</h1>
            </div>
            <div>
                <div>
                    <Link to="/derivatives/210">
                        <button type="button" className="btn btn-lg btn-success">Plain Power Rule</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/220">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Integer Coefficients</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/230">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Fractional Coefficients</button><br /><br />
                    </Link>
                </div>                
                <div>
                    <Link to="/derivatives/240">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/250">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Exponents and Integer Coefficients</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/260">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Exponents and Fractional Coefficients</button><br /><br />
                    </Link>
                </div>                
                <div>
                    <Link to="/derivatives/270">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Fractional Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/280">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Fractional Exponents and Integer Coefficients</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/290">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Fractional Exponents and Fractional Coefficients</button><br /><br />
                    </Link>
                </div>                                
                <div>
                    <Link to="/derivatives/300">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Fractional Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/310">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Fractional Exponents and Integer Coefficients</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/derivatives/320">
                        <button type="button" className="btn btn-lg btn-success">Power Rule with Negative Fractional Exponents and Fractional Coefficients</button><br /><br />
                    </Link>
                </div>                                
                <div>
                    <Link to="/derivatives/330">
                        <button type="button" className="btn btn-lg btn-success">Power Rule Mix</button><br /><br />
                    </Link>
                </div>                
            </div>
        </div>
    );
}