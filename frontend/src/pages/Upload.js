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
      if (!props.autoUpload) {
        f.restart();
      }
      f.remove();
    })
  }

  const handleChangeStatus = (file, status) => {
    if (!props.autoUpload && status == 'ready') {
      file.meta.status="done";
      status = "done";
    }
  }

  const validate = (file) => {
    const ext = file.meta.name.split('.').pop();

    if (ext !== (props.fileType ?? 'csv')) {
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
      multiple={props.multiple ?? false}
      maxSizeBytes={2 * 1024 * 1024}
      maxFiles={props.maxFiles ?? 1}
      autoUpload={props.autoUpload ?? false}
      onChangeStatus = {handleChangeStatus}
      validate={validate}
    />
  );
}
