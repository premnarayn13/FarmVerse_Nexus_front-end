import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { getUserDetails } from "../../Services/LoginService";
import farmBg from "../../assets/farmbg.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    personalName: "",
    email: "",
    role: "Farmer",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${farmBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,50,20,0.6)",
        }}
      ></div>

      <Card
        style={{
          width: "480px",
          zIndex: 2,
          borderRadius: "25px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          border: "none",
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #198754, #28a745)",
                color: "white",
                fontSize: "42px",
                boxShadow: "0 8px 20px rgba(25,135,84,0.3)",
              }}
            >
              <i className="bi bi-person-fill"></i>
            </div>
            <h3 className="fw-bold text-dark mb-1">
              {user.personalName || user.username || "Farmer Profile"}
            </h3>
            <Badge bg="success" className="px-3 py-2 rounded-pill fs-6 fw-normal">
              <i className="bi bi-patch-check-fill me-1"></i>
              {user.role || "Verified Farmer"}
            </Badge>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="bg-light p-4 rounded-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-badge fs-4 text-success me-3"></i>
                <div>
                  <small className="text-muted d-block">Username</small>
                  <strong className="fs-6 text-dark">{user.username || "N/A"}</strong>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-card-heading fs-4 text-success me-3"></i>
                <div>
                  <small className="text-muted d-block">Full Name</small>
                  <strong className="fs-6 text-dark">{user.personalName || "N/A"}</strong>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-envelope-at fs-4 text-success me-3"></i>
                <div>
                  <small className="text-muted d-block">Email Address</small>
                  <strong className="fs-6 text-dark">{user.email || "N/A"}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="d-grid">
            <Button
              variant="success"
              size="lg"
              className="rounded-pill shadow-sm"
              onClick={() => navigate("/farmer-menu")}
            >
              <i className="bi bi-arrow-left-circle me-2"></i>
              Back to Dashboard
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
