import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCropsByUsername, deleteCropById } from "../../Services/CropService";
import cropBg from "../../assets/images/crop-bg.jpg";
import "../../DisplayView.css";


const CropList = () => {
    const navigate = useNavigate();

    const [crops, setCrops] = useState([]);

    const setCropData = () => {
        getCropsByUsername()
            .then((response) => {
                setCrops(response.data);
            })
            .catch((error) => {
                alert("Error occurred while loading data");
                console.log(error);
            });
    };

    useEffect(() => {
        setCropData();
    }, []);

    const removeCrop = (id) => {
        if (window.confirm("Are you sure you want to delete this crop?")) {
            deleteCropById(id).then(() => {
                setCrops(crops.filter((crop) => crop.cropId !== id));
            });
        }
    };

    const returnBack = () => {
        navigate("/farmer-menu");
    };

    return (
        <div
        //   className="crop-page"
        //   style={{
        //     backgroundImage: `url(${cropBg})`,
        //     minHeight: "100vh",
        //     minWidth: "100%",
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        //   }}
        >
            <div className="container">
                <div
                    className="card shadow-lg border-0 rounded-0-4"
                    style={{ width: "80%", height: "auto" }}
                >
                    <div className="card-header bg-success text-white text-center">
                        <h3 className="mb-0" style={{ color: "white", fontWeight: "bold" }}>
                            <i className="bi bi-flower3 me-2"></i>
                            Crop List
                        </h3>
                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center align-middle">
                                <thead className="table-success">
                                    <tr>
                                        <th>Crop ID</th>
                                        <th>Farm ID</th>
                                        <th>Crop Name</th>
                                        <th>Crop Area</th>
                                        <th>Sown Month</th>
                                        <th>Harvest Month</th>
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
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeCrop(crop.cropId)}
                                                    >
                                                        <i className="bi bi-trash"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No Crops Available</td>
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
        </div>
    );
};

export default CropList;
