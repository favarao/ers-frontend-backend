import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/home" className="nav-link">Clinica</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/funcionarios" className="nav-link">Funcionários</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/pacientes" className="nav-link">Pacientes</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/consultas" className="nav-link">Consultas</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;