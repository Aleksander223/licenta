import React, {useState, useEffect} from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Aside from "../components/Aside";

export default function Upload() {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }


  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove())
  }

  return (
    <>
      <Container fluid style={{}}>
        <Row>
            <Aside />
          <Col className="col-md-8 col-sm-8" style={{}}>
          <Dropzone
      styles={{
        dropzone: {
          overflowX: "hidden",
          overflowY: "hidden"
        }
      }}
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      multiple={false}
      maxSizeBytes={2 * 1024 * 1024}
      maxFiles={1}
      SubmitButtonComponent={null}
    />
          </Col>
        </Row>
      </Container>
    </>
  );
}
