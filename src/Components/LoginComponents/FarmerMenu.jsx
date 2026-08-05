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
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.jpg";

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
      {/* Navbar */}
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg,#198754,#28a745,#3fbf5f)",
        }}
      >
        <Container style={{ display: "flex", minHeight: "auto", height: "auto" }}>
          <Navbar.Brand href="/farmer-menu" className="text-white fw-bold">
            <i className="bi bi-tree-fill me-2"></i>
            Farm Verse
          </Navbar.Brand>

          <Navbar.Toggle style={{ backgroundColor: "rgba(255,255,255,0.7)" }} />

          <Navbar.Collapse>
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link href="/farmer-menu" className="text-white fw-semibold">
                <i className="bi bi-house-door-fill me-1"></i>
                Dashboard
              </Nav.Link>

              <NavDropdown
                title={
                  <span className="text-white fw-semibold">
                    <i className="bi bi-flower1 me-1"></i>
                    Farm
                  </span>
                }
                id="farm-dropdown"
              >
                <NavDropdown.Item href="/farm-add">🌾 Farm Entry</NavDropdown.Item>
                <NavDropdown.Item href="/farm-list">📋 Farm List</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={
                  <span className="text-white fw-semibold">
                    <i className="bi bi-flower3 me-1"></i>
                    Crop
                  </span>
                }
                id="crop-dropdown"
              >
                <NavDropdown.Item href="/crop-add">🌱 Crop Entry</NavDropdown.Item>
                <NavDropdown.Item href="/crop-list">🌿 Crop List</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="text-white position-relative me-2">
                <i className="bi bi-bell-fill fs-5"></i>
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  style={{ top: "0px", right: "0px", fontSize: "10px" }}
                >
                  1
                </span>
              </Nav.Link>

              <NavDropdown
                title={
                  <span className="text-white fw-semibold">
                    <i className="bi bi-person-circle me-1"></i>
                    Farmer
                  </span>
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container
        className="mt-4"
        style={{ display: "block", minHeight: "auto", height: "auto" }}
      >
        <div
          style={{
            background: "linear-gradient(120deg,#e9f8ef,#ffffff 60%)",
            borderRadius: "25px",
            padding: "50px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          }}
        >
          <Row className="align-items-center">
            <Col lg={7}>
              <span
                style={{
                  background: "#e9f8ef",
                  color: "#198754",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                }}
              >
                FARMVERSE PLATFORM
              </span>

              <h1
                className="mt-4"
                style={{ fontSize: "48px", fontWeight: "700", color: "#222" }}
              >
                Welcome Back,
                <br />
                Farmer 🌱
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                  lineHeight: "1.8",
                  maxWidth: "600px",
                }}
              >
                Manage your farms, crops and AI-powered agriculture insights
                all in one place.
              </p>
            </Col>

            <Col lg={5}>
              <Row className="g-3">
                <Col xs={4}>
                  <StatCard
                    icon="bi-house-door-fill"
                    color="#198754"
                    bg="#eaf8ef"
                    value="3"
                    label="Registered Farms"
                  />
                </Col>
                <Col xs={4}>
                  <StatCard
                    icon="bi-map-fill"
                    color="#0d6efd"
                    bg="#eef6ff"
                    value="45"
                    label="Total Hectares"
                  />
                </Col>
                <Col xs={4}>
                  <StatCard
                    icon="bi-flower3"
                    color="#2ca02c"
                    bg="#eefbea"
                    value="7"
                    label="Crop Records"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Management Modules */}
      <Container
        className="mt-5 mb-5"
        style={{ display: "block", minHeight: "auto", height: "auto" }}
      >
        <h5 className="fw-bold mb-3" style={{ textAlign: "left" }}>
          Management Modules
        </h5>
        <Row className="g-4">
          <Col md={6}>
            <ModuleCard
              image={image1}
              icon="bi-house-door-fill"
              iconColor="#198754"
              iconBg="#eaf8ef"
              title="Farm Management"
              titleColor="#198754"
              description="Register, update and manage all your farm details in one place."
              items={["Add New Farm", "Update Farm Details", "View Farm List"]}
              actions={[
                {
                  title: "Add Farm",
                  subtitle: "Register a new farm to the system",
                  icon: "bi-plus-lg",
                  color: "#198754",
                  bg: "#eaf8ef",
                  onClick: () => navigate("/farm-add"),
                },
                {
                  title: "View Farms",
                  subtitle: "View and manage all your farms",
                  icon: "bi-clipboard-check",
                  color: "#0d6efd",
                  bg: "#eef6ff",
                  onClick: () => navigate("/farm-list"),
                },
              ]}
            />
          </Col>

          <Col md={6}>
            <ModuleCard
              image={image2}
              icon="bi-flower3"
              iconColor="#b8860b"
              iconBg="#fdf6e3"
              title="Crop Management"
              titleColor="#b8860b"
              description="Add crop details and monitor all crop records efficiently."
              items={["Add New Crop", "View Crop List", "Monitor Crop Yield"]}
              actions={[
                {
                  title: "Add Crop",
                  subtitle: "Add a new crop to your farm",
                  icon: "bi-flower1",
                  color: "#2ca02c",
                  bg: "#eefbea",
                  onClick: () => navigate("/crop-add"),
                },
                {
                  title: "View Crops",
                  subtitle: "View and monitor all crop records",
                  icon: "bi-flower3",
                  color: "#b8860b",
                  bg: "#fdf6e3",
                  onClick: () => navigate("/crop-list"),
                },
              ]}
            />
          </Col>
        </Row>
           </Container>

      {/* Expense Module */}
      <Container
        className="mb-5"
        style={{
          display: "block",
          minHeight: "auto",
          height: "auto",
        }}
      >
        <Row>
          <Col md={6}>
            <ModuleCard
              image={image3}
              icon="bi-cash-stack"
              iconColor="#0d6efd"
              iconBg="#eef6ff"
              title="Expense & Analysis"
              titleColor="#0d6efd"
              description="Manage agricultural expense records and monitor farming costs."
              items={[
                "Add New Expense",
                "View Expense List",
                "Track Expense Records",
              ]}
              actions={[
                {
                  title: "Add Expense",
                  subtitle: "Register a new expense item",
                  icon: "bi-plus-circle",
                  color: "#0d6efd",
                  bg: "#eef6ff",
                  onClick: () => navigate("/expense-entry"),
                },
                {
                  title: "View Expenses",
                  subtitle: "View and manage all expenses",
                  icon: "bi-card-list",
                  color: "#6610f2",
                  bg: "#f3edff",
                  onClick: () => navigate("/expense-list"),
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <div className="py-3 px-4 border-top d-flex justify-content-between align-items-center flex-wrap">
        <span className="text-muted small">
          <i className="bi bi-tree-fill text-success me-1"></i>
          © {new Date().getFullYear()} Farm Verse. All rights reserved.
        </span>
        <span className="text-muted small fst-italic">
          "Smart farming today for a better tomorrow." 🌿
        </span>
      </div>
    </>
  );
};

/* ---------- Reusable pieces ---------- */

const StatCard = ({ icon, color, bg, value, label }) => (
  <div
    className="bg-white text-center h-100"
    style={{
      borderRadius: "18px",
      padding: "18px 10px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    }}
  >
    <div
      className="mx-auto mb-2 d-flex align-items-center justify-content-center"
      style={{
        width: "50px",
        height: "50px",
        background: bg,
        borderRadius: "14px",
        fontSize: "22px",
        color,
      }}
    >
      <i className={`bi ${icon}`}></i>
    </div>
    <h4 className="fw-bold mb-0">{value}</h4>
    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
      {label}
    </p>
  </div>
);

const ActionCard = ({ icon, color, bg, title, subtitle, onClick }) => (
  <Card
    className="border-0 h-100"
    role="button"
    onClick={onClick}
    style={{ borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}
  >
    <Card.Body className="d-flex align-items-center" style={{ textAlign: "left" }}>
      <div
        className="d-flex align-items-center justify-content-center me-3"
        style={{
          width: "50px",
          height: "50px",
          minWidth: "50px",
          background: bg,
          borderRadius: "14px",
          fontSize: "22px",
          color,
        }}
      >
        <i className={`bi ${icon}`}></i>
      </div>
      <div style={{ textAlign: "left" }}>
        <h6 className="fw-bold mb-1">{title}</h6>
        <p className="text-muted mb-0" style={{ fontSize: "12px", textAlign: "left" }}>
          {subtitle}
        </p>
      </div>
      <i className="bi bi-arrow-right ms-auto text-success"></i>
    </Card.Body>
  </Card>
);

const ModuleCard = ({
  image,
  icon,
  iconColor,
  iconBg,
  title,
  titleColor,
  description,
  items,
  actions,
}) => (
  <Card
    className="border-0 h-100"
    style={{
      borderRadius: "25px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
    }}
  >

    <img
        src={image}
        alt={title}
        style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px"
        }}
    />

    <Card.Body className="p-4" style={{ textAlign: "left" }}>
      <div className="d-flex align-items-center mb-3">
        <div
          className="d-flex align-items-center justify-content-center me-3"
          style={{
            width: "60px",
            height: "60px",
            background: iconBg,
            borderRadius: "16px",
            fontSize: "28px",
            color: iconColor,
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <h4 className="fw-bold mb-0" style={{ color: titleColor }}>
          {title}
        </h4>
      </div>

      <p className="text-muted" style={{ textAlign: "left" }}>
        {description}
      </p>

      <ul className="mb-4" style={{ textAlign: "left", paddingLeft: 0, listStyle: "none" }}>
        {items.map((item) => (
          <li key={item} className="mb-1" style={{ textAlign: "left" }}>
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            {item}
          </li>
        ))}
      </ul>

      <Row className="g-3">
        {actions.map((action) => (
          <Col md={6} key={action.title}>
            <ActionCard {...action} />
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

export default FarmerMenu;