import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExpectedYield } from "../../Services/AiService";
import cropBg from "../../assets/crop-bg.jpg";
import '../../CSS/FarmCropReport.css';

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
    comments: ""
  });

  const setFarmCropData = () => {
    if (!param.cid || param.cid === "undefined") {
      return;
    }
    getExpectedYield(param.cid)
      .then(response => {
        setFarmCrop(response.data);
      })
      .catch(err => {
        console.log("Error loading expected yield:", err);
      });
  };

  useEffect(() => {
    setFarmCropData();
  }, []);

  const returnBack = () => {
    navigate('/crop-list');
  };

  return (
    <div
      className="frc-page"
      style={{
        backgroundImage: `url(${cropBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="frc-card">
        <div className="frc-header">
          <div>
            <span className="frc-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              AI Prediction System
            </span>
            <h2 className="frc-title">Crop Yield Prediction</h2>
            <p className="frc-subtitle">
              Generated report for <b>{farmCrop.cropName || "Crop"}</b>
            </p>
          </div>

          <div className="frc-seal">
            <span className="frc-seal-id">{farmCrop.cropId || "ID"}</span>
            <span className="frc-seal-label">CROP ID</span>
          </div>
        </div>

        <div className="frc-body">
          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              </svg>
              Crop Name
            </div>
            <div className="frc-row-value">{farmCrop.cropName || "N/A"}</div>
          </div>

          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Farm Name
            </div>
            <div className="frc-row-value">{farmCrop.farmName || "N/A"}</div>
          </div>

          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Soil Type
            </div>
            <div className="frc-row-value">{farmCrop.soil || "N/A"}</div>
          </div>

          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              Crop Area
            </div>
            <div className="frc-row-value">{farmCrop.cropArea} Acres</div>
          </div>

          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Sown Month
            </div>
            <div className="frc-row-value">{farmCrop.sownMonthYear || "N/A"}</div>
          </div>

          <div className="frc-row">
            <div className="frc-row-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Harvest Month
            </div>
            <div className="frc-row-value">{farmCrop.harvestMonthYear || "N/A"}</div>
          </div>
        </div>

        <div className="frc-yield-wrap">
          <div className="frc-yield">
            <div className="frc-yield-label">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Expected Yield
            </div>
            <div className="frc-yield-value">
              {farmCrop.yield} <span>Tons / Acre</span>
            </div>
          </div>
        </div>

        {farmCrop.comments && (
          <div className="frc-notes">
            <div className="frc-notes-label">AI Recommendation</div>
            <p>{farmCrop.comments}</p>
          </div>
        )}

        <div className="frc-footer">
          <button onClick={returnBack} className="frc-return">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Return to Crop List
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmCropReport;