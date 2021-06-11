import React, { useState, useEffect } from "react";

import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import Aside from "../components/Aside";

import Upload from "./Upload";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import axios from "axios";

export default function SessionView(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [semester, setSemester] = useState(0);
  const [finalYear, setFinalYear] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const [id, setId] = useState(null);

  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  function submitData(e) {
    e.preventDefault();

    axios
      .put(
        `http://127.0.0.1:5000/session/${id}`,
        {
          name,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("auth"),
          },
        }
      )
      .then((r) => {
        Swal.fire("Success", "Sesiune actualizata", "success");
      })
      .catch((e) => {
        Swal.fire("Eroare", "Sesiunea nu a putut fi actualizata. Incercati mai tarziu", "error");
      });
  }

  function generateTokens() {
    axios
      .post(`http://127.0.0.1:5000/tokens/generate?final=${props.final==true ? "yes" : "no"}`, null, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        Swal.fire("Sucess", "Tokenii au fost generati cu succes.", "success");
      })
      .catch((e) => {
        Swal.fire(
          "Eroare",
          "Tokenii nu au fost generati. Incercati mai tarziu.",
          "error"
        );
      });
  }

  function stopSession() {
    Swal.fire({
      title: "Sunteti sigur?",
      text: "Aceasta operatie nu poate fi inversata",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Da",
      cancelButtonText: "Inapoi",
    }).then((r) => {
      if (r.isConfirmed) {
        axios.post(`http://127.0.0.1:5000/session/stop?final=${props.final==true ? "yes" : "no"}`, null, {
          headers: {
            Authorization: window.sessionStorage.getItem("auth"),
          },
        }).then(r => {
          Swal.fire("Succes", "Sesiunea a fost oprita", "succes");
        }).catch(e => {
          Swal.fire("Eroare", "Sesiunea nu a fost oprita. Incercati mai tarziu.", "error");
        });
      }
    });
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/session/current?final=${props.final==true ? "yes" : "no"}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        setStartDate(new Date(r.data.startDate));
        setEndDate(new Date(r.data.endDate));
        setSemester(r.data.semester);
        setName(r.data.name);
        setFinalYear(r.data.finalYear);
        setId(r.data._id);
        setNotFound(false);
      });
  }, []);

  return (
    <>
      <Container fluid style={{}}>
        <Row>
          <Aside />
          {notFound ? (
            <Col className="col-md-8 col-sm-8" style={{}}>
              <p className="display-5">Nici o sesiune activa</p>
            </Col>
          ) : (
            <Col className="col-md-8 col-sm-8" style={{}}>
              <Row>
                <Col>
                  <Card
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "-1px 8px 10px -15px black",
                      padding: "15px",
                    }}
                  >
                    <Card.Title>Actualizare sesiune</Card.Title>
                    <Card.Text>&nbsp;</Card.Text>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nume</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nume sesiune"
                            value={name}
                            onChange={handleName}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Semestru</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nume sesiune"
                            value={semester}
                            onChange={handleName}
                            disabled
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Start sesiune</Form.Label>
                          <br />
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd.MM.yyyy"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Sfarsit sesiune</Form.Label>
                          <br />
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd.MM.yyyy"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Check
                            type="checkbox"
                            label="Sesiune ani terminali"
                            disabled
                            checked={finalYear}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          onClick={submitData}
                          type="submit"
                        >
                          Actualizare
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mt-5"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "-1px 8px 10px -15px black",
                      padding: "15px",
                    }}
                  >
                    <Card.Title>Panou de control</Card.Title>
                    <Card.Text>&nbsp;</Card.Text>
                    <Card.Body>
                      <Button className="mx-3 my-1" onClick={generateTokens}>
                        Generare tokeni
                      </Button>
                      <Button className="mx-3 my-1" variant="danger" onClick={stopSession}>
                        Stop sesiune
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
