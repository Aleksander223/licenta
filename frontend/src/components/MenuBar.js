import React from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";

import { FaSignOutAlt } from "react-icons/fa";

export default function MenuBar(props) {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Evaluare Cursuri</Navbar.Brand>
        <Nav className="mr-auto">
          {props.loggedIn && <Nav.Link href="/" className="text-light"> <FaSignOutAlt /> Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
