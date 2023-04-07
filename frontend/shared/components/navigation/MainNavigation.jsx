import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
const MainNavigation = () => {
  //const auth = AuthContext();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MarketPlace</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/auth">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default MainNavigation;
