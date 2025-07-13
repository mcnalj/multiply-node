import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;
const defaultAvatar = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23808080'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-size='48' fill='white'%3E👤%3C/text%3E%3C/svg%3E";

export default function ViewProfile({ userId }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddClass, setShowAddClass] = useState(false);
    const [newClassName, setNewClassName] = useState('');

    useEffect(() => {
        fetchUserInfo();
    }, [userId]);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${url}/users/fetchUserInfoById/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUserInfo(userData);
            } else {
                setError('Failed to fetch user information');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setError('Error loading user information');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatClassMemberships = (classMemberships) => {
        if (!classMemberships || classMemberships.length === 0) {
            return 'No class memberships';
        }
        return classMemberships.join(', ');
    };

    const handleAddClass = () => {
        setShowAddClass(true);
    };

    const handleJoinClass = () => {
        // TODO: Implement join class functionality
        console.log('Joining class:', newClassName);
        setShowAddClass(false);
        setNewClassName('');
    };

    const handleCancelAddClass = () => {
        setShowAddClass(false);
        setNewClassName('');
    };

    if (loading) {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className="text-center">Loading profile...</div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={12} lg={12}>
                        <div className="text-center text-danger">{error}</div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!userInfo) {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={12} lg={12}>
                        <div className="text-center">User information not found</div>
                    </Col>
                </Row>
            </Container>
        );
    }

    const profileImage = userInfo.avatarUrl || defaultAvatar;

    return (
        <Container className="pt-4">
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            {/* Name and Profile Picture */}
                            <Row className="align-items-center mb-4">
                                <Col xs="auto">
                                    <Image
                                        src={profileImage}
                                        alt="Profile"
                                        width={80}
                                        height={80}
                                        roundedCircle
                                        className="border border-2"
                                    />
                                </Col>
                                <Col>
                                    <h1 className="mb-0 display-5">
                                        {userInfo.givenName} {userInfo.familyName}
                                    </h1>
                                </Col>
                            </Row>

                            {/* Account Information */}
                            <Row className="mb-3">
                                <Col>
                                    <div className="d-flex align-items-center mb-2">
                                        <strong className="me-2">Last login:</strong>
                                        <span>{formatDate(userInfo.lastLogin)}</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <div className="d-flex align-items-center mb-2">
                                        <strong className="me-2">Joined the circus on:</strong>
                                        <span>{formatDate(userInfo.createdAt)}</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <div className="d-flex align-items-start">
                                        <strong className="me-2">Class memberships:</strong>
                                        <span>{formatClassMemberships(userInfo.classMemberships)}</span>
                                    </div>
                                </Col>
                            </Row>

                            {/* Add Class Section */}
                            <Row className="mb-3">
                                <Col>
                                    {!showAddClass ? (
                                        <div 
                                            className="d-flex align-items-center" 
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleAddClass}
                                        >
                                            <strong className="me-2">Add class</strong>
                                            <span style={{ fontSize: '1.2em' }}>+</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <InputGroup className="mb-2">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter class code"
                                                    value={newClassName}
                                                    onChange={(e) => setNewClassName(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleJoinClass();
                                                        }
                                                    }}
                                                />
                                                <Button 
                                                    variant="primary" 
                                                    onClick={handleJoinClass}
                                                    disabled={!newClassName.trim()}
                                                >
                                                    Join Class
                                                </Button>
                                                <Button 
                                                    variant="outline-secondary" 
                                                    onClick={handleCancelAddClass}
                                                >
                                                    Cancel
                                                </Button>
                                            </InputGroup>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
