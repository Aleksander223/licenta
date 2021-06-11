import axios from "axios";
import React, { useEffect, useState } from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";

import { transformTypeToName, transformTypeToQuizName } from "../services/util";

export default function Evaluations() {
    const [status, setStatus] = useState({
        used: false,
        sentEvaluations: [],
        unsentEvaluations: []
    });

    const [session, setSession] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/student/status", {
            headers: {
                "Authorization": window.sessionStorage.getItem("auth")
            }
        }).then(r => {
            setStatus(r.data);
            setSession(r.data.session);
        });
    }, []);

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
                                    <Button href={`/quiz/${session}/${x.course._id}/${x.course.name}/${x.professor._id}/${x.professor.name}/${transformTypeToQuizName(x.type)}`}>Start</Button>
                                </Card>
                            </Col>
                        );
                    })}
                    {status.unsentEvaluations.length == 0 && <p className="display-4">Felicitări, ai trimis toate evaluările!</p>}
                </Row>
            </Container>
        </>
    );
}
