import React from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Chart from 'react-apexcharts'

import Aside from "../components/Aside";

export default function Homepage() {
  const days = []

  const today = new Date();

  for (let i = 0; i < 14; i++) {
    console.log(today);
    const day = today.getDate();
    const month = today.getMonth() + 1;

    days.push(`${day}/${month}`)

    // next day
    today.setDate(today.getDate() + 1);
  }

  const state = {
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: days
      }
    },
    series: [{
      name: 'series-1',
      data: [100, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
  }

  return (
    <>
      <Container
        fluid
        style={{
        }}
      >
        <Row>
            <Aside />
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
                  <Card.Title>Nici o sesiune de evaluare activă</Card.Title>
                  <Card.Text>&nbsp;</Card.Text>
                  <Card.Body>
                    <Button className="mx-3 my-1">Start sesiune normală</Button>
                    <Button className="mx-3 my-1">
                      Start sesiune ani terminali
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-5 equal">
              <Col className="">
                <Card className="text-center"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "-1px 8px 10px -15px black",
                    padding: "15px",
                  }}
                >
                  <Card.Title><h1 className="display-1">0</h1></Card.Title>
                  <Card.Text><p className="lead">respondenți în ultimele 24h</p></Card.Text>
                </Card>
              </Col>
              <Col className="">
              <Card className="text-center"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "-1px 8px 10px -15px black",
                    padding: "15px",
                  }}
                >
                  <Card.Title><h1 className="display-1">0</h1></Card.Title>
                  <Card.Text><p className="lead">respondenți în total</p></Card.Text>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
              <Chart options={state.options} series={state.series} type="bar" height="320px" className="mt-5" />
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
}
