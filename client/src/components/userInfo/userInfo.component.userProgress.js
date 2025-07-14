import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge, Button } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;

export default function UserProgress() {
    const { userId } = useParams();
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState(null);
    const [userActions, setUserActions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchCurrentUser();
        }
    }, [userId]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            // Fetch user info
            const userResponse = await fetch(`${url}/users/fetchUserInfoById/${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user info');
            }

            const userData = await userResponse.json();
            setUserInfo(userData);

            // Fetch user actions
            const actionsResponse = await fetch(`${url}/users/getUserActions/${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (actionsResponse.ok) {
                const actionsData = await actionsResponse.json();
                setUserActions(actionsData.actions || []);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setMessage('Error loading user information');
            setMessageType('danger');
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            // Get current user's session info
            const sessionResponse = await fetch(`${url}/users/getCurrentUser`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (sessionResponse.ok) {
                const sessionData = await sessionResponse.json();
                setCurrentUser(sessionData);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    // Helper function to find a common class between current user and student
    const findCommonClass = () => {
        if (!currentUser || !userInfo || !userInfo.classMemberships) return null;
        
        // For now, we'll use the first class membership as the classCode
        // In a more complex scenario, you might want to determine which class the teacher is viewing
        return userInfo.classMemberships[0] || null;
    };

    // Helper function to format date
    const formatDate = (timestamp) => {
        if (!timestamp) return '--';
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Helper function to convert milliseconds to minutes
    const msToMinutes = (ms) => {
        return Math.round(ms / 1000 / 60);
    };

    // Process actions by section and unit
    const processActionsBySection = () => {
        const sections = {};
        
        userActions.forEach(action => {
            if (action.actionType === 'skillCompleted' && action.details) {
                const section = action.details.section;
                const unit = action.details.unit;
                const topic = action.details.topic;
                
                if (!sections[section]) {
                    sections[section] = {};
                }
                
                if (!sections[section][unit]) {
                    sections[section][unit] = {};
                }
                
                if (!sections[section][unit][topic]) {
                    sections[section][unit][topic] = [];
                }
                
                sections[section][unit][topic].push(action);
            }
        });
        
        return sections;
    };

    // Calculate overall statistics
    const calculateOverallStats = () => {
        const skillCompletedActions = userActions.filter(action => action.actionType === 'skillCompleted');
        
        if (skillCompletedActions.length === 0) {
            return {
                totalTopics: 0,
                totalTime: 0,
                totalCorrect: 0,
                totalQuestions: 0,
                percentCorrect: 0,
                mostRecentAction: null
            };
        }

        const totalTopics = skillCompletedActions.length;
        const totalTime = skillCompletedActions.reduce((sum, action) => sum + (action.details?.totalTime || 0), 0);
        const totalCorrect = skillCompletedActions.reduce((sum, action) => sum + (action.details?.questionsCorrect || 0), 0);
        const totalQuestions = skillCompletedActions.reduce((sum, action) => sum + (action.details?.questionsAttempted || 0), 0);
        const percentCorrect = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        // Find most recent action
        const mostRecentAction = skillCompletedActions.reduce((latest, action) => {
            return new Date(action.timeStamp) > new Date(latest.timeStamp) ? action : latest;
        }, skillCompletedActions[0]);

        return {
            totalTopics,
            totalTime: Math.round(totalTime / 1000 / 60), // Convert to minutes
            totalCorrect,
            totalQuestions,
            percentCorrect,
            mostRecentAction
        };
    };

    // Calculate stats for a topic
    const calculateTopicStats = (actions) => {
        if (!actions || actions.length === 0) {
            return {
                metStandardCount: 0,
                bestStreak: 0,
                bestTime: '--',
                lastMet: '--'
            };
        }

        const metStandardCount = actions.filter(action => action.details?.metStandard === true).length;
        const streaks = actions.map(action => action.details?.questionsStreak || 0);
        const times = actions.map(action => action.details?.totalTime || Infinity);
        
        const bestStreak = streaks.length > 0 ? Math.max(...streaks) : 0;
        const bestTime = times.length > 0 ? Math.min(...times) : Infinity;
        const lastAction = actions.reduce((latest, action) => {
            return new Date(action.timeStamp) > new Date(latest.timeStamp) ? action : latest;
        }, actions[0]);
        
        return {
            metStandardCount,
            bestStreak,
            bestTime: bestTime === Infinity ? '--' : `${msToMinutes(bestTime)} min`,
            lastMet: formatDate(lastAction.timeStamp)
        };
    };

    // Render table for a specific unit
    const renderUnitTable = (unitName, topics) => {
        const topicNames = Object.keys(topics).sort();
        
        if (topicNames.length === 0) {
            return null;
        }
        
        return (
            <Card className="mb-4">
                <Card.Header>
                    <h5 className="mb-0">{unitName.charAt(0).toUpperCase() + unitName.slice(1)}</h5>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Topic</th>
                                <th>Total Times Met</th>
                                <th>Best Streak</th>
                                <th>Best Time</th>
                                <th>Last Met</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topicNames.map(topic => {
                                const stats = calculateTopicStats(topics[topic]);
                                return (
                                    <tr key={topic}>
                                        <td>{topic}</td>
                                        <td className="text-center">{stats.metStandardCount}</td>
                                        <td className="text-center">{stats.bestStreak}</td>
                                        <td className="text-center">{stats.bestTime}</td>
                                        <td className="text-center">{stats.lastMet}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    };

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
                                <p>Loading user progress...</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!userInfo) {
        return (
            <Container className="pt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Alert variant="danger">
                            <h4>User Not Found</h4>
                            <p>The requested user information could not be found.</p>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    const sections = processActionsBySection();
    const sectionNames = Object.keys(sections).sort();
    const overallStats = calculateOverallStats();
    const commonClass = findCommonClass();
    const isTeacher = currentUser?.userRoles?.teacher === true;

    // Arrange sections with SummerPrep first, then Calculus
    const arrangedSections = [];
    if (sections.summerPrep) arrangedSections.push('summerPrep');
    if (sections.calculus) arrangedSections.push('calculus');
    // Add any other sections that might exist
    sectionNames.forEach(section => {
        if (!arrangedSections.includes(section)) {
            arrangedSections.push(section);
        }
    });

    return (
        <Container fluid className="pt-4">
            <Row className="justify-content-center">
                <Col xs={12} lg={11} xl={10}>
                    {/* User Header */}
                    <Card className="shadow-sm mb-4">
                        <Card.Body className="p-4">
                            {/* Back Button */}
                            <div className="mb-3">
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => navigate(-1)}
                                    className="d-flex align-items-center"
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Back
                                </Button>
                            </div>

                            <div className="text-center mb-3">
                                <h2 className="mb-3">
                                    {userInfo.given_name} {userInfo.family_name}
                                </h2>
                                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                                    <Badge bg="primary" className="fs-6">
                                        Username: {userInfo.username}
                                    </Badge>
                                    {userInfo.classMemberships && userInfo.classMemberships.length > 0 && (
                                        <Badge bg="secondary" className="fs-6">
                                            Classes: {userInfo.classMemberships.join(', ')}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            
                            {/* Overall Statistics */}
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div className="text-center p-3 bg-secondary rounded">
                                                <h5 className="mb-1 text-light">{overallStats.totalTopics}</h5>
                                                <small className="text-light">Total Topics</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-center p-3 bg-secondary rounded">
                                                <h5 className="mb-1 text-light">{overallStats.totalTime} min</h5>
                                                <small className="text-light">Total Time</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-center p-3 bg-secondary rounded">
                                                <h5 className="mb-1 text-light">{overallStats.totalCorrect}</h5>
                                                <small className="text-light">Total Correct</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-center p-3 bg-secondary rounded">
                                                <h5 className="mb-1 text-light">{overallStats.percentCorrect}%</h5>
                                                <small className="text-light">Percent Correct</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 bg-secondary rounded h-100">
                                        <h6 className="mb-2 text-light">Most Recent Activity</h6>
                                        {overallStats.mostRecentAction ? (
                                            <div>
                                                <p className="mb-1 text-light">
                                                    <strong>Date:</strong> {formatDate(overallStats.mostRecentAction.timeStamp)}
                                                </p>
                                                <p className="mb-1 text-light">
                                                    <strong>Unit:</strong> {overallStats.mostRecentAction.details?.unit || 'N/A'}
                                                </p>
                                                <p className="mb-0 text-light">
                                                    <strong>Topic:</strong> {overallStats.mostRecentAction.details?.topic || 'N/A'}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-light mb-0">No recent activity</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Teacher Navigation Button */}
                    {isTeacher && commonClass && (
                        <div className="text-center mb-4">
                            <Button 
                                variant="outline-primary" 
                                onClick={() => navigate(`/viewClassProgress/${commonClass}`)}
                                className="px-4"
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                View Class Progress
                            </Button>
                        </div>
                    )}

                    {message && (
                        <Alert variant={messageType} className="mb-4">
                            {message}
                        </Alert>
                    )}

                    {/* Progress Sections */}
                    {arrangedSections.length > 0 ? (
                        arrangedSections.map(sectionName => (
                            <div key={sectionName} className="mb-5">
                                <h3 className="mb-4 text-center">
                                    {sectionName === 'summerPrep' ? 'Summer Prep' : 
                                     sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Progress
                                </h3>
                                
                                {Object.keys(sections[sectionName]).sort().map(unitName => (
                                    <div key={unitName}>
                                        {renderUnitTable(unitName, sections[sectionName][unitName])}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <Card className="mt-4">
                            <Card.Body className="text-center">
                                <h5 className="text-muted">No Progress Data Found</h5>
                                <p className="text-muted">
                                    This user hasn't completed any skills yet.
                                </p>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
