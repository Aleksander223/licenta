import React from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";

import { transformTypeToName } from "../services/util";

const status = {
    used: false,
    sentEvaluations: [],
    unsentEvaluations: [
        {
            _id: "6097fa776d7a031d7c2356f0",
            professor: {
                _id: "6096807e9c23731da01dc0d3",
                name: "Ion Ionescu",
                code: "II_215",
                __v: 0,
            },
            course: {
                _id: "60967869124f2f46bc28df93",
                name: "Test course",
                specialization: "Matematica",
                year: 3,
                semester: 2,
                course: true,
                seminar: true,
                laboratory: true,
                practice: false,
                code: "TC",
                __v: 0,
            },
            group: "6096803afaf60b5f584a856b",
            type: 0,
            __v: 0,
        },
        {
            _id: "6097fa776d7a031d7c2356f2",
            professor: {
                _id: "6096807e9c23731da01dc0d3",
                name: "Ion Ionescu",
                code: "II_215",
                __v: 0,
            },
            course: {
                _id: "60967869124f2f46bc28df93",
                name: "Test course",
                specialization: "Matematica",
                year: 3,
                semester: 2,
                course: true,
                seminar: true,
                laboratory: true,
                practice: false,
                code: "TC",
                __v: 0,
            },
            group: "6096803afaf60b5f584a856b",
            type: 1,
            __v: 0,
        },
        {
            _id: "6097fa776d7a031d7c2356f3",
            professor: {
                _id: "6096807e9c23731da01dc0d3",
                name: "Ion Ionescu",
                code: "II_215",
                __v: 0,
            },
            course: {
                _id: "60967869124f2f46bc28df93",
                name: "Test course",
                specialization: "Matematica",
                year: 3,
                semester: 2,
                course: true,
                seminar: true,
                laboratory: true,
                practice: false,
                code: "TC",
                __v: 0,
            },
            group: "6096803afaf60b5f584a856b",
            type: 2,
            __v: 0,
        },
        {
            _id: "6097fa776d7a031d7c2356f4",
            professor: {
                _id: "6096807e9c23731da01dc0d4",
                name: "Ion Popescu",
                code: "IP_225",
                __v: 0,
            },
            course: {
                _id: "60967869124f2f46bc28df94",
                name: "Test course 2",
                specialization: "Informatica",
                year: 2,
                semester: 1,
                course: true,
                seminar: false,
                laboratory: true,
                practice: false,
                code: "TC2",
                __v: 0,
            },
            group: "6096803afaf60b5f584a856b",
            type: 0,
            __v: 0,
        },
        {
            _id: "6097fa776d7a031d7c2356f5",
            professor: {
                _id: "6096807e9c23731da01dc0d4",
                name: "Ion Popescu",
                code: "IP_225",
                __v: 0,
            },
            course: {
                _id: "60967869124f2f46bc28df94",
                name: "Test course 2",
                specialization: "Informatica",
                year: 2,
                semester: 1,
                course: true,
                seminar: false,
                laboratory: true,
                practice: false,
                code: "TC2",
                __v: 0,
            },
            group: "6096803afaf60b5f584a856b",
            type: 2,
            __v: 0,
        },
    ],
    _id: "6097fe0505dab51bdc66dd07",
    value: "01F58VGH6PX37B4RT050JHAV0M",
    __v: 0,
};

export default function Evaluations() {
    return (
        <>
            <Container style={{}}>
                <Row>
                    {status.unsentEvaluations.map((x) => {
                        return (
                            <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-4" key={x._id}>
                                <Card
                                    className="text-center"
                                    style={{
                                        background: "white",
                                        borderRadius: "8px",
                                        boxShadow: "-1px 8px 10px -15px black",
                                        padding: "15px",
                                        margin: "15px",
                                    }}
                                >
                                    <Card.Title>
                                        <h1 className="display-6">{x.course.name}</h1>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>
                                            {x.professor.name} - {transformTypeToName(x.type)}
                                        </p>
                                    </Card.Text>
                                    <Button>Start</Button>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
