import React from "react";
import { Link } from 'react-router-dom';
export default function ExponentsTopics() {
    return (
        <div>
            <div>
                <h1>Exponents Practice</h1>
            </div>
            <div>
                <div>
                    <Link to="/exponents2/positive">
                        <button type="button" className="btn btn-lg btn-success">Simple Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/exponents2/negative">
                        <button type="button" className="btn btn-lg btn-success">Negative Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/exponents2/fractional">
                        <button type="button" className="btn btn-lg btn-success">Fractional Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/exponents2/negativeFractional">
                        <button type="button" className="btn btn-lg btn-success">Negative Fractional Exponents</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/exponents/mixed">
                        <button type="button" className="btn btn-lg btn-success">Mix of All Types</button><br /><br />
                    </Link>
                </div>
                <div>
                    <Link to="/calculus">
                        <button type="button" className="btn btn-lg btn-success">Back to Calculus</button><br /><br />
                    </Link>
                </div>                                
            </div>
        </div>
    );
}
