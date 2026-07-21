import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { addFarm,generateFarmId } from "../../Services/LoginService";

const FarmEntry = () => {


    
      const navigate = useNavigate();
    
      const [farmUser, setFarmUser] = useState({
        farmId: "",
        password: "",
        personalName: "",
        email: ""
      });
    



    return(
        <div>

        </div>
    );
};

export default FarmEntry;
