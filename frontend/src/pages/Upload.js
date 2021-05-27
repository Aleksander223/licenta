import React, {useState, useEffect} from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Aside from "../components/Aside";

export default function Upload(props) {
  const getUploadParams = ({ meta }) => { 
    return { url: props.url } 
  }

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => {
      f.restart();
      f.remove();
    })
  }

  const handleChangeStatus = (file, status) => {
    if (status == 'ready') {
      file.meta.status="done";
      status = "done";
    }
  }

  const validate = (file) => {
    const ext = file.meta.name.split('.').pop();

    if (ext !== 'csv') {
      return "File format not accepted!";
    }
  }

  return (
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
      autoUpload={false}
      onChangeStatus = {handleChangeStatus}
      validate={validate}
    />
  );
}
