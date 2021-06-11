import React, { useState, useEffect } from "react";

import axios from "axios";

import { Container, Col, Row, Card, Button, Tabs, Tab } from "react-bootstrap";
import Chart from "react-apexcharts";

import Aside from "../components/Aside";

const days = [];

const today = new Date();

for (let i = 0; i < 14; i++) {
  const day = today.getDate();
  const month = today.getMonth() + 1;

  days.push(`${day}/${month}`);

  // next day
  today.setDate(today.getDate() + 1);
}

const state = {
  options: {
    chart: {
      id: "respondenti",
    },
    xaxis: {
      categories: days,
    },
  },
  series: [
    {
      name: "series-1",
      data: [100, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};


export default function Homepage() {
  const [sessionActive, setSessionActive] = useState(false);
  const [key, setKey] = useState("sesiuneNormala");
  const [totalE, setTotalE] = useState(0);
  const [latestE, setLatestE] = useState(0);
  const [state, setState] = useState({
    options: {
      chart: {
        id: "respondenti",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "nr",
        data: [],
      },
    ],
  });


  useEffect(() => {
    setSessionActive(false);
    axios
      .get(`http://127.0.0.1:5000/evaluations/bins?final=${key=="sesiuneAniFinali" ? "yes": "no"}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        const bins = r.data.bins;

        axios
          .get(`http://127.0.0.1:5000/session/current?final=${key=="sesiuneAniFinali" ? "yes": "no"}`, {
            headers: {
              Authorization: window.sessionStorage.getItem("auth"),
            },
          })
          .then((r) => {
            setSessionActive(true);

            const startDate = new Date(r.data.startDate);
            const endDate = new Date(r.data.endDate);

            const days = [];

            const today = startDate;

            const itDays = Math.round(
              (endDate - startDate) / (1000 * 60 * 60 * 24)
            );

            for (let i = 0; i < itDays; i++) {
              const day = today.getDate();
              const month = today.getMonth() + 1;

              days.push(`${day}/${month}`);

              // next day
              today.setDate(today.getDate() + 1);
            }

            const st = {
              options: {
                chart: {
                  id: "respondenti",
                },
                xaxis: {
                  categories: days,
                },
              },
              series: [
                {
                  name: "nr",
                  data: bins,
                },
              ],
            };

            setState(st);
          });
      });

    axios
      .get(`http://127.0.0.1:5000/evaluations/total?final=${key=="sesiuneAniFinali" ? "yes": "no"}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        setTotalE(r.data.noEvaluations);
      });

    axios
      .get(`http://127.0.0.1:5000/evaluations/latest?final=${key=="sesiuneAniFinali" ? "yes": "no"}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        setLatestE(r.data.noEvaluations);
      });
  }, [key]);

  return (
    <>
      <Container fluid style={{}}>
        <Row>
          <Aside />

          <Col className="col-md-8 col-sm-8" style={{}}>
            <Row
              className="equal"
              style={{ marginTop: "-30px", marginBottom: "20px" }}
            >
              <Tabs
              activeKey={key}
              onSelect={(k) => {
                setKey(k);
              }}
              >
                <Tab eventKey="sesiuneNormala" title="Sesiune normală" />
                <Tab eventKey="sesiuneAniFinali" title="Sesiune ani finali" />
              </Tabs>
            </Row>
            {sessionActive ? (
              <>
                <Row className="mt-5 equal">
                  <Col className="">
                    <Card
                      className="text-center"
                      style={{
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "-1px 8px 10px -15px black",
                        padding: "15px",
                      }}
                    >
                      <Card.Title>
                        <h1 className="display-1">{latestE}</h1>
                      </Card.Title>
                      <Card.Text>
                        <p className="lead">respondenți în ultimele 24h</p>
                      </Card.Text>
                    </Card>
                  </Col>
                  <Col className="">
                    <Card
                      className="text-center"
                      style={{
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "-1px 8px 10px -15px black",
                        padding: "15px",
                      }}
                    >
                      <Card.Title>
                        <h1 className="display-1">{totalE}</h1>
                      </Card.Title>
                      <Card.Text>
                        <p className="lead">respondenți în total</p>
                      </Card.Text>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Chart
                      options={state.options}
                      series={state.series}
                      type="bar"
                      height="320px"
                      className="mt-5"
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <p className="display-4">Nici o sesiune activa</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
