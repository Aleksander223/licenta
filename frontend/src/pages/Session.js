import React, { useState } from "react";

import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import Aside from "../components/Aside";

import Upload from "../pages/Upload";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2"

import axios from "axios";

let fileIds = [];

export default function Session() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [semester, setSemester] = useState(1);
  const [finalYear, setFinalYear] = useState(false);

  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSemester = (e) => {
    setSemester(e.target.value);
  }

  const handleFinalYear = (e) => {
    setFinalYear(e.target.checked);
  }

  function getFileIds(arr) {
    fileIds = arr;
  }

  function submitData(e) {
    e.preventDefault(); 
    
    const data = {
      name,
      finalYear,
      semester,
      startDate,
      endDate,
      courseQuiz: fileIds.filter(x => x.name.toLowerCase().includes("curs"))[0]._id,
      seminarQuiz: fileIds.filter(x => x.name.toLowerCase().includes("seminar"))[0]._id,
      laboratoryQuiz: fileIds.filter(x => x.name.toLowerCase().includes("laborator"))[0]._id,
      practiceQuiz: fileIds.filter(x => x.name.toLowerCase().includes("proiect"))[0]._id,
    }

    axios.post("http://127.0.0.1:5000/session", data, {
            headers: {
                "Authorization": window.sessionStorage.getItem("auth")
            }
        }).then(r => {
          Swal.fire('Succes', 'Sesiunea a fost creata cu success', 'success');
        }).catch(e => {
          Swal.fire('Eroare', 'Sesiunea nu putut fi creata. Incercati mai tarziu.', 'error');
        });

  }

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
                    <Form.Control
                      type="text"
                      placeholder="Nume sesiune"
                      value={name}
                      onChange={handleName}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" onChange={handleSemester}>
                    <Form.Label>Semestru</Form.Label>
                    <br />
                    <Form.Check
                      inline
                      label="Semestru I"
                      type="radio"
                      name="semestru"
                      value={1}
                      defaultChecked
                    />
                    <Form.Check
                      inline
                      label="Semestru II"
                      type="radio"
                      name="semestru"
                      value={2}
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
                      getFileIds={getFileIds}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Start sesiune</Form.Label>
                    <br />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      dateFormat="dd.MM.yyyy"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Sfarsit sesiune</Form.Label>
                    <br />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={new Date()}
                      dateFormat="dd.MM.yyyy"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Sesiune ani terminali" onChange={handleFinalYear}/>
                  </Form.Group>
                  <Button variant="primary" onClick={submitData} type="submit">
                    Create
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
