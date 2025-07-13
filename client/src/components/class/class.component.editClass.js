import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;

export default function EditClass({ userId }) {
    const { classCode } = useParams();
    const navigate = useNavigate();
    
    const [classData, setClassData] = useState({
        className: '',
        classDescription: '',
        schoolName: '',
        teacherName: ''
    });
    const [originalData, setOriginalData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
            const response = await fetch(`${url}/record/class/info/${classCode}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const editableData = {
                    className: data.className || '',
                    classDescription: data.classDescription || '',
                    schoolName: data.schoolName || '',
                    teacherName: data.teacherName || ''
                };
                setClassData(editableData);
                setOriginalData(editableData);
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

    const handleInputChange = (field, value) => {
        setClassData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear any existing messages when user starts editing
        if (message) {
            setMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any changes were made
        const hasChanges = Object.keys(classData).some(key => 
            classData[key] !== originalData[key]
        );

        if (!hasChanges) {
            setMessage('No changes detected');
            setMessageType('info');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch(`${url}/record/class/update`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classCode: classCode,
                    updates: classData
                })
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Class information updated successfully!');
                setMessageType('success');
                setOriginalData(classData); // Update original data to reflect saved changes
                
                // Redirect back to manage classes after a short delay
                setTimeout(() => {
                    navigate('/manageClasses');
                }, 2000);
            } else {
                setMessage(result.message || 'Failed to update class information');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error updating class:', error);
            setMessage('Error updating class information');
            setMessageType('danger');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset form to original values
        setClassData(originalData);
        setMessage('');
        navigate('/manageClasses');
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
                                <p>Loading class information...</p>
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
                <Col xs={11} sm={10} md={9} lg={8} xl={7}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h3>Edit Class Information</h3>
                                <p className="text-muted">Class Code: <code className="bg-light px-2 py-1 rounded">{classCode}</code></p>
                            </div>

                            {message && (
                                <Alert variant={messageType} className="mb-4">
                                    {message}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3} htmlFor="className">
                                        Class Name *
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            id="className"
                                            value={classData.className}
                                            onChange={(e) => handleInputChange('className', e.target.value)}
                                            placeholder="Enter class name"
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3} htmlFor="classDescription">
                                        Class Description
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            id="classDescription"
                                            value={classData.classDescription}
                                            onChange={(e) => handleInputChange('classDescription', e.target.value)}
                                            placeholder="Enter class description"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3} htmlFor="schoolName">
                                        School Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            id="schoolName"
                                            value={classData.schoolName}
                                            onChange={(e) => handleInputChange('schoolName', e.target.value)}
                                            placeholder="Enter school name"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm={3} htmlFor="teacherName">
                                        Teacher Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            id="teacherName"
                                            value={classData.teacherName}
                                            onChange={(e) => handleInputChange('teacherName', e.target.value)}
                                            placeholder="Enter teacher name"
                                        />
                                    </Col>
                                </Form.Group>

                                <Row>
                                    <Col sm={{ span: 9, offset: 3 }}>
                                        <div className="d-grid gap-2">
                                            <Button 
                                                type="submit" 
                                                variant="primary" 
                                                size="lg"
                                                disabled={saving}
                                            >
                                                {saving ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="me-2"
                                                        />
                                                        Saving Changes...
                                                    </>
                                                ) : (
                                                    'Save Changes'
                                                )}
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline-secondary" 
                                                size="lg"
                                                onClick={handleCancel}
                                                disabled={saving}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
