import axios from "axios";


const Y_URL = "http://localhost:8080/farmverse/yield";

export const getExpectedYield=(id)=>{
      return axios.post(`${Y_URL}/${id}`, null, {
        withCredentials: true
   });
}