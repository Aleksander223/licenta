import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Container, Row, Col, Button, Modal } from "react-bootstrap";

import Aside from "../components/Aside";

import axios from "axios";

import { CSVLink } from "react-csv";

import { FaSave, FaFilePdf, FaUpload } from "react-icons/fa";

import Upload from "../pages/Upload";

import dotProp from "dot-prop";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  page: {
    padding: "50px",
  },
  smallTableCell: {
    maxWidth: "75px",
    padding: "3px",
  },
  tableCell: {
    padding: "3px",
  },
});

function uploadData(url, handleShow) {
  handleShow();
}

function generateDocument(jsonData, columns) {
  if (jsonData == [] || jsonData == null) {
    return (
      <Document>
        <Page></Page>
      </Document>
    );
  }

  const orderedData = jsonData.map((x, idx) => {
    x.idx = idx + 1;
    return x;
  });

  return (
    <Document>
      <Page style={styles.page}>
        <Table data={orderedData}>
          <TableHeader>
            <TableCell style={styles.smallTableCell} weighting={0.3}>
              Nr. crt.
            </TableCell>
            {columns.map((x) => {
              return (
                <TableCell
                  style={10 < 8 ? styles.smallTableCell : styles.tableCell}
                  weighting={0.3}
                  key={x.name}
                >
                  {x.name}
                </TableCell>
              );
            })}
          </TableHeader>
          <TableBody>
            <DataTableCell
              style={styles.smallTableCell}
              weighting={0.3}
              getContent={(r) => r.idx}
            />
            {columns.map((x) => {
              return (
                <DataTableCell
                  style={10 < 8 ? styles.smallTableCell : styles.tableCell}
                  weighting={0.3}
                  getContent={(r) => {
                    const val = dotProp.get(r, x.selector);
                    if (typeof val == "boolean") {
                      return val ? "Da" : "Nu";
                    }
                    
                    if (!val) {
                      return "";
                    } else {
                      
                    }
                    return val.toString();
                  }}
                  key={x.name}
                />
              );
            })}
          </TableBody>
        </Table>
      </Page>
    </Document>
  );
}

function transformData(jsonData, columns) {
  if (jsonData == [] || jsonData == null) {
    return [];
  }

  const transformedData = jsonData.map((x) => {
    const obj = {};

    for (const col of columns) {
      let val = dotProp.get(x, col.selector);
      if (typeof val == "boolean") {
        val = val ? 1 : 0;
      }
      obj[col.name.split(" ").join("")] = val;
    }

    return obj;
  });

  return transformedData;
}

export default function Datatable(props) {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = props.columns;

  const labels = columns.map((x) => x.selector);

  const filteredData = data.filter((x) =>
    labels.reduce(
      (acc, label) =>
        acc ||
        dotProp
          .get(x, label)
          .toString()
          .toLowerCase()
          .includes(filterText.toLowerCase()),
      false
    )
  );

  useEffect(() => {
    axios
      .get(props.url, {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        setData(r.data[props.selector]);
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body><Upload url={props.url}/></Modal.Body>
        <Modal.Footer>
            <p className="text-muted">Uploading data will override current data</p>
        </Modal.Footer>
      </Modal>
      <Container fluid style={{}}>
        <Row>
          <Aside />
          <Col className="col-md-8 col-sm-8" style={{}}>
            <DataTable
              title={props.name}
              columns={columns}
              data={filteredData}
              defaultSortField="title"
              selectableRows={true}
              selectableRowsHighlight={true}
              pagination={true}
              subHeader={true}
              progressPending={!loaded}
              subHeaderComponent={
                <div style={{ alignItems: "center" }}>
                  <Button
                    onClick={() => uploadData(props.url, handleShow)}
                    className="mx-2 mb-3"
                  >
                    <FaUpload /> Upload data
                  </Button>
                  <CSVLink
                    data={transformData(data, columns)}
                    filename={`${props.name}_${new Date().getTime()}.csv`}
                  >
                    <Button className="mx-2 mb-3">
                      <FaSave /> Save as .csv
                    </Button>
                  </CSVLink>
                  <PDFDownloadLink
                    document={generateDocument(data, columns)}
                    fileName={`${props.name}_${new Date().getTime()}.pdf`}
                  >
                    <Button className="mx-2 mb-3">
                      <FaFilePdf /> Save as .pdf
                    </Button>
                  </PDFDownloadLink>
                  <Form.Control
                    id="outlined-basic"
                    placeholder="Search"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => {
                      setFilterText(e.target.value);
                    }}
                    style={{ margin: "5px" }}
                  />
                </div>
              }
              fixedHeaderScrollHeight="300px"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
