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