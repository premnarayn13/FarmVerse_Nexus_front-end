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
      const [newId, setNewId]=useState(0);
      const setFarmId=()=>{
      generateFarmId().then(response=>{
       setNewId(response.data);
      })
    }

    useEffect(() => {
       setFarmId();
       setFlag(false);
    }, []);


    return(
        <div>

        </div>
    );
};

export default FarmEntry;
