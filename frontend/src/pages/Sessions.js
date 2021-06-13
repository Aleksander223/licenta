import React from "react";
import Datatable from "../components/Datatable";
import dateFormat from "dateformat";

import { Button } from "react-bootstrap";

import axios from "axios";

import { saveAs } from "file-saver";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  Font,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "50px",
    fontFamily: "Roboto",
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
    marginBottom: "6px",
  },
  normalText: {
    fontWeight: "normal",
    fontSize: "10px",
    marginBottom: "12px",
  },
  display: {
    fontWeight: "black",
    fontSize: "20px",
    marginBottom: "25px",
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

async function generateReport(id) {
  const reports = (
    await axios.get(`http://localhost:5000/report/${id}`, {
      headers: {
        Authorization: window.sessionStorage.getItem("auth"),
      },
    })
  ).data;

  if (reports == []) {
    console.log("started generating");
    const blob = await pdf(
      <Document>
        <Page></Page>
      </Document>
    ).toBlob();
    saveAs(blob, `report_${new Date().getTime()}.pdf`);
    return;
  }

  const blob = await pdf(
    <Document>
      {reports.map((x) => {
        return (
          <Page style={styles.page}>
            <Text style={styles.display}>{`${x.course} ${x.type}`}</Text>
            {Object.keys(x.answers).map((y) => {
              return (
                <>
                  <Text style={styles.boldText}>{y}</Text>
                  {
                      Object.keys(x.answers[y]).map((t) => {
                        return (
                            <>
                                <Text style={styles.normalText}>{`${t} - ${x.answers[y][t]}`}</Text>
                            </>
                        )
                      })
                  }
                </>
              );
            })}
            {
                x.texts.map(text => {
                    return (
                        <Text>{text}</Text>
                    )
                })
            }
          </Page>
        );
      })}
    </Document>
  ).toBlob();
  saveAs(blob, `report_${new Date().getTime()}.pdf`);
}

export default function Sessions(props) {
  const columns = [
    {
      name: "Nume",
      selector: "name",
      sortable: true,
    },
    {
      name: "Start",
      selector: "startDate",
      sortable: true,
      format: (row, index) => {
        return dateFormat(row.startDate, "dd/mm/yyyy");
      },
    },
    {
      name: "Sfarsit",
      selector: "endDate",
      sortable: true,
      format: (row, index) => {
        return dateFormat(row.endDate, "dd/mm/yyyy");
      },
    },
    {
      name: "Semestru",
      selector: "semester",
      sortable: true,
    },
    {
      name: "Activa",
      selector: "active",
      sortable: true,
      format: (row, index) => {
        return row.active ? "Da" : "Nu";
      },
    },
    {
      name: "An final",
      selector: "finalYear",
      sortable: true,
      format: (row, index) => {
        return row.finalYear ? "Da" : "Nu";
      },
    },
  ];

  if (props.generateReports) {
    columns.push({
      name: "Raport",
      cell: (row) => {
        return (
          <Button
            className="btn-sm"
            id={row._id}
            onClick={() => generateReport(row._id)}
          >
            Generează
          </Button>
        );
      },
    });
  }

  return (
    <Datatable
      url={"http://127.0.0.1:5000/sessions/"}
      columns={columns}
      selector="sessions"
      name="Sessions"
      disableButtons={true}
    />
  );
}
