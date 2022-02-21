import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand ><h1>Dark web Scraper</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/Dashboard"
                                active={location.pathname === "/Dashboard"}
                            >
                                Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/CustomScrape"
                                active={location.pathname === "/CustomScrape"}
                            >
                                Custom Scrape
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/LiveData"
                                active={location.pathname === "/LiveData"}
                            >
                                Live Data
                            </Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link
                                as={Link}
                                to="/KeyWords"
                                active={location.pathname === "/KeyWords"}
                            >
                           🔑
                            </Nav.Link>
                        <Nav.Link
                                as={Link}
                                to="/Alerts"
                                active={location.pathname === "/Alerts"}
                            >
                           🔔
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <div className="center">
                <Link to="/">
                    <h1>Dark web Scraper</h1>
                </Link>
            </div>
            <div className="center">
                <Link to="/Dashboard">Dashboard </Link>
                <Link to="/CustomScrape">CustomScrape </Link>
                <Link to="/LiveData">LiveData </Link>
            </div> */}
        </div>
    );
}
