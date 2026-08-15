import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getCropsByUsername, deleteCropById } from "../../Services/CropService";

import cropBg from "../../assets/crop-bg.jpg";

import "../../DisplayView.css";
import "../../CSS/CropListCss.css";

const CropList = () => {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);

  const setCropData = () => {
    getCropsByUsername()
      .then((response) => {
        setCrops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCropData();
  }, []);

  const removeCrop = (id) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      deleteCropById(id)
        .then(() => {
          setCrops((prev) => prev.filter((crop) => crop.cropId !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="crop-list-page"
      style={{
        backgroundImage: `url(${cropBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div className="crop-list-body">
        {/* Heading */}
        <h2
          className="text-center mb-4"
          style={{
            color: "#198754",
            fontWeight: "700",
          }}
        >
          <i className="bi bi-flower3 me-2"></i>
          Crop List
        </h2>

        <div className="table-container">
          <table className="crop-table">
            <thead>
              <tr>
                <th>Crop ID</th>
                <th>Farm ID</th>
                <th>Crop Name</th>
                <th>Crop Area</th>
                <th>Sown Month</th>
                <th>Harvest Month</th>
                <th>Yield</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {crops.length > 0 ? (
                crops.map((crop) => (
                  <tr key={crop.cropId}>
                    <td>{crop.cropId}</td>

                    <td>{crop.farmId}</td>

                    <td>{crop.cropName}</td>

                    <td>{crop.cropArea}</td>

                    <td>{crop.sownMonthYear}</td>

                    <td>{crop.harvestMonthYear}</td>

                    <td>
                      {crop.yield > 0
                        ? `${crop.yield} Tons/Acre`
                        : "Not Predicted"}
                    </td>

                    <td>
                      {/* Crop Inputs Button */}
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2"
                        onClick={() => navigate(`/crop-inputs/${crop.cropId}`)}
                      >
                        <i className="bi bi-clipboard-data me-1"></i>
                        Crop Inputs
                      </button>

                      {/* Crop Yield Button */}
                      <Link
                        to={`/farm-crop/${crop.cropId}`}
                        className="yield-btn"
                        style={{ textDecoration: "none", display: "inline-block" }}
                      >
                        <i className="bi bi-graph-up me-1"></i>
                        Crop Yield
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeCrop(crop.cropId)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No Crops Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="back-container">
          <button type="button" className="back-btn" onClick={returnBack}>
            <i className="bi bi-arrow-left-circle"></i> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropList;