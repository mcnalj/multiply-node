import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// import './auth.component.styles.scss';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function CreateClass({userId, username})  {
    const [form, setForm] = useState({
        className: "",
        classDescription: "",
        classTeacher: username || "", // Set from current logged-in user
        classCode: "",
        schoolName: "",
        teacherName: "",
    });
    const [classCreated, setClassCreated] = useState(false);
    const [resultMsg, setResultMsg] = useState("");

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
  
    async function onSubmit(e) {
        const resultMsg = "";
        e.preventDefault();
        const newClass = { 
            ...form,
            teacherUsername: username // Add teacherUsername to the request
        };
        const response = await fetch(`${url}/record/create-class`, {
          method: "POST",
          mode: 'cors',
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newClass),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        const answer = await response.json();
        if (answer.success) {
          setClassCreated(true);
            
        } 
        setResultMsg(answer.msg);
    }

    async function createAnother() {
      setForm({ 
        className: "", 
        classDescription: "", 
        classTeacher: username || "", 
        classCode: "",
        schoolName: "",
        teacherName: "",
      });
      setResultMsg("");
      setClassCreated(false);
    }

    if (!classCreated) {
      return (
        <Container fluid className="pt-4">
          <Row className="justify-content-center">
            <Col xs={11} sm={10} md={9} lg={8} xl={7}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="mb-4 text-center">Create a Class</h3>
                  <Form onSubmit={onSubmit}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="username">Class Name</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="username"
                          value={form.className}
                          onChange={(e) => updateForm({className: e.target.value})}
                          placeholder="Enter class name"
                        />
                      </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="classDescription">Class Description</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="classDescription"
                          value={form.classDescription}
                          onChange={(e) => updateForm({classDescription: e.target.value})}
                          placeholder="Enter class description"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="schoolName">School Name</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="schoolName"
                          value={form.schoolName}
                          onChange={(e) => updateForm({schoolName: e.target.value})}
                          placeholder="Enter school name"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="teacherName">Teacher Name</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="teacherName"
                          value={form.teacherName}
                          onChange={(e) => updateForm({teacherName: e.target.value})}
                          placeholder="Enter teacher name"
                        />
                      </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="teacherUsername">Teacher Username</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="teacherUsername"
                          value={username || "Not logged in"}
                          readOnly
                          className="bg-light"
                        />
                      </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} htmlFor="classCode">Class Code</Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          id="classCode"
                          value={form.classCode}
                          onChange={(e) => updateForm({classCode: e.target.value})}
                          placeholder="Enter six character, alpha-numerical class code"
                        />
                      </Col>
                    </Form.Group>
                    
                    {resultMsg && (
                      <Row className="mb-3">
                        <Col sm={{ span: 9, offset: 3 }}>
                          <p className="text-danger">{resultMsg}</p>
                        </Col>
                      </Row>
                    )}

                    <Row>
                      <Col sm={{ span: 9, offset: 3 }}>
                        <div className="d-grid gap-2">
                          <Button type="submit" variant="primary" size="lg">
                            Submit
                          </Button>
                          <NavLink className="btn btn-outline-secondary" to="../manageClasses">
                            Cancel
                          </NavLink>
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
    } else {
      return(
        <Container fluid className="pt-4">
          <Row className="justify-content-center">
            <Col xs={11} sm={10} md={9} lg={8} xl={7}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="mb-4 text-center">Class Created Successfully!</h3>
                  
                  <div className="mb-3">
                    <p className="text-success text-center">{resultMsg}</p>
                  </div>
                  
                  <div className="mb-3">
                    <Row className="mb-2">
                      <Col sm={4}><strong>Class Name:</strong></Col>
                      <Col sm={8}>{form.className}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={4}><strong>Description:</strong></Col>
                      <Col sm={8}>{form.classDescription}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={4}><strong>School Name:</strong></Col>
                      <Col sm={8}>{form.schoolName}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={4}><strong>Teacher:</strong></Col>
                      <Col sm={8}>{form.teacherName}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={4}><strong>Class Code:</strong></Col>
                      <Col sm={8}><code className="bg-light p-1 rounded">{form.classCode}</code></Col>
                    </Row>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={createAnother}>
                      Create Another
                    </Button>
                    <NavLink className="btn btn-outline-primary" to={`/addStudentsToClass/${form.classCode}`}>
                      Add Students to This Class
                    </NavLink>
                    <NavLink className="btn btn-outline-primary" to="/manageClasses">
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
  } 
