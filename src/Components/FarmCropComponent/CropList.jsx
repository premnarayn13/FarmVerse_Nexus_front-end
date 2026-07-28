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
    
  );
};

export default CropList;
