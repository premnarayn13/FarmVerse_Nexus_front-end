import axios from "axios";
const CIN_URL = "http://localhost:8080/farmverse/crop-input";
const CER_ID = "http://localhost:8080/farmverse/crop-exp";

export const addCropInputs = (farmCropInputs) => {
  return axios.post(CIN_URL, farmCropInputs, {
    withCredentials: true,
  });
};

export const getCropInputsById = (id) => {
  return axios.get(`${CIN_URL}/${id}`, {
    withCredentials: true,
  });
};

export const deleteCropInputsById = (id) => {
  return axios.delete(`${CIN_URL}/${id}`, {
    withCredentials: true,
  });
};

export const getCropExpenseById = (id) => {
    return axios.get(`${CER_ID}/${id}`, {
        withCredentials: true,
    });
};

