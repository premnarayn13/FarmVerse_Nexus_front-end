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

    if (!toString(crop.area).trim()) {
      tempErrors.area = "Crop area is required";
      isValid = false;
    }


  return (
    
  );
};

export default CropEntry;