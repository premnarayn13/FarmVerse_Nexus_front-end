import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCrop, generateCropId } from "../../Services/CropService";
import { getAllFarmsIdsByUser } from "../../Services/FarmService";
import "../../DisplayView.css";

const CropEntry = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState({
    cropId: "",
    farmId: "",
    username: "",
    cropName: "",
    cropArea: "",
    sownMonthYear: "",
    harvestMonthYear: "",
    yield: 0.0,
  });
  const [flag, setFlag] = useState(false);
  const [idList, setIdList] = useState([]);

  const loadInitialData = () => {
    generateCropId()
      .then((response) => {
        if (response.data) {
          setCrop((prev) => ({ ...prev, cropId: String(response.data) }));
        }
      })
      .catch((err) => console.log(err));

    getAllFarmsIdsByUser()
      .then((response) => {
        setIdList(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadInitialData();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setCrop((values) => ({ ...values, [name]: value }));
  };

  const saveCrop = (event) => {
    event.preventDefault();

    addCrop(crop)
      .then((response) => {
        if (response.data === "Total crop area cannot exceed the farm area.") {
          alert(response.data);
          return;
        }

        alert("Crop Added Successfully");
        setFlag(true);
        // Refresh crop id for next entry
        generateCropId()
          .then((res) => {
            if (res.data) {
              setCrop((prev) => ({
                ...prev,
                cropId: String(res.data),
                cropName: "",
                cropArea: "",
                sownMonthYear: "",
                harvestMonthYear: "",
              }));
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to save crop.");
      });
  };

  const clearAll = (event) => {
    event.preventDefault();

    setCrop((prev) => ({
      ...prev,
      farmId: "",
      cropName: "",
      cropArea: "",
      sownMonthYear: "",
      harvestMonthYear: "",
      yield: 0.0,
    }));

    setErrors({});
    setFlag(false);
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!crop.cropId || !crop.cropId.trim()) {
      tempErrors.cropId = "Crop ID is required";
      isValid = false;
    }

    if (!crop.farmId || String(crop.farmId).trim() === "") {
      tempErrors.farmId = "Select a Farm ID";
      isValid = false;
    }

    if (!crop.cropName || !crop.cropName.trim()) {
      tempErrors.cropName = "Crop name is required";
      isValid = false;
    }

    if (
      crop.cropArea === "" ||
      crop.cropArea === null ||
      Number(crop.cropArea) <= 0
    ) {
      tempErrors.cropArea = "Crop area must be greater than 0";
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
    <div className="container-fluid" style={{ marginTop: "5vh" }}>
      <div className="row justify-content-center" style={{ border: "none" }}>
        <div className="col-lg-4 col-md-10 col-sm-12">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success text-white text-center rounded-top-4">
              <h3 className="mb-0">
                <i className="bi bi-flower3 me-2"></i>
                New Crop Entry
              </h3>
            </div>

            <div className="card-body p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Crop ID</label>

                  <input
                      type="text"
                      className="form-control"
                      name="cropId"
                      placeholder="Enter Crop ID (Example: C1000003)"
                      value={crop.cropId}
                      onChange={onChangeHandler}
                  />

                  {errors.cropId && (
                      <small className="text-danger">{errors.cropId}</small>
                  )}
              </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Select Farm ID</label>

                  <select
                    className="form-select"
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
                    <small className="text-danger">{errors.farmId}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Crop Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter Crop Name"
                    name="cropName"
                    value={crop.cropName}
                    onChange={onChangeHandler}
                  />
                  {errors.cropName && (
                    <small className="text-danger">{errors.cropName}</small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Crop Area</label>
                  <input
                    className="form-control"
                    placeholder="Enter Crop Area"
                    name="cropArea"
                    value={crop.cropArea}
                    onChange={onChangeHandler}
                  />
                  {errors.cropArea && (
                    <small className="text-danger">{errors.cropArea}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Sown Month & Year
                  </label>

                  <input
                    type="month"
                    className="form-control"
                    name="sownMonthYear"
                    value={crop.sownMonthYear}
                    onChange={onChangeHandler}
                  />

                  {errors.sownMonthYear && (
                    <small className="text-danger">
                      {errors.sownMonthYear}
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Harvest Month & Year
                  </label>

                  <input
                    type="month"
                    className="form-control"
                    name="harvestMonthYear"
                    value={crop.harvestMonthYear}
                    onChange={onChangeHandler}
                  />

                  {errors.harvestMonthYear && (
                    <small className="text-danger">
                      {errors.harvestMonthYear}
                    </small>
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
                    Back
                  </button>
                </div>

                {flag && (
                  <div className="alert alert-success mt-4 text-center">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    New Crop Added Successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEntry;
