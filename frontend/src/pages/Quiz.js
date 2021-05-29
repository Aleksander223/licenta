import axios from "axios";
import React, { useEffect, useState } from "react";

import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";

import { transformTypeToName } from "../services/util";

export default function Quiz() {
  const [template, setTemplate] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [noSections, setNoSections] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/session/current", {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        console.log(r.data.courseQuiz);
        setTemplate(r.data.courseQuiz);
        setNoSections(r.data.courseQuiz.quiz.sections.length);
      });
  }, []);

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < noSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <>
      {template !== null && (
        <Container style={{}}>
          <Row className="mb-5">
            <Col>
              <h1>Test</h1>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Card
                style={{
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "-1px 8px 10px -15px black",
                  padding: "15px",
                }}
              >
                <Card.Title>
                  {template.quiz.sections[currentSection].label}
                </Card.Title>
                <Card.Text>&nbsp;</Card.Text>
                <Card.Body>
                  {template.quiz.sections[currentSection].questions.map(
                    (question) => {
                      if (question.answerType == 0) {
                        return (
                          <div key={question._id}>
                            <p>{question.definition}</p>
                            <Form.Group
                              className="mb-3"
                            >
                            {question.choices.map((choice, idx, choices) => {
                                return <Form.Check
                                inline
                                key={choice}
                                label={choice}
                                type="radio"
                                className="mb-5"
                                name={question.definition}
                                value={1}
                              />
                            })}
                            </Form.Group>
                          </div>
                        );
                      }
                    }
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                className="px-5"
                disabled={currentSection == 0}
                onClick={handleBack}
              >
                Back
              </Button>
            </Col>
            <Col>
              <Button variant="primary" className="px-5" onClick={handleNext}>
                {currentSection == noSections - 1 ? "Submit" : "Next"}
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
