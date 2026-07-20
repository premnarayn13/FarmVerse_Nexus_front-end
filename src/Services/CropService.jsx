import axios from "axios";

const CROP_URL = "http://localhost:8080/farmverse/crop";
const ID_URL = "http://localhost:8080/farmverse/crop-id";

// Add Crop
export const addCrop = (crop) => {
    return axios.post(CROP_URL, crop, {
        withCredentials: true
    });
};

// Update Crop
export const updateCrop = (crop) => {
    return axios.put(CROP_URL, crop, {
        withCredentials: true
    });
};

// Get Crop By Id
export const getCropById = (id) => {
    return axios.get(`${CROP_URL}/${id}`, {
        withCredentials: true
    });
};

// Get All Crops (of logged-in user)
export const getCropsByUsername = () => {
    return axios.get(CROP_URL, {
        withCredentials: true
    });
};

// Delete Crop
export const deleteCropById = (id) => {
    return axios.delete(`${CROP_URL}/${id}`, {
        withCredentials: true
    });
};

// Generate Crop ID
export const generateCropId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
};