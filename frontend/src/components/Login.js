import React, {useState, useEffect} from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

import axios from "axios";
import { typeOfUser } from "../services/util";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const submitLogin = (e) => {
    if (email != "" && password != "") {
      e.preventDefault();
      
      axios.post("http://localhost:5000/login", {
        email,
        password
      }).then(r => {
        window.sessionStorage.setItem("auth", r.data.token);
        if (typeOfUser == 0) {
          window.location.href="/admin";
        } else {
          window.location.href="/report";
        }
      }).catch(e => {
        console.log(e);
        alert("Invalid email or password");
      })
    }
  };

  

  return (
    <Container>
      <Card
        expand="lg"
        style={{
          background: "white",
          borderRadius: "30px",
          boxShadow: "-1px 8px 10px -15px black",
        }}
      >
        <h3 className="text-center mt-4">Login</h3>
        <Container className="w-75 p-3">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label> Email address</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><FaEnvelope/>&nbsp;</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmail} required />
              </InputGroup>
            </Form.Group>

            <br />

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><FaLock/>&nbsp;</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} required />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitLogin} className="my-4 px-4">
                <FaSignInAlt /> Login
            </Button>
          </Form>
        </Container>
      </Card>
    </Container>
  );
}
