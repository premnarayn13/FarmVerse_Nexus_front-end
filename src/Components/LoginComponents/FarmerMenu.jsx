import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../DisplayView.css";

const FarmerMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <>
      {/* Header */}
      <div
        className="py-4 text-center"
        style={{
          background: "linear-gradient(90deg,#198754,#28a745,#6fdf7d)",
          color: "white",
        }}
      >
        <h1 className="fw-bold">
          <i className="bi bi-tree-fill me-2"></i>
          Farm Verse
        </h1>
        <p className="mb-0 fs-5">Welcome to Farmer Dashboard</p>
      </div>

      {/* Navbar */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        // className="shadow py-0"
        style={{ maxHeight: "50px" }}
      >
        <Container>
          <Navbar.Brand href="/farmer-menu">
            <i className="bi bi-house-door-fill me-2"></i>
            Dashboard
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse style={{ color: "white" }}>
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <>
                    <i
                      className="bi bi-flower1 me-2"
                      style={{ color: "white" }}
                    ></i>
                    Farm & Crop
                  </>
                }
              >
                <NavDropdown.Item href="/farm-add">
                  🌾 Farm Entry
                </NavDropdown.Item>

                <NavDropdown.Item href="/farm-list">
                  📋 Farm List
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="/crop-add">
                  🌱 Crop Entry
                </NavDropdown.Item>

                <NavDropdown.Item href="/crop-list">
                  🌿 Crop List
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={handleLogout} style={{ color: "white" }}>
                <i
                  className="bi bi-box-arrow-right me-1"
                  style={{ color: "white" }}
                ></i>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Cards */}

      <Container className="mt-5" style={{ maxHeight: "50vh" }}>
        <Row className="g-4" style={{ border: "none" }}>
          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4 h-100">
              <Card.Body className="text-center p-4">
                <i
                  className="bi bi-house-door-fill"
                  style={{ fontSize: "60px", color: "#198754" }}
                ></i>

                <h3 className="mt-3">Farm Management</h3>

                <p className="text-muted">
                  Register farms and manage all farm details efficiently.
                </p>

                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => navigate("/farm-add")}
                >
                  Add Farm
                </Button>

                <Button
                  variant="outline-success"
                  onClick={() => navigate("/farm-list")}
                >
                  View Farms
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4 h-100">
              <Card.Body className="text-center p-4">
                <i
                  className="bi bi-flower3"
                  style={{ fontSize: "60px", color: "#28a745" }}
                ></i>

                <h3 className="mt-3">Crop Management</h3>

                <p className="text-muted">
                  Add crop details and monitor all crop records.
                </p>

                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => navigate("/crop-add")}
                >
                  Add Crop
                </Button>

                <Button
                  variant="outline-success"
                  onClick={() => navigate("/crop-list")}
                >
                  View Crops
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FarmerMenu;
