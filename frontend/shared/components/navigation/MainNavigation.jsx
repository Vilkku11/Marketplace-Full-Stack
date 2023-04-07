import { useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
const MainNavigation = () => {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MarketPlace</Navbar.Brand>
        <Nav className="me-auto">
          {auth.isLoggedIn ? (
            <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/auth">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default MainNavigation;
