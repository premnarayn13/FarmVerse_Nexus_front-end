import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,} from 'react-router-dom';
import {getExpectedYield} from  "../../Services/AIService";
import '../../DisplayView.css';

let navigate=useNavigate();
    let param=useParams();
    const [farmCrop,setFarmCrop]=useState({
        farmId:0,
        farmName:"",
         soil:"",
        cropId:"",
        cropName:"",
        cropArea:0.0,
        sownMonthYear:"",
        harvestMonthYear:"",
        yield:0.0,
        comments:""
    });

    const setFarmCropData=()=>{
    getExpectedYield(param.cid).then(response=>{
      setFarmCrop(response.data);
  });
  }
 
  useEffect(() => {
     setFarmCropData();
   }, []);
 
   const returnBack=()=>{
    navigate('/crop-list');  
 }

 return (
    <div className="text-center">
      <div>
        <h2 className="text-center">{farmCrop.cropId}'s Details</h2>
        <div className = "row">
          <table className = "table table-striped table-bordered">
            <tbody>
              <tr>
                <th> Crop Id:</th>
                <th>{farmCrop.cropId}</th>
              </tr>
              <tr>
                <th>Crop Name:</th>
                <th>{farmCrop.cropName}</th>
              </tr>
              <tr>
                <th>Farm Name:</th>
                <th>{farmCrop.farmName}</th>
             </tr>
             <tr>
               <th>Soil Type:</th>
               <th>{farmCrop.soil}</th>
             </tr>
             <tr>
               <th>Crop area:</th>
               <th>{farmCrop.cropArea}</th>
             </tr>
             <tr>
               <th>Sown Month:</th>
               <th>{farmCrop.sownMonthYear}</th>
             </tr>
             <tr>
               <th>Harvest Month:</th>
               <th>{farmCrop.harvestMonthYear}</th>
             </tr>
             <tr>
               <th>Yield/Acre:</th>
               <th>{farmCrop.yield}</th>
             </tr>
             <tr>
               <th>Comment:</th>
               <th>{farmCrop.comments}</th>
             </tr>
             
        </tbody>        
      </table>  
     <div>
         <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-danger">Return</button>
         </div>        
     </div>
     </div>
     </div>
     );