import React, { useState, useEffect } from "react";

import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import axios from "axios";

import Aside from "../components/Aside";

import {
    Document,
    Page,
    PDFDownloadLink,
    StyleSheet,
    Text,
    Font
  } from "@react-pdf/renderer";
import { transformTypeToName } from "../services/util";

  const styles = StyleSheet.create({
    page: {
      padding: "50px",
      fontFamily: "Roboto"
    },
    smallTableCell: {
      maxWidth: "75px",
      padding: "3px",
    },
    tableCell: {
      padding: "3px",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: "17px",
        marginBottom: "6px"
    },
    normalText: {
        fontWeight: "normal",
        fontSize: "10px",
        marginBottom: "12px"
    },
    display: {
        fontWeight: "black",
        fontSize: "20px",
        marginBottom: "25px"
    }
  });

  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

export default function Report() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/report", {
            headers: {
              Authorization: window.sessionStorage.getItem("auth"),
            },
          })
          .then((r) => {
            setReports(r.data);
            
          });
      }, []);

  function generateReport() {
    console.log(reports);

    if (reports == []) {
        return (
            <Document>
              <Page></Page>
            </Document>
          );
    }

    return (
        <Document>

                {reports.map((x) => {
                  return (
                    <Page style={styles.page}>
                        <Text style={styles.display}>{`${x.professor.name} - ${x.course.name} ${transformTypeToName(x.type)}`}</Text>
                        {x.answers.map((y) => {
                            return (
                            <>
                            {
                                y.questions.map((z) => {
                                    return (
                                    <>
                                    <Text style={styles.boldText}>{z.definition}</Text>
                                    <Text style={styles.normalText}>{z.choice}</Text>
                                    </>);
                                })
                            }
                            </>);
                        })}
                    </Page>
                  );
                })}
        </Document>
      );
  }

  return (
    <>
      <Container fluid style={{}}>
        <Row>
          <Aside />
          <Col className="col-md-8 col-sm-8" style={{}}>
          <PDFDownloadLink
                    document={generateReport()}
                    fileName={`report_${new Date().getTime()}.pdf`}
                  >
                    <Button className="mx-2 mb-3">
                      Genereaza raport
                    </Button>
                  </PDFDownloadLink>
          </Col>
        </Row>
      </Container>
    </>
  );
}
