import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFarm, generateFarmId } from "../../Services/FarmService";
import "../../DisplayView.css";

const FarmEntry = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [farm, setFarm] = useState({
    farmId: 0,
    farmName: "",
    area: 0.0,
    username: "abcd",
  });
  const [flag, setFlag] = useState(false);
  const [newId, setNewId] = useState(0);

  const setFarmId = () => {
    generateFarmId().then((response) => {
      setNewId(response.data);
    });
  };

  useEffect(() => {
    setFarmId();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setFarm((values) => ({ ...values, [name]: value }));
  };

  const saveFarm = (event) => {
    event.preventDefault();
    farm.farmId = newId;
    addFarm(farm).then((response) => {
      setFlag(true);
    });
  };

  const clearAll = (event) => {
    event.preventDefault();

    setFarm({
      farmId: 0,
      farmName: "",
      area: "",
      username: "abcd",
    });

    setErrors({});
    setFlag(false);
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!farm.farmName || farm.farmName.trim() === "") {
      tempErrors.farmName = "Farm Name is required";
      isValid = false;
    }

    if (farm.area === "" || farm.area === null) {
      tempErrors.area = "Farm Area is required";
      isValid = false;
    } else if (Number(farm.area) <= 0) {
      tempErrors.area = "Farm Area must be greater than 0";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      saveFarm(event);
    }
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div className="container-fluid" style={{ marginTop: "20vh" }}>
      <div className="row justify-content-center" style={{ border: "none" }}>
        <div className="col-lg-4 col-md-10 col-sm-12">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success text-white text-center">
              <h3 className="mb-0">
                <i className="bi bi-house-door-fill me-2"></i>
                New Farm Entry
              </h3>
            </div>

            <div className="card-body p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Farm ID</label>
                  <input
                    className="form-control"
                    name="farmId"
                    value={newId}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Farm Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter Farm Name"
                    name="farmName"
                    value={farm.farmName}
                    onChange={onChangeHandler}
                    required
                  />
                  {errors.farmName && (
                    <small className="text-danger">{errors.farmName}</small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Farm Area</label>
                  <input
                    className="form-control"
                    placeholder="Enter Farm Area"
                    name="area"
                    value={farm.area}
                    onChange={onChangeHandler}
                    required
                  />
                  {errors.area && (
                    <small className="text-danger">{errors.area}</small>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={handleValidation}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Save
                  </button>

                  <button className="btn btn-secondary" onClick={clearAll}>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset
                  </button>

                  <button className="btn btn-warning" onClick={returnBack}>
                    <i className="bi bi-arrow-left-circle me-1"></i>
                    Return Back
                  </button>
                </div>
              </form>

              {flag && (
                <div className="alert alert-success mt-4 text-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  New Farm Added Successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmEntry;
