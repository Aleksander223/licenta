import React, {useEffect} from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";

import { FaSignOutAlt } from "react-icons/fa";

function logout() {
  window.sessionStorage.removeItem("auth");
}

export default function MenuBar(props) {
  let loggedIn = false;

  if (window.sessionStorage.getItem("auth") != null) {
    loggedIn = true;
  }

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Evaluare Cursuri</Navbar.Brand>
        <Nav className="mr-auto">
          {loggedIn && <Nav.Link href="/" className="text-light" onClick={logout}> <FaSignOutAlt /> Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
