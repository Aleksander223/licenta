import React, {useEffect} from "react";
import {
  Navbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { AppContext } from "../services/context";
import { isLoggedIn, useWindowDimensions } from "../services/util";

function logout() {
  window.sessionStorage.removeItem("auth");
}

function toggleAside(context) {
  console.log(context);
  context.setAside(!context.aside);
}

export default function MenuBar(props) {
  let loggedIn = isLoggedIn();

  if (window.sessionStorage.getItem("auth") != null) {
    loggedIn = true;
  }

  const {height, width} = useWindowDimensions();

  const context = React.useContext(AppContext);

  return (
    <>
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
      {loggedIn == 1 && width <= 576 && <Button className="text-light" onClick={() => toggleAside(context)}> <FaBars /></Button>}
        <Navbar.Brand href="/">Evaluare Cursuri</Navbar.Brand>
        <Nav className="mr-auto">
          {loggedIn != 0 && <Nav.Link href="/" className="text-light" onClick={logout}> <FaSignOutAlt /> Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}
