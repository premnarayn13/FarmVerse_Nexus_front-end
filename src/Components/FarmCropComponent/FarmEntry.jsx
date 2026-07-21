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

    const  onChangeHandler = (event) =>{
    event.persist();
    setFlag(false);
    const name = event.target.name;
        const value = event.target.value;
       setFarm(values =>({...values, [name]: value }));
    };

   const saveFarm=(event)=>{
      event.preventDefault();
      farm.farmId=newId;
      addFarm(farm).then(response=>{
      setFlag(true);
      });
    };

    const clearAll=()=>{
    farm.farmName="";
    farm.area=0.0;
    }

    const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
       
    if (!toString(farm.farmName).trim()) {
        tempErrors.farmName = "Farm name is required";
        isValid = false;
    }
 
    if (!toString(farm.area).trim()) {
        tempErrors.area = "Farm area is required";
        isValid = false;
    }
       
    setErrors(tempErrors);
        if (isValid) {
        saveFarm(event);
    }
    };

    const returnBack=()=>{
        navigate('/farmer-menu');
    }

    return(
        <div>

        </div>
    );
};

export default FarmEntry;
