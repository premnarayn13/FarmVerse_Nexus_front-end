import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  addCropInputs,
  deleteCropInputsById,
} from "../../Services/CropInputService";

const PREDICT_URL = "http://localhost:8080/farmverse/predict";

const CropInputsView = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [cropInputs, setCropInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /*
   * AI prediction
   * Crop ID is enough.
   * Backend gets the crop details and sends them to AI.
   */
  const predictCropInputs = () => {
    if (!cid) {
      setError("Crop ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    axios
      .post(`${PREDICT_URL}/${cid}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("AI Prediction Response:", response.data);

        setCropInputs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("AI Prediction Error:", err);

        setLoading(false);
        setError("Unable to generate crop input prediction. Please try again.");
      });
  };

  /*
   * Automatically run AI prediction when page opens.
   */
  useEffect(() => {
    predictCropInputs();
  }, [cid]);

  /*
   * Save AI generated crop inputs.
   */
  const saveCropInputs = () => {
    if (!cropInputs) {
      setError("No crop input prediction available.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    addCropInputs(cropInputs)
      .then(() => {
        setSaving(false);
        setMessage("AI predicted crop inputs saved successfully.");
      })
      .catch((err) => {
        console.log("Save Error:", err);

        setSaving(false);
        setError("Unable to save crop inputs.");
      });
  };

  /*
   * Delete saved crop inputs.
   */
  const deleteInputs = () => {
    if (!cid) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the crop inputs?",
    );

    if (!confirmDelete) {
      return;
    }

    setDeleting(true);
    setMessage("");
    setError("");

    deleteCropInputsById(cid)
      .then(() => {
        setDeleting(false);
        setMessage("Crop inputs deleted successfully.");
      })
      .catch((err) => {
        console.log("Delete Error:", err);

        setDeleting(false);
        setError("Unable to delete crop inputs.");
      });
  };

  const returnBack = () => {
    navigate("/crop-list");
  };

  /*
   * Loading screen while AI is calculating.
   */
  if (loading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f8f6",
        }}
      >
        <div
          className="card border-0 shadow-lg text-center p-5"
          style={{
            borderRadius: "25px",
            maxWidth: "500px",
            width: "90%",
          }}
        >
          <div
            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#eaf8ef",
            }}
          >
            <i
              className="bi bi-robot"
              style={{
                fontSize: "40px",
                color: "#198754",
              }}
            ></i>
          </div>

          <h3 className="fw-bold text-success">AI is analysing your crop</h3>

          <p className="text-muted mb-4">
            Calculating the required water, fertilizer, pesticides and tractor
            hours based on your crop details.
          </p>

          <div
            className="spinner-border text-success mx-auto"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <p className="mt-3 mb-0 text-muted">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f8f6",
      }}
    >
      <div className="container">
        <div
          className="card border-0 shadow-lg mx-auto"
          style={{
            maxWidth: "1000px",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="text-white text-center py-4"
            style={{
              background: "linear-gradient(90deg,#198754,#28a745,#3fbf5f)",
            }}
          >
            <div
              className="mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "rgba(255,255,255,0.18)",
                borderRadius: "50%",
              }}
            >
              <i className="bi bi-robot" style={{ fontSize: "30px" }}></i>
            </div>

            <h2 className="fw-bold mb-1">AI Crop Input Analysis</h2>

            <p className="mb-0">Smart resource prediction for your crop</p>
          </div>

          <div className="card-body p-4 p-md-5">
            {/* Success Message */}
            {message && (
              <div className="alert alert-success d-flex align-items-center">
                <i className="bi bi-check-circle-fill me-2"></i>
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {/* Crop Information */}
            {cropInputs && (
              <>
                <div
                  className="card border-0 mb-4"
                  style={{
                    backgroundColor: "#f8faf9",
                    borderRadius: "18px",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eaf8ef",
                          borderRadius: "14px",
                        }}
                      >
                        <i
                          className="bi bi-flower3"
                          style={{
                            color: "#198754",
                            fontSize: "25px",
                          }}
                        ></i>
                      </div>

                      <div>
                        <h5 className="fw-bold mb-0">Crop Information</h5>

                        <small className="text-muted">
                          Details used by the AI prediction system
                        </small>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">Crop ID</small>

                          <strong>{cropInputs.cropId}</strong>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">
                            Crop Name
                          </small>

                          <strong>{cropInputs.cropName || "N/A"}</strong>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">
                            Crop Area
                          </small>

                          <strong>{cropInputs.cropArea || 0} Acres</strong>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">
                            Soil Type
                          </small>

                          <strong>{cropInputs.soil || "N/A"}</strong>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">
                            Sown Month
                          </small>

                          <strong>{cropInputs.sownMonthYear || "N/A"}</strong>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="bg-white rounded-3 p-3 h-100 shadow-sm">
                          <small className="text-muted d-block">
                            Harvest Month
                          </small>

                          <strong>
                            {cropInputs.harvestMonthYear || "N/A"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Prediction Heading */}
                <div className="text-center mb-4">
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: "#eaf8ef",
                      color: "#198754",
                    }}
                  >
                    <i className="bi bi-stars me-2"></i>
                    AI GENERATED RECOMMENDATION
                  </span>

                  <h3 className="fw-bold mt-3">Recommended Crop Resources</h3>

                  <p className="text-muted">
                    These values are automatically predicted by the AI based on
                    your crop information.
                  </p>
                </div>

                {/* AI Results */}
                <div className="row g-4">
                  {/* Water */}
                  <div className="col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                        borderLeft: "5px solid #0dcaf0",
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#e8f9fd",
                              borderRadius: "16px",
                            }}
                          >
                            <i
                              className="bi bi-droplet-fill"
                              style={{
                                fontSize: "28px",
                                color: "#0dcaf0",
                              }}
                            ></i>
                          </div>

                          <div>
                            <p className="text-muted mb-1">Water Required</p>

                            <h3 className="fw-bold mb-0">
                              {cropInputs.waterGallon ?? 0}
                              <small className="fs-6 text-muted ms-2">
                                Gallons/Acre
                              </small>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fertilizer */}
                  <div className="col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                        borderLeft: "5px solid #198754",
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#eaf8ef",
                              borderRadius: "16px",
                            }}
                          >
                            <i
                              className="bi bi-flower3"
                              style={{
                                fontSize: "28px",
                                color: "#198754",
                              }}
                            ></i>
                          </div>

                          <div>
                            <p className="text-muted mb-1">
                              Fertilizer Required
                            </p>

                            <h3 className="fw-bold mb-0">
                              {cropInputs.fertilizer ?? 0}
                              <small className="fs-6 text-muted ms-2">
                                Kg/Acre
                              </small>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pesticides */}
                  <div className="col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                        borderLeft: "5px solid #ffc107",
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#fff8df",
                              borderRadius: "16px",
                            }}
                          >
                            <i
                              className="bi bi-shield-check"
                              style={{
                                fontSize: "28px",
                                color: "#ffc107",
                              }}
                            ></i>
                          </div>

                          <div>
                            <p className="text-muted mb-1">
                              Pesticides Required
                            </p>

                            <h3 className="fw-bold mb-0">
                              {cropInputs.pesticides ?? 0}
                              <small className="fs-6 text-muted ms-2">
                                Kg/Acre
                              </small>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tractor */}
                  <div className="col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                        borderLeft: "5px solid #6c757d",
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#f0f1f2",
                              borderRadius: "16px",
                            }}
                          >
                            <i
                              className="bi bi-truck"
                              style={{
                                fontSize: "28px",
                                color: "#6c757d",
                              }}
                            ></i>
                          </div>

                          <div>
                            <p className="text-muted mb-1">Tractor Usage</p>

                            <h3 className="fw-bold mb-0">
                              {cropInputs.tractorHour ?? 0}
                              <small className="fs-6 text-muted ms-2">
                                Hours/Acre
                              </small>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Notice */}
                <div className="alert alert-info mt-4 border-0">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>AI Analysis:</strong> Resource requirements were
                  calculated automatically using the crop details, soil type,
                  growing period and expected yield.
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                  <button
                    type="button"
                    className="btn btn-success px-4 py-2"
                    onClick={saveCropInputs}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2"></i>
                        Save AI Results
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary px-4 py-2"
                    onClick={predictCropInputs}
                    disabled={loading}
                  >
                    <i className="bi bi-stars me-2"></i>
                    Predict Again
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger px-4 py-2"
                    onClick={deleteInputs}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-2"></i>
                        Delete
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary px-4 py-2"
                    onClick={returnBack}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInputsView;