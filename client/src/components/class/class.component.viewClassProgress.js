import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;

export default function ViewClassProgress({ userId }) {
    const { classCode } = useParams();
    
    const [classData, setClassData] = useState(null);
    const [students, setStudents] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        if (classCode) {
            fetchClassData();
        }
    }, [classCode]);

    const fetchClassData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/class/progress/${classCode}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setClassData(data);
                setStudents(data.studentProgress || []);
                setProgressData(data.studentProgress || []);
            } else {
                setMessage('Failed to load class information');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
            setMessage('Error loading class information');
            setMessageType('danger');
        } finally {
            setLoading(false);
        }
    };

    if (!classCode) {
        return (
            <Container className="pt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Alert variant="danger">
                            <h4>No Class Code Provided</h4>
                            <p>Please navigate to this page from the manage classes screen.</p>
                            <NavLink className="btn btn-primary" to="/manageClasses">
                                Back to Manage Classes
                            </NavLink>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container className="pt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-sm">
                            <Card.Body className="text-center p-5">
                                <Spinner animation="border" role="status" className="mb-3">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p>Loading class progress...</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="pt-4">
            <Row className="justify-content-center">
                <Col xs={12} lg={11} xl={10}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            {/* Class Header */}
                            <div className="text-center mb-4">
                                <h3 className="mb-2">{classData?.className || 'Class Progress'}</h3>
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <Badge bg="secondary" className="fs-6">
                                        Class Code: {classCode}
                                    </Badge>
                                    <Badge bg="primary" className="fs-6">
                                        {students.length} Student{students.length !== 1 ? 's' : ''}
                                    </Badge>
                                </div>
                            </div>

                            {message && (
                                <Alert variant={messageType} className="mb-4">
                                    {message}
                                </Alert>
                            )}

                            {/* Progress Table */}
                            {students.length > 0 ? (
                                <div className="table-responsive">
                                    <Table striped bordered hover className="mb-0">
                                        <thead className="table-dark">
                                            <tr>
                                                <th rowSpan="2" className="align-middle text-center">Student Name</th>
                                                <th colSpan="3" className="text-center">Totals</th>
                                                <th colSpan="3" className="text-center">Summer Prep</th>
                                                <th colSpan="3" className="text-center">Derivatives</th>
                                                <th colSpan="3" className="text-center">Integrals</th>
                                            </tr>
                                            <tr>
                                                {/* Totals subheadings */}
                                                <th className="text-center small">Last Action</th>
                                                <th className="text-center small">Total Actions</th>
                                                <th className="text-center small">Total Time</th>
                                                {/* Summer Prep subheadings */}
                                                <th className="text-center small">Last Action</th>
                                                <th className="text-center small">Total Actions</th>
                                                <th className="text-center small">Total Time</th>
                                                {/* Derivatives subheadings */}
                                                <th className="text-center small">Last Action</th>
                                                <th className="text-center small">Total Actions</th>
                                                <th className="text-center small">Total Time</th>
                                                {/* Integrals subheadings */}
                                                <th className="text-center small">Last Action</th>
                                                <th className="text-center small">Total Actions</th>
                                                <th className="text-center small">Total Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student, index) => (
                                                <tr key={index}>
                                                    <td className="fw-bold">
                                                        {student.userId ? (
                                                            <Link 
                                                                to={`/userProgress/${student.userId}`}
                                                                className="text-decoration-none"
                                                                style={{
                                                                    color: '#9966CC',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.color = '#663399';
                                                                    e.target.style.textDecoration = 'underline';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.color = '#9966CC';
                                                                    e.target.style.textDecoration = 'none';
                                                                }}
                                                            >
                                                                {student.displayName || student.username || student}
                                                            </Link>
                                                        ) : (
                                                            student.displayName || student.username || student
                                                        )}
                                                    </td>
                                                    {/* Totals */}
                                                    <td className="text-center">{student.totals?.lastAction || '--'}</td>
                                                    <td className="text-center">{student.totals?.totalActions || 0}</td>
                                                    <td className="text-center">{student.totals?.totalTime || 0} min</td>
                                                    {/* Summer Prep */}
                                                    <td className="text-center">{student.summerPrep?.lastAction || '--'}</td>
                                                    <td className="text-center">{student.summerPrep?.totalActions || 0}</td>
                                                    <td className="text-center">{student.summerPrep?.totalTime || 0} min</td>
                                                    {/* Derivatives */}
                                                    <td className="text-center">{student.derivatives?.lastAction || '--'}</td>
                                                    <td className="text-center">{student.derivatives?.totalActions || 0}</td>
                                                    <td className="text-center">{student.derivatives?.totalTime || 0} min</td>
                                                    {/* Integrals */}
                                                    <td className="text-center">{student.integrals?.lastAction || '--'}</td>
                                                    <td className="text-center">{student.integrals?.totalActions || 0}</td>
                                                    <td className="text-center">{student.integrals?.totalTime || 0} min</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <Card className="mt-4">
                                    <Card.Body className="text-center">
                                        <h5 className="text-muted">No Students Found</h5>
                                        <p className="text-muted">
                                            This class doesn't have any students yet.
                                        </p>
                                        <NavLink 
                                            className="btn btn-primary" 
                                            to={`/addStudentsToClass/${classCode}`}
                                        >
                                            Add Students to Class
                                        </NavLink>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Navigation Buttons */}
                            <div className="d-flex gap-2 justify-content-center mt-4">
                                <NavLink 
                                    className="btn btn-outline-primary" 
                                    to={`/addStudentsToClass/${classCode}`}
                                >
                                    Manage Students
                                </NavLink>
                                <NavLink 
                                    className="btn btn-outline-secondary" 
                                    to="/manageClasses"
                                >
                                    Back to Manage Classes
                                </NavLink>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
