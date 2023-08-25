import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './styles.component.navbar.scss';

// export default function Navbar1() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">Navbar</a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                         <NavLink to="/categories" className="nav-link active" aria-current="page" href="#">Home</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Math</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Blog</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="/logout">Logout</a>
//                         </li>                        
//                     </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>

//     );
// }

export default function Navigation({username, loggedIn}) {
    return (
        <Navbar bg="dark" expand="sm" className="custom-navbar">
        <Container>
          <Navbar.Brand className="nav-text" href="/">STEM Circus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-text" href="/calculus">Calculus</Nav.Link>
              {/* <Nav.Link className="nav-text" href="/categories">Trivia</Nav.Link>
              <Nav.Link className="nav-text" href="/multiply">Multiply</Nav.Link> */}
              
            </Nav>
            <Nav>
              <Nav.Link className="nav-text" href="/">{username}</Nav.Link>
              <Nav.Link className="nav-text" href="/userProgress">{loggedIn ? "Progress" : ""}</Nav.Link>
              <Nav.Link className="nav-text" href={loggedIn ? "/logout" : "/login"}>{loggedIn ? "Logout" : "Login" }</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
}