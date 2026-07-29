import axios from "axios";

export const getExpectedYield=(id)=>{
      return axios.post(`${Y_URL}/${id}`, {
        withCredentials: true
   });
}