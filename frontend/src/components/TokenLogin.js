import React, {useState, useEffect} from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaKey, FaSignInAlt, FaBackspace } from "react-icons/fa";
import axios from "axios";

export default function TokenLogin() {
  const [token, setToken] = useState("");
  const [activeSession, setActiveSession] = useState(false);

  const handleToken = (e) => {
    setToken(e.target.value);    
  }

  const resetToken = (e) => {
      setToken("");
  }

  const submitToken = (e) => {
    if (token != "") {
      e.preventDefault();

      axios.post("http://127.0.0.1:5000/login/token", {
        token
      }).then(r => {
        window.sessionStorage.setItem("auth", r.data.token);
        window.location.href="/evaluate";
      }).catch(e => {
        alert("Invalid token");
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/session/current", {
        headers: {
          Authorization: window.sessionStorage.getItem("auth"),
        },
      })
      .then((r) => {
        setActiveSession(true);
      });
  }, []);

  return (
    <Container>
      { !activeSession ? <p className="display-3">Nici o sesiune de evaluare activa</p> 
      : <Card
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Token</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><FaKey/>&nbsp;</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Token" value={token} onChange={handleToken} required />
                <InputGroup.Append onClick={resetToken} style={{
                    cursor: "pointer"
                }}>
                    <InputGroup.Text><FaBackspace/>&nbsp;</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="my-4 px-4" onClick={submitToken}>
                <FaSignInAlt /> Login
            </Button>
          </Form>
        </Container>
      </Card>}
    </Container>
  );
}
