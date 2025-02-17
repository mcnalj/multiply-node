import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import './styles.component.navbar.scss';
import { config} from '../constants';

var url = config.url.API_URL;
const defaultAvatar = "https://via.placeholder.com/40?text=👤";

export default function Navigation({isAuthenticated, username, avatarUrl}) {
  const navigate = useNavigate();
  console.log("username in navbar: " + username);

  const profileImage = avatarUrl || defaultAvatar;
  
  return (
      <Navbar bg="dark" expand="sm" className="custom-navbar">
        <Container>
          <Navbar.Brand className="nav-text me-3" href="/calculusHome">STEM Circus</Navbar.Brand>
          <Dropdown className="d-sm-none">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className="border-0 text-decoration-none text-light p-0 d-flex align-items-center"
            >
              <Image
                src={profileImage}
                alt="Avatar"
                width={40}
                height={40}
                roundedCircle
                className="me-1"
              />
              {/* <span className="caret" style={{ fontSize: "1rem" }}>▼</span> */}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {isAuthenticated ? (
                <>
                  <Dropdown.Item href="/userProgress">{isAuthenticated ? "Progress" : ""}</Dropdown.Item>
                  <Dropdown.Item href="/manageClasses">{isAuthenticated ? "Manage Classes" : ""}</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/updateProfile')}>Update Profile</Dropdown.Item>
                  <Dropdown.Item href="/privacy">Privacy Policy</Dropdown.Item>
                  <Dropdown.Item href="/termsofservice">Terms of Service</Dropdown.Item>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item href="/login">Sign-in</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <NavLink className="nav-text mx-3 d-flex align-items-center" to="/calculus">Calculus</NavLink>
              <NavLink className="nav-text mx-3 d-flex align-items-center" to="/summerPrepTopics">Summer Prep</NavLink>
              {/* <Nav.Link className="nav-text" href="/categories">Trivia</Nav.Link>
              <Nav.Link className="nav-text" href="/multiply">Multiply</Nav.Link> */}
            </Nav>
            <div className="d-none d-sm-flex align-items-center">
              <Image
                src={profileImage}
                width={40}
                height={40}
                roundedCircle
                className="me-2 cursor-pointer"
                onClick={() => isAuthenticated && navigate('/updateProfile')}
              />
              {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-user"
                      className="border-0 text-decoration-none text-light p-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Item href="/userProgress">{isAuthenticated ? "Progress" : ""}</Dropdown.Item>
                      <Dropdown.Item href="/manageClasses">{isAuthenticated ? "Manage Classes" : ""}</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/updateProfile')}>Update Profile</Dropdown.Item>
                      <Dropdown.Item href="/privacy">Privacy Policy</Dropdown.Item>
                      <Dropdown.Item href="/termsofservice">Terms of Service</Dropdown.Item>
                      <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
              ): (
                <Nav.Link href="/login" className="text-light">Sign-in</Nav.Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}