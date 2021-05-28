import React, {useState, useEffect} from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Aside from "../components/Aside";

export default function Upload(props) {
  const [disabled, setDisabled] = React.useState(false);
  const [inputContent, setInputContent] = React.useState("Drag Files or Click to Browse");

  const getUploadParams = ({ meta }) => { 
    return { url: props.url } 
  }

  const handleSubmit = (files, allFiles) => {
    const ids = [];

    allFiles.forEach(f => {
      if (!props.autoUpload) {
        f.restart();
      }
      
      ids.push({
        "_id": JSON.parse(f.xhr.response)._id,
        "name": f.meta.name
    });

      f.remove();
    });

    setDisabled(true);
    setInputContent("Fisierele au fost trimise!");

    if (props.getFileIds) {
      props.getFileIds(ids);
    }
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
      disabled={disabled}
      inputContent={inputContent}
    />
  );
}
