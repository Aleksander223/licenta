import axios from "axios";
import React, { useEffect, useState } from "react";

import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { transformQuizNameToType } from "../services/util";

export default function Quiz() {
  const [template, setTemplate] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [noSections, setNoSections] = useState(0);
  const [noAnswers, setNoAnswers] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");

  const { professor, course, type, courseName, professorName, session } = useParams(); 

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/student/status", {
            headers: {
                "Authorization": window.sessionStorage.getItem("auth")
            }
        }).then(res => {
          axios
          .get(`http://127.0.0.1:5000/session/current?final=${res.data.finalYear ? "yes" : "no"}`, {
            headers: {
              Authorization: window.sessionStorage.getItem("auth"),
            },
          })
          .then((r) => {
            const currentQuiz = r.data[type];
    
            setTemplate(currentQuiz);
            setNoSections(currentQuiz.quiz.sections.length);
    
            const ansr = []
    
            for (let i = 0; i < currentQuiz.quiz.sections.length; i++) {
              const arr = new Array(currentQuiz.quiz.sections[i].questions.length).fill({
                definition: "",
                choice: "",
                i: -1
              });
    
              ansr.push({
                questions: arr
              });
            }
    
            setAnswers(ansr);
          });
        });
  }, []);

  const handleAnswer = (idx, i, definition, choice) => {
    const ansr = answers;

    ansr[currentSection].questions[idx] = {
      definition,
      i,
      choice
    };

    setAnswers(ansr);

    setNoAnswers(noAnswers + 1);
  }

  const handleTextAnswer = (e) => {
    setTextAnswer(e.target.value);
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setNoAnswers(template.quiz.sections[currentSection - 1].questions.length);
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < noSections - 1) {
      setCurrentSection(currentSection + 1);
      setNoAnswers(answers[currentSection + 1].questions.filter(q => q.i !== -1).length);
    } else if (currentSection == noSections - 1) {
      // submit
      const data = {
        answers,
        course,
        professor,
        type: transformQuizNameToType(type),
        session
      }

      data.answers[currentSection].questions[0] = {
        i: 0,
        choice: textAnswer,
        definition: template.quiz.sections[currentSection].questions[0].definition
      }

      axios.post("http://127.0.0.1:5000/evaluation", data, {
        headers: {
          "Authorization": window.sessionStorage.getItem("auth")
      }
      }).then((r) => {
        Swal.fire("Succes!", "Evaluarea a fost trimisă cu succes!", "success").then(() => {
          window.location.href="/evaluate";
        });
      }).catch(e => {
        Swal.fire("Eroare", "Evaluare nu a putut să fie trimisă. Încercați din nou", "error")
      })
    }
  };

  return (
    <>
      {template !== null && answers !== null && (
        <Container style={{}}>
          <Row className="mb-5">
            <Col>
              <h1>{`${courseName} - ${professorName}`}</h1>
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
                  {template.quiz.sections[currentSection].label !== ""
                    ? template.quiz.sections[currentSection].label
                    : template.quiz.sections[currentSection].questions[0]
                        .definition}
                </Card.Title>
                <Card.Text>&nbsp;</Card.Text>
                <Card.Body>
                  {template.quiz.sections[currentSection].questions.map(
                    (question, i, questions) => {
                      if (question.answerType == 0) {
                        return (
                          <div key={question._id}>
                            <p>
                              <b>{question.definition}</b>
                            </p>
                            <Form.Group className="mb-3">
                              {question.choices.map((choice, idx, choices) => {
                                return (
                                  <Form.Check
                                    inline
                                    key={choice}
                                    label={choice}
                                    defaultChecked={answers[currentSection].questions[i].i == idx}
                                    type="radio"
                                    className="mb-5"
                                    onClick={() => handleAnswer(i, idx, question.definition, choice)}
                                    name={question.definition}
                                    value={1}
                                  />
                                );
                              })}
                            </Form.Group>
                          </div>
                        );
                      } else {
                        return (
                          <Form.Group>
                            <Form.Control as="textarea" rows={5} onChange={handleTextAnswer} value={textAnswer} />
                          </Form.Group>
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
              <Button variant="primary" className="px-5" onClick={handleNext} disabled={noAnswers < template.quiz.sections[currentSection].questions.length && currentSection < noSections - 1}>
                {currentSection == noSections - 1 ? "Submit" : "Next"}
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
