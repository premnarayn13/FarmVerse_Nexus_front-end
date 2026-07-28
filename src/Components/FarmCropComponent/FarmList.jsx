import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername, deleteFarmById } from "../../Services/FarmService";
import "../../DisplayView.css";

const FarmList = () => {
    let navigate = useNavigate();
    const [farms, setFarms] = useState([]);
    const [username, setUsername] = useState("");

    const setFarmData = () => {
        getFarmsByUsername()
            .then((response) => {
                setFarms(response.data);
            })
            .catch((error) => {
                alert("Error Ocurred while loading data:" + error);
            });
    };

    useEffect(() => {
        setFarmData();
    }, []);

    const removeFarm = (id) => {
        deleteFarmById(id).then((res) => {
            let remainFarms = farms.filter((farm) => farm.farmId !== id);
            setFarms(remainFarms);
        });
        navigate("/farm-list");
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
                                    <th> Farm Id</th>
                                    <th> Farm Name</th>
                                    <th> Farm Area</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farms.map((farm, index) => (
                                    <tr key={farm.farmId}>
                                        <td> {farm.farmId} </td>
                                        <td> {farm.farmName} </td>
                                        <td> {farm.area} </td>

                                        <td>
                                            <button
                                                style={{ marginLeft: "10px" }}
                                                onClick={() => removeFarm(farm.farmId)}
                                                className="btn btn-danger"
                                            >
                                                Delete Farm
                                            </button>
                                        </td>
                                    </tr>
                                ))}
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
