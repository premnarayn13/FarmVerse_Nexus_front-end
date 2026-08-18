import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addFarm, generateFarmId } from "../../Services/FarmService";

import farmBg from "../../assets/FarmEntryBG.webp";

import "../../DisplayView.css";
import "../../CSS/FarmEntryCss.css";

const FarmEntry = () => {
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [farm, setFarm] = useState({
    farmId: 0,
    farmName: "",
    area: 0.0,
    soil: "",
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

    setFarm((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const saveFarm = (event) => {
    event.preventDefault();

    farm.farmId = newId;

    addFarm(farm).then(() => {
      setFlag(true);
    });
  };

  const clearAll = (event) => {
    event.preventDefault();

    setFarm({
      farmId: 0,
      farmName: "",
      area: "",
      soil: "",
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

    if (!farm.soil || farm.soil.trim() === "") {
      tempErrors.soil = "Farm's Soil Type is required";
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
    <div
      className="farm-entry-page"
      style={{
        backgroundImage: `url(${farmBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div className="farm-entry-container">
        <div className="farm-entry-card">
          <div className="farm-entry-header">
            <h3>
              <i className="bi bi-house-door-fill"></i>
              New Farm Entry
            </h3>
          </div>

          <div className="farm-entry-body">
            <form>
              <div className="form-group">
                <label>Farm ID</label>
                <input name="farmId" value={newId} readOnly />
              </div>

              <div className="form-group">
                <label>Farm Name</label>

                <input
                  placeholder="Enter Farm Name"
                  name="farmName"
                  value={farm.farmName}
                  onChange={onChangeHandler}
                />

                {errors.farmName && (
                  <small className="error">{errors.farmName}</small>
                )}
              </div>

              <div className="form-group">
                <label>Farm Area</label>

                <input
                  placeholder="Enter Farm Area"
                  name="area"
                  value={farm.area}
                  onChange={onChangeHandler}
                />

                {errors.area && <small className="error">{errors.area}</small>}
              </div>

              <div className="form-group">
                <label>Select Farm Soil</label>

                <select
                  name="soil"
                  value={farm.soil}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Farm Soil</option>
                  <option value="Alluvial">Alluvial</option>
                  <option value="Black">Black</option>
                  <option value="Red">Red</option>
                  <option value="Laterite">Laterite</option>
                  <option value="Peaty and Marshy">Peaty and Marshy</option>
                </select>

                {errors.soil && <small className="error">{errors.soil}</small>}
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleValidation}
                >
                  <i className="bi bi-check-circle"></i>
                  Save
                </button>

                <button type="button" className="reset-btn" onClick={clearAll}>
                  <i className="bi bi-arrow-clockwise"></i>
                  Reset
                </button>

                <button type="button" className="back-btn" onClick={returnBack}>
                  <i className="bi bi-arrow-left-circle"></i>
                  Return Back
                </button>
              </div>
            </form>

            {flag && (
              <div className="success-message">
                New Farm Added Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmEntry;