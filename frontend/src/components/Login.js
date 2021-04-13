import React from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
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
                <Form.Control type="email" placeholder="Email" />
              </InputGroup>
            </Form.Group>

            <br />

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><FaLock/>&nbsp;</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="my-4 px-4">
                <FaSignInAlt /> Login
            </Button>
          </Form>
        </Container>
      </Card>
    </Container>
  );
}
