import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function ManageClasses({userId, username}) {
    return (
        <Container fluid className="pt-4">
            <Row className="justify-content-center">
                <Col xs={11} sm={10} md={9} lg={8} xl={7}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <h3 className="mb-4 text-center">Manage Classes</h3>
                            <ClassList userId={userId} username={username} />
                            
                            <div className="d-grid gap-2 mt-4">
                                <NavLink className="btn btn-primary btn-lg" to="/createClass">
                                    Create a Class
                                </NavLink>
                                <NavLink className="btn btn-outline-secondary" to="/success">
                                    Home
                                </NavLink>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function ClassList({userId, username}) {
    const [classData, setClassData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchClassData();
    }, [])
    
    async function fetchClassData() {
        setLoading(true);
        try {
            const result = await fetch(`${url}/record/listOwnedClasses`, {
                method: "POST",
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            
            if (result.ok) {
                const resultData = await result.json();
                setClassData(resultData.ownedClasses || []);
            } else {
                console.error('Failed to fetch classes');
                setClassData([]);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
            setClassData([]);
        } finally {
            setLoading(false);
        }
    }
    
    if (loading) {
        return (
            <Card className="mb-4">
                <Card.Body className="text-center">
                    <p>Loading your classes...</p>
                </Card.Body>
            </Card>
        );
    }
    
    if (!classData || classData.length === 0) {
        return (
            <Card className="mb-4">
                <Card.Body className="text-center">
                    <h5 className="text-muted">No Classes Found</h5>
                    <p className="text-muted">
                        {username ? `${username}, you don't own any classes yet.` : 'You are not an owner of any classes.'}
                    </p>
                    <p className="text-muted">Create a new class to get started!</p>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card className="mb-4">
                <Card.Header>
                    <h5 className="mb-0">{username}'s Classes ({classData.length})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                    <ListGroup variant="flush">
                        {classData.map((classInfo) => (
                            <ListGroup.Item key={classInfo.classCode} className="p-3">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1 fw-bold">{classInfo.className}</h6>
                                        <p className="mb-1 text-muted small">{classInfo.classDescription}</p>
                                        <div className="mb-2">
                                            <small className="text-muted">
                                                <strong>School:</strong> {classInfo.schoolName || 'Not specified'} | 
                                                <strong> Teacher:</strong> {classInfo.teacherName || 'Not specified'} | 
                                                <strong> Code:</strong> <code className="bg-light px-1">{classInfo.classCode}</code>
                                            </small>
                                        </div>
                                        <div className="d-flex gap-2 align-items-center">
                                            <Badge bg="primary" className="d-flex align-items-center">
                                                <i className="bi bi-people-fill me-1"></i>
                                                {classInfo.memberCount} member{classInfo.memberCount !== 1 ? 's' : ''}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-2 ms-3">
                                        <NavLink 
                                            className="btn btn-outline-primary btn-sm" 
                                            to={`/classProgress/${classInfo.classCode}`}
                                        >
                                            View Progress
                                        </NavLink>
                                        <NavLink 
                                            className="btn btn-outline-success btn-sm" 
                                            to={`/addStudentsToClass/${classInfo.classCode}`}
                                        >
                                            Manage Students
                                        </NavLink>
                                        <NavLink 
                                            className="btn btn-outline-warning btn-sm" 
                                            to={`/editClass/${classInfo.classCode}`}
                                        >
                                            Edit Class Info
                                        </NavLink>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }    
}

