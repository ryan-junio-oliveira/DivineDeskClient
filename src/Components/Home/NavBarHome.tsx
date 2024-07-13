import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarHome() {
  return (
    <Navbar className="bg-nav" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='d-flex gap-1'>
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <h3 className='m-auto'>Divine Desk</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/login" className="text-white">Login</Nav.Link>
            <Nav.Link href="/register" className="text-white">Cadastro</Nav.Link>
            <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;