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
        <br/>
         <div className = "container">
          <div className = "row">
            <div className = "card col-md-2 offset-md-3 offset-md-3">
              <div className = "login-box">
                <h2 className="text-center">New Farm Entry</h2>
                 <br/>
                  <form>
                   <div className = "form-group">
                     <label>Farm Id: </label>
                     <input placeholder="Farm Id" name="farmId" className="form-control" value={newId} />
                   </div>
                   <div className = "form-group">
                    <label> Farm Name: </label>
                    <input placeholder="Farm Name" name="farmName" className="form-control" value={farm.farmName} onChange={onChangeHandler}/>
                     {errors.farmName && <p style={{ color: "red" }}>{errors.farmName}</p>}
                   </div>
                   
                   <div className = "form-group">
                    <label> Farm Area: </label>
                    <input placeholder="Farm Area" name="area" className="form-control" value={farm.area} onChange={onChangeHandler}/>
                     {errors.area && <p style={{ color: "red" }}>{errors.area}</p>}
                   </div>
                 
                    <div className = "form-group">
                       <button className="btn btn-success" onClick={handleValidation}>Save</button>
                       &nbsp;&nbsp;  
                       <button className="btn btn-secondary" onClick={clearAll}>Reset</button>
                       &nbsp;&nbsp;
                       <button className="btn btn-warning" onClick={returnBack}>Return Back</button>
                    </div>
                 </form>
                 <br/>
                 <div>
                   {flag && <p style={{ color: "blue" }}>New Farm Added </p>}
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
 
    );
};

export default FarmEntry;
