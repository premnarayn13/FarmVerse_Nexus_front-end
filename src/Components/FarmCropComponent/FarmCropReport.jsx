import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpectedYield } from "../../Services/AiService";
import "../../DisplayView.css";

const FarmCropReport = () => {
  let navigate = useNavigate();
  let param = useParams();
  const [farmCrop, setFarmCrop] = useState({
    farmId: 0,
    farmName: "",
    soil: "",
    cropId: "",
    cropName: "",
    cropArea: 0.0,
    sownMonthYear: "",
    harvestMonthYear: "",
    yield: 0.0,
    comments: "",
  });

  const setFarmCropData = useCallback(() => {
    if (param.cid) {
      getExpectedYield(param.cid)
        .then((response) => {
          if (response.data) {
            setFarmCrop(response.data);
          }
        })
        .catch((err) => console.error("Error fetching expected yield:", err));
    }
  }, [param.cid]);

  useEffect(() => {
    setFarmCropData();
  }, [setFarmCropData]);
 
   const returnBack=()=>{
    navigate('/crop-list');  
 }

 return (
  <div
    className="container py-5"
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#eef7ff,#dceeff)",
    }}
  >
    <div
      className="mx-auto"
      style={{
        maxWidth: "850px",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          overflow: "hidden",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <div
          className="text-white text-center py-4"
          style={{
            background: "linear-gradient(90deg,#0d6efd,#00b4db)",
          }}
        >
          <h2 className="fw-bold mb-1">🌾 Crop Yield Prediction Report</h2>
          <h5>{farmCrop.cropId}</h5>
        </div>

        <div className="card-body p-4">

          <table className="table table-bordered align-middle">

            <tbody>

              <tr>
                <th width="35%">Crop ID</th>
                <td>{farmCrop.cropId}</td>
              </tr>

              <tr>
                <th>Crop Name</th>
                <td>{farmCrop.cropName}</td>
              </tr>

              <tr>
                <th>Farm Name</th>
                <td>{farmCrop.farmName}</td>
              </tr>

              <tr>
                <th>Soil Type</th>
                <td>{farmCrop.soil}</td>
              </tr>

              <tr>
                <th>Crop Area</th>
                <td>{farmCrop.cropArea} Acres</td>
              </tr>

              <tr>
                <th>Sown Month</th>
                <td>{farmCrop.sownMonthYear}</td>
              </tr>

              <tr>
                <th>Harvest Month</th>
                <td>{farmCrop.harvestMonthYear}</td>
              </tr>

              <tr>
                <th>Expected Yield</th>
                <td>
                  <span
                    className="badge bg-success fs-6 px-3 py-2"
                  >
                    {farmCrop.yield} Tons / Acre
                  </span>
                </td>
              </tr>

              <tr>
                <th>AI Recommendation</th>
                <td
                  style={{
                    background: "#f8fbff",
                    lineHeight: "1.8",
                    fontWeight: "500",
                  }}
                >
                  {farmCrop.comments}
                </td>
              </tr>

            </tbody>

          </table>

          <div className="text-center mt-4">

            <button
              onClick={returnBack}
              className="btn btn-primary px-5 py-2 rounded-pill shadow"
            >
              ← Return
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
);

}
export default FarmCropReport;