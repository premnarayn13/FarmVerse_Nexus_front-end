import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername, deleteFarmById } from "../../Services/FarmService";
import "../../DisplayView.css";

const FarmList = () => {
    let navigate = useNavigate();
    const [farms, setFarms] = useState([]);
    const [username, setUsername] = useState("");

    const setFarmData = () => {
        getFarmsByUsername()
            .then((response) => {
                setFarms(response.data);
            })
            .catch((error) => {
                alert("Error Ocurred while loading data:" + error);
            });
    };

    useEffect(() => {
        setFarmData();
    }, []);

    const removeFarm = (id) => {
        deleteFarmById(id).then((res) => {
            let remainFarms = farms.filter((farm) => farm.farmId !== id);
            setFarms(remainFarms);
        });
        navigate("/farm-list");
    };

    const returnBack = () => {
        navigate("/farmer-menu");
    };

    return (
    

  );
};

export default FarmList;
