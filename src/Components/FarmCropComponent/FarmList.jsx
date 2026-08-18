import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername, deleteFarmById } from "../../Services/FarmService";

import farmBg from "../../assets/FarmEntryBG.webp";

import "../../CSS/FarmListCss.css";

const FarmList = () => {
    const navigate = useNavigate();

    const [farms, setFarms] = useState([]);

    const setFarmData = () => {
        getFarmsByUsername()
            .then((response) => {
                setFarms(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setFarmData();
    }, []);

    const removeFarm = (id) => {
        if (window.confirm("Are you sure you want to delete this farm?")) {
            deleteFarmById(id)
                .then(() => {
                    setFarms((prev) => prev.filter((farm) => farm.farmId !== id));
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
            className="farm-page"
            style={{
                backgroundImage: `url(${farmBg})`,
            }}
        >
            <div className="farm-panel">
                <h3 className="farm-title">
                    <span className="farm-title-icon">🌼</span>
                    Farm List
                </h3>

                <div className="farm-grid">
                    <div className="farm-table-container">
                        <table className="farm-table">
                            <thead>
                                <tr>
                                    <th>Farm ID</th>
                                    <th>Farm Name</th>
                                    <th>Farm Area</th>
                                    <th>Farm Soil</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {farms.length > 0 ? (
                                    farms.map((farm) => (
                                        <tr key={farm.farmId}>
                                            <td>#{farm.farmId}</td>

                                            <td>{farm.farmName}</td>

                                            <td>{farm.area} acres</td>

                                            <td>
                                                <span
                                                    className={`soil-badge ${farm.soil ? farm.soil.toLowerCase() : ""
                                                        }`}
                                                >
                                                    {farm.soil}
                                                </span>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="delete-farm-btn"
                                                    onClick={() => removeFarm(farm.farmId)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No Farms Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="farm-back-wrap">
                        <button
                            type="button"
                            className="farm-back-btn"
                            onClick={returnBack}
                        >
                            <i className="bi bi-arrow-left-circle"></i>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmList;