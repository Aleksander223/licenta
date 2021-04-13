import React from 'react';
import data from './sampleData';
import DataTable from 'react-data-table-component';
import { Form, Container, Row, Col } from 'react-bootstrap';

import Aside from "../components/Aside";

const columns = [
  {
    name: 'Token',
    selector: 'token',
    sortable: true,
  },
  {
    name: 'Grupa',
    selector: 'grupa',
    sortable: true,
  },
  {
    name: 'Sesiune',
    selector: 'sesiune',
    sortable: true,
  },
];
export default function Tokens() {
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
        data={data}
        defaultSortField="title"
        selectableRows={true}
        selectableRowsHighlight={true}
        pagination={true}
        subHeader={true}
        subHeaderComponent={
          (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control id="outlined-basic" label="Search" variant="outlined" style={{ margin: '5px' }} />
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