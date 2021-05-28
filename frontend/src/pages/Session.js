import React, { useState } from "react";

import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import Aside from "../components/Aside";

import Upload from "../pages/Upload";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Session() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <Container fluid style={{}}>
        <Row>
          <Aside />
          <Col className="col-md-8 col-sm-8" style={{}}>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nume</Form.Label>
                    <Form.Control type="text" placeholder="Nume sesiune" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Semestru</Form.Label>
                    <br />
                    <Form.Check
                      inline
                      label="Semestru I"
                      type="radio"
                      name="semestru"
                    />
                    <Form.Check
                      inline
                      label="Semestru II"
                      type="radio"
                      name="semestru"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Chestionare</Form.Label>
                    <Upload
                      url="http://127.0.0.1:5000/quiz"
                      fileType="xml"
                      multiple={true}
                      maxFiles={4}
                      autoUpload={true}
                      submitButtonDisabled={true}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Start sesiune</Form.Label>
                    <br />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Sfarsit sesiune</Form.Label>
                    <br />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Sesiune ani terminali" />
                  </Form.Group>
                  <Button variant="primary">Create</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
