import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

import Aside from "../components/Aside";

import axios from "axios";

import {CSVLink} from "react-csv";

import {FaSave, FaFilePdf} from "react-icons/fa";

import {Document, Page, PDFDownloadLink, StyleSheet} from "@react-pdf/renderer";
import {Table, TableBody, TableHeader, TableCell, DataTableCell} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  page: {
    padding: "50px"
  },
  smallTableCell: {
    maxWidth: "75px",
    padding: "3px"
  },
  tableCell: {
    padding: "3px"
  }
});

function generateDocument(jsonData) {
  if (jsonData == [] || jsonData == null) {
    return <Document><Page></Page></Document>
  }

  const groups = [];

  for (const d of jsonData) {
    if (!groups.includes(d.group.name)) {
      groups.push(d.group.name);
    }
  }

  const partitionedData = new Map();

  for (const group of groups) {
    partitionedData.set(group, []);
  }

  for (const x of jsonData) {
    // console.log(partitionedData.get(x.group.name));
    const groupName = x.group.name;
    const arr = partitionedData.get(groupName);

    arr.push(x);
    partitionedData.set(groupName, arr);
  }

  for (const group of partitionedData) {
    partitionedData.set(group[0], group[1].map((x, idx) => {
      return {
        ...x,
        idx: idx + 1
      };
    }));
  }

  const orderedData = jsonData.map((x, idx) => {
    return {
      ...x,
      idx
    }
  });

  return (
    <Document>
    {groups.map((x) => {
      return <Page style={styles.page}>
      <Table
                      data={partitionedData.get(x)}
                  >
                      <TableHeader>
                          <TableCell style={styles.smallTableCell} weighting={0.3}>
                              Nr. crt.
                          </TableCell>
                          <TableCell style={styles.smallTableCell} weighting={0.3}>
                              Grupa
                          </TableCell>
                          <TableCell style={styles.tableCell} weighting={0.3}>
                              Token
                          </TableCell>
                      </TableHeader>
                      <TableBody>
                          <DataTableCell style={styles.smallTableCell} weighting={0.3} getContent={(r) => r.idx}/>
                          <DataTableCell style={styles.smallTableCell} weighting={0.3} getContent={(r) => r.group.name}/>
                          <DataTableCell style={styles.tableCell} weighting={0.3} getContent={(r) => r.value}/>
                      </TableBody>
                  </Table>
      </Page>
    })}
</Document>
  );
}

function transformData(jsonData) {

  if (jsonData == [] || jsonData == null) {
    return [];
  }

  const transformedData = jsonData.map(x => {
    return {
      token: x.value,
      grupa: x.group.name
    };
  });

  return transformedData;
}


const columns = [
  {
    name: 'Token',
    selector: 'value',
    sortable: true,
  },
  {
    name: 'Grupa',
    selector: 'group.name',
    sortable: true,
  }
];
export default function Tokens() {

  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const filteredData = data.filter(x => x.group.name.toLowerCase().includes(filterText.toLowerCase()) || x.value.toLowerCase().includes(filterText.toLowerCase()));

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tokens", {
        headers: {
            "Authorization": window.sessionStorage.getItem("auth")
        }
    }).then(r => {
        setData(r.data.tokens);
    })
}, []);

  return (
    <>
      <Container
        fluid
        style={{
        }}
      >
        <Row>
          <Col className="col-md-4 col-sm-4 col-lg-2">
            <Aside />
          </Col>
          <Col className="col-md-8 col-sm-8" style={{}}>
            
              <DataTable
        title="Tokens"
        columns={columns}
        data={filteredData}
        defaultSortField="title"
        selectableRows={true}
        selectableRowsHighlight={true}
        pagination={true}
        subHeader={true}
        subHeaderComponent={
          (
            <div style={{ alignItems: 'center' }}>
              <CSVLink data={transformData(data)} filename={`tokens_${new Date().getTime()}.csv`}><Button className="mx-2 mb-3"><FaSave/> Save as .csv</Button></CSVLink>
              <PDFDownloadLink document={generateDocument(data)}><Button className="mx-2 mb-3"><FaFilePdf/> Save as .pdf</Button></PDFDownloadLink>
              <Form.Control id="outlined-basic" placeholder="Search" label="Search" variant="outlined" onChange={e => {setFilterText(e.target.value)}} style={{ margin: '5px' }} />
            </div>
          )
        }
        fixedHeaderScrollHeight="300px"
      />
      </Col>
      </Row>

      </Container>
    </>
  );
};