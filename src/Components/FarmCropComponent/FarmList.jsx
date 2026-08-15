import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername, deleteFarmById } from "../../Services/FarmService";
import "../../DisplayView.css";

const FarmList = () => {
    let navigate = useNavigate();
    const [farms, setFarms] = useState([]);

    const setFarmData = () => {
        getFarmsByUsername()
            .then((response) => {
                setFarms(response.data);
            })
            .catch((error) => {
                alert("Error occurred while loading data: " + error);
            });
    };

    useEffect(() => {
        setFarmData();
    }, []);

    const removeFarm = (id) => {
        if (window.confirm("Are you sure you want to delete this farm?")) {
            deleteFarmById(id)
                .then((res) => {
                    setFarms((prevFarms) => prevFarms.filter((farm) => farm.farmId !== id));
                })
                .catch((err) => {
                    console.error("Delete farm error:", err);
                    alert("Failed to delete farm.");
                });
        }
    };

    const returnBack = () => {
        navigate("/farmer-menu");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-success text-white text-center">
                    <h3 className="mb-0">
                        <i className="bi bi-flower3 me-2"></i>
                        Farm List
                    </h3>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center align-middle">
                            <thead className="table-success">
                                <tr>
                                    <th>Farm Id</th>
                                    <th>Farm Name</th>
                                    <th>Farm Area (Acres)</th>
                                    <th>Soil Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farms.length > 0 ? (
                                    farms.map((farm) => (
                                        <tr key={farm.farmId}>
                                            <td> {farm.farmId} </td>
                                            <td> {farm.farmName} </td>
                                            <td> {farm.area} </td>
                                            <td> {farm.soil || "N/A"} </td>

                                            <td>
                                                <button
                                                    onClick={() => removeFarm(farm.farmId)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Delete Farm
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
                    <div className="text-center mt-3">
                        <button className="btn btn-warning" onClick={returnBack}>
                            <i className="bi bi-arrow-left-circle me-2"></i>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmList;
