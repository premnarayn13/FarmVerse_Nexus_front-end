import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCrop, generateCropId } from "../../Services/CropService";
import { getAllFarmsIdsByUser } from "../../Services/FarmService";

import cropBg from "../../assets/crop-bg.jpg";

import "../../DisplayView.css";
import "../../CSS/CropEntryCss.css";

const CropEntry = () => {
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState({
    cropId: "",
    farmId: 0,
    username: "",
    cropName: "",
    cropArea: 0.0,
    sownMonthYear: "",
    harvestMonthYear: "",
    yield: 0.0,
  });

  const [flag, setFlag] = useState(false);
  const [newId, setNewId] = useState("");
  const [idList, setIdList] = useState([]);

  const setCropId = () => {
    generateCropId().then((response) => {
      setNewId(response.data);
    });
  };

  const setFarmsIds = () => {
    getAllFarmsIdsByUser().then((response) => {
      setIdList(response.data);
    });
  };

  useEffect(() => {
    setCropId();
    setFarmsIds();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();

    setFlag(false);

    const name = event.target.name;
    const value = event.target.value;

    setCrop((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const saveCrop = (event) => {
    event.preventDefault();

    crop.cropId = newId;

    addCrop(crop)
      .then((response) => {
        if (response.data === "Total crop area cannot exceed the farm area.") {
          return;
        }

        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearAll = () => {
    crop.cropName = "";
    crop.cropArea = 0.0;
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!toString(crop.cropName).trim()) {
      tempErrors.cropName = "Crop name is required";
      isValid = false;
    }

    if (!toString(crop.cropArea).trim()) {
      tempErrors.cropArea = "Crop area is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      saveCrop(event);
    }
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="crop-entry-page"
      style={{
        backgroundImage: `url(${cropBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        height: "100vh",
        boxSizing: "border-box",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div className="crop-entry-container">
        <div className="crop-entry-card">
          <div className="crop-entry-header">
            <h3>
              <i className="bi bi-flower3"></i>
              New Crop Entry
            </h3>
          </div>

          <div className="crop-entry-body">
            <form>
              <div className="form-group">
                <label>Crop ID</label>
                <input value={newId} readOnly />
              </div>

              <div className="form-group">
                <label>Select Farm ID</label>

                <select
                  name="farmId"
                  value={crop.farmId}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Farm ID</option>

                  {idList.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </select>

                {errors.farmId && (
                  <small className="error">{errors.farmId}</small>
                )}
              </div>

              <div className="form-group">
                <label>Crop Name</label>

                <input
                  placeholder="Enter Crop Name"
                  name="cropName"
                  value={crop.cropName}
                  onChange={onChangeHandler}
                />

                {errors.cropName && (
                  <small className="error">{errors.cropName}</small>
                )}
              </div>

              <div className="form-group">
                <label>Crop Area</label>

                <input
                  placeholder="Enter Crop Area"
                  name="cropArea"
                  value={crop.cropArea}
                  onChange={onChangeHandler}
                />

                {errors.cropArea && (
                  <small className="error">{errors.cropArea}</small>
                )}
              </div>

              <div className="form-group">
                <label>Sown Month & Year</label>

                <input
                  type="month"
                  name="sownMonthYear"
                  value={crop.sownMonthYear}
                  onChange={onChangeHandler}
                />

                {errors.sownMonthYear && (
                  <small className="error">{errors.sownMonthYear}</small>
                )}
              </div>

              <div className="form-group">
                <label>Harvest Month & Year</label>

                <input
                  type="month"
                  name="harvestMonthYear"
                  value={crop.harvestMonthYear}
                  onChange={onChangeHandler}
                />

                {errors.harvestMonthYear && (
                  <small className="error">{errors.harvestMonthYear}</small>
                )}
              </div>

              <div className="button-group">
                <button className="save-btn" onClick={handleValidation}>
                  <i className="bi bi-check-circle"></i>
                  Save
                </button>

                <button className="reset-btn" onClick={clearAll}>
                  <i className="bi bi-arrow-clockwise"></i>
                  Reset
                </button>

                <button className="back-btn" onClick={returnBack}>
                  <i className="bi bi-arrow-left-circle"></i>
                  Back
                </button>
              </div>

              {flag && (
                <div className="success-message">
                  New Crop Added Successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEntry;