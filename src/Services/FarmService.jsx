

import axios from 'axios';

const FARM_URL='http://localhost:8000/farmverse/farm';
const ID_URL = 'http://localhost:8000/farmverse/farm-id';

// Add Farm
export const addFarm = (farm) => {
    return axios.post(FARM_URL, farm, {
        withCredentials: true
    });
};

// Update Farm
export const updateFarm = (farm) => {
    return axios.put(FARM_URL, farm, {
        withCredentials: true
    });
};

// Get Farm By Id
export const getFarmById = (id) => {
    return axios.get(${ID_URL}/${id}, {
        withCredentials: true
    });
};

// Get All Farms
export const getAllFarms = () => {
    return axios.get(FARM_URL, {
        withCredentials: true
    });
};

// Delete Farm
export const deleteFarm = (id) => {
    return axios.delete(${ID_URL}/${id}, {
        withCredentials: true
    });
};