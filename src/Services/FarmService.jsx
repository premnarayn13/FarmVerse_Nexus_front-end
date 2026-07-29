import axios from "axios";

const FARM_URL = "http://localhost:8080/farmverse/farm";
const ID_URL = "http://localhost:8080/farmverse/farm-id";
const FARM_NO_URL = "http://localhost:8080/farmverse/farm-no";

export const addFarm = (farm) => {
    return axios.post(FARM_URL, farm, {
        withCredentials: true,
    });
};

export const updateFarm = (farm) => {
    return axios.put(FARM_URL, farm, {
        withCredentials: true,
    });
};

export const getFarmById = (id) => {
    return axios.get(`${FARM_URL}/${id}`, {
        withCredentials: true,
    });
};

export const getFarmsByUsername = () => {
    return axios.get(FARM_URL, {
        withCredentials: true,
    });
};

export const deleteFarmById = (id) => {
    return axios.delete(`${FARM_URL}/${id}`, {
        withCredentials: true,
    });
};

export const generateFarmId = () => {
    return axios.get(ID_URL, {
        withCredentials: true,
    });
};

export const getAllFarmsIdsByUser = () => {
    return axios.get(FARM_NO_URL, {
        withCredentials: true,
    });
};