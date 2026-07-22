import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCrop, generateCropId } from "../../Services/CropService";
import "../../DisplayView.css";

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
  const [newId, setNewId] = useState(0);

  const setCropId = () => {
    generateCropId().then((response) => {
      setNewId(response.data);
    });
  };
  useEffect(() => {
    setCropId();
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
    crop.cropId = newId;
    addCrop(crop).then((response) => {
      setFlag(true);
    });
  };

    const clearAll = () => {
    crop.cropName = "";
    crop.area = 0.0;
  };

    if (!toString(crop.cropName).trim()) {
      tempErrors.cropName = "Crop name is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveCrop(event);
    }


    const returnBack = () => {
    navigate("/farmer-menu");
    };


  return (
<div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-2 offset-md-3 offset-md-3">
            <div className="login-box">
              <h2 className="text-center">New Crop Entry</h2>
              <br />
              <form>
                <div className="form-group">
                  <label>Crop Id: </label>
                  <input
                    placeholder="Crop Id"
                    name="cropId"
                    className="form-control"
                    value={newId}
                  />
                </div>
                <div className="form-group">
                  <label> Crop Name: </label>
                  <input
                    placeholder="Crop Name"
                    name="cropName"
                    className="form-control"
                    value={crop.cropName}
                    onChange={onChangeHandler}
                  />
                  {errors.cropName && (
                    <p style={{ color: "red" }}>{errors.cropName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label> Crop Area: </label>
                  <input
                    placeholder="Crop Area"
                    name="area"
                    className="form-control"
                    value={crop.area}
                    onChange={onChangeHandler}
                  />
                  {errors.area && <p style={{ color: "red" }}>{errors.area}</p>}
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-success"
                    onClick={handleValidation}
                  >
                    Save
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-secondary" onClick={clearAll}>
                    Reset
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-warning" onClick={returnBack}>
                    Return Back
                  </button>
                </div>
              </form>
              <br />
              <div>
                {flag && <p style={{ color: "blue" }}>New Crop Added </p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEntry;