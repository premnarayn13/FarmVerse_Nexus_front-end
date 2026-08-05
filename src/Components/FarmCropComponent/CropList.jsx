import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCropsByUsername,
  deleteCropById,
} from "../../Services/CropService";

import "../../DisplayView.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CropList = () => {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  const loadCropData = () => {
    getCropsByUsername()
      .then((response) => {
        setCrops(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to load crop data.");
      });
  };

  useEffect(() => {
    loadCropData();
  }, []);

  const removeCrop = (id) => {
    if (window.confirm("Delete this crop permanently?")) {
      deleteCropById(id).then(() => {
        loadCropData();
      });
    }
  };

  const filteredCrops = crops.filter(
    (crop) =>
      crop.cropName.toLowerCase().includes(search.toLowerCase()) ||
      crop.cropId.toLowerCase().includes(search.toLowerCase()) ||
      crop.farmId.toString().includes(search)
  );

  return (
    <div className="crop-list-page">

      <div className="page-header shadow">
        <div className="container py-4">

          <div className="row align-items-center">

            <div className="col-md-8">

              <h2 className="fw-bold text-white">
                <i className="bi bi-flower3 me-3"></i>
                Crop Management
              </h2>

              <p className="text-light mb-0">
                View, Edit, Delete and Generate AI Crop Reports
              </p>

            </div>

            <div className="col-md-4 text-end">

              <span className="badge bg-light text-success fs-6">
                Total Crops : {filteredCrops.length}
              </span>

            </div>

          </div>

        </div>
      </div>

      <div className="container mt-4">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body">

            <div className="row mb-4">

              <div className="col-md-6">

                <input
                  type="text"
                  className="form-control shadow-sm"
                  placeholder="Search Crop ID / Crop Name / Farm ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="col-md-6 text-end">

                <button
                  className="btn btn-success"
                  onClick={() => navigate("/crop-add")}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Crop
                </button>

              </div>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle text-center">

                <thead className="table-success">

                  <tr>

                    <th>Crop ID</th>
                    <th>Farm ID</th>
                    <th>Crop Name</th>
                    <th>Area (Acres)</th>
                    <th>Sown Month</th>
                    <th>Harvest Month</th>
                    <th>Status</th>
                    <th width="300">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCrops.length > 0 ? (

                    filteredCrops.map((crop) => (

                      <tr key={crop.cropId}>

                        <td>
                          <strong>{crop.cropId}</strong>
                        </td>

                        <td>{crop.farmId}</td>

                        <td>{crop.cropName}</td>

                        <td>{crop.cropArea}</td>

                        <td>{crop.sownMonthYear}</td>

                        <td>{crop.harvestMonthYear}</td>

                        <td>

                          <span className="badge bg-success">
                            Active
                          </span>

                        </td>

                        <td>

                          <Link
                            to={`/farm-crop/${crop.cropId}`}
                            className="btn btn-success btn-sm me-2"
                          >
                            <i className="bi bi-cpu-fill me-1"></i>
                            AI Report
                          </Link>

                    

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeCrop(crop.cropId)}
                          >
                            <i className="bi bi-trash-fill"></i>
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="8">

                        <div className="py-5">

                          <i
                            className="bi bi-inbox"
                            style={{
                              fontSize: "70px",
                              color: "#bdbdbd",
                            }}
                          ></i>

                          <h4 className="mt-3">

                            No Crop Records Found

                          </h4>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            <div className="text-center mt-4">

              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/farmer-menu")}
              >
                <i className="bi bi-arrow-left-circle me-2"></i>

                Back to Dashboard

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CropList;