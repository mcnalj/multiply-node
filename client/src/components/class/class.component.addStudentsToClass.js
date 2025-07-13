import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;

export default function AddStudentsToClass() {
    const { classCode } = useParams();
    const [studentInput, setStudentInput] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [classInfo, setClassInfo] = useState(null);

    useEffect(() => {
        if (classCode) {
            fetchClassInfo();
        }
    }, [classCode]);

    const fetchClassInfo = async () => {
        try {
            const response = await fetch(`${url}/record/class/info/${classCode}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setClassInfo(data);
                setStudents(data.members || []);
            } else {
                setMessage('Class not found');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error fetching class info:', error);
            setMessage('Error loading class information');
            setMessageType('danger');
        }
    };

    const addStudents = async () => {
        if (!studentInput.trim()) {
            setMessage('Please enter at least one username or email');
            setMessageType('warning');
            return;
        }

        setLoading(true);
        setMessage('');

        // Split input by commas, newlines, or spaces and clean up
        const studentList = studentInput
            .split(/[,\n\s]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        try {
            const response = await fetch(`${url}/record/class/addStudents`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classCode: classCode,
                    students: studentList
                })
            });

            const result = await response.json();

            if (result.success) {
                setMessage(`Successfully added ${result.addedCount} students to the class`);
                setMessageType('success');
                setStudentInput('');
                // Refresh the class info to show updated student list
                fetchClassInfo();
            } else {
                setMessage(result.message || 'Failed to add students');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error adding students:', error);
            setMessage('Error adding students to class');
            setMessageType('danger');
        } finally {
            setLoading(false);
        }
    };

    const removeStudent = async (studentUsername) => {
        try {
            const response = await fetch(`${url}/record/class/removeStudent`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classCode: classCode,
                    studentUsername: studentUsername
                })
            });

            const result = await response.json();

            if (result.success) {
                setMessage(`Successfully removed ${studentUsername} from the class`);
                setMessageType('success');
                // Refresh the class info
                fetchClassInfo();
            } else {
                setMessage(result.message || 'Failed to remove student');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error removing student:', error);
            setMessage('Error removing student from class');
            setMessageType('danger');
        }
    };

    if (!classCode) {
        return (
            <Container className="pt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Alert variant="danger">
                            <h4>No Class Code Provided</h4>
                            <p>Please navigate to this page from a class creation or management screen.</p>
                            <NavLink className="btn btn-primary" to="/manageClasses">
                                Back to Manage Classes
                            </NavLink>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="pt-4">
            <Row className="justify-content-center">
                <Col xs={11} sm={10} md={9} lg={8} xl={7}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h3>Add Students to Class</h3>
                                {classInfo && (
                                    <div>
                                        <h5 className="text-muted">{classInfo.className}</h5>
                                        <Badge bg="secondary">Class Code: {classCode}</Badge>
                                    </div>
                                )}
                            </div>

                            {message && (
                                <Alert variant={messageType} className="mb-4">
                                    {message}
                                </Alert>
                            )}

                            {/* Add Students Form */}
                            <Card className="mb-4">
                                <Card.Header>
                                    <h5 className="mb-0">Add New Students</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Student Usernames or Emails</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={studentInput}
                                            onChange={(e) => setStudentInput(e.target.value)}
                                            placeholder="Enter usernames or emails separated by commas, spaces, or new lines&#10;Example:&#10;john.doe@email.com&#10;jane_smith&#10;student123, another@email.com"
                                        />
                                        <Form.Text className="text-muted">
                                            You can enter multiple students separated by commas, spaces, or new lines.
                                        </Form.Text>
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button 
                                            variant="success" 
                                            size="lg" 
                                            onClick={addStudents}
                                            disabled={loading || !studentInput.trim()}
                                        >
                                            {loading ? 'Adding Students...' : 'Add Students'}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Current Students List */}
                            {students.length > 0 && (
                                <Card className="mb-4">
                                    <Card.Header>
                                        <h5 className="mb-0">Current Students ({students.length})</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {students.map((student, index) => (
                                                <ListGroup.Item 
                                                    key={index} 
                                                    className="d-flex justify-content-between align-items-center"
                                                >
                                                    <span>{student}</span>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => removeStudent(student)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Navigation Buttons */}
                            <div className="d-grid gap-2">
                                <NavLink className="btn btn-primary" to="/createClass">
                                    Create Another Class
                                </NavLink>
                                <NavLink className="btn btn-outline-secondary" to="/manageClasses">
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
