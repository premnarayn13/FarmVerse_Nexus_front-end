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

  
  return (
    
  );
};

export default CropEntry;