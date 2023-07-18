import React, {useEffect, useState} from 'react';

export default function Dropdown() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleMenuOne = () => {
        console.log("clicked one");
        setOpen(false);
    }
    const handleMenuTwo = () => {
        console.log("clicked two");
        setOpen(false);
    }

    return (
        <div className="dropdown">
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul className="menu">
                    <li className="menu-item">
                        <button onClick={handleMenuOne}>Menu 1</button>
                    </li>
                    <li className="menu-item">
                        <button onClick={handleMenuTwo}>Menu 2</button>
                    </li>                    
                </ul>
            ) :null }
            {open ? <div>Is Open</div> : <div>Is Closed</div>}
        </div>
    )
}

// go here to finish it off and make it reusable https://www.robinwieruch.de/react-dropdown/