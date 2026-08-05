import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import '../../DisplayView.css';
import { Card, Form, Button } from "react-bootstrap";
import farmBg from "../../assets/farmbg.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";
 

const LoginPage=()=>{
 let navigate=useNavigate();
   const [errors,setErrors]=useState({});
   const [loginData,setLoginData]=useState({
      username :"",
      password:""
 });
 const [flag,setFlag]=useState(true);

 const validateLogin=(e)=>{
     e.preventDefault();
     validateUser(loginData.username,loginData.password).then((response)=>{
      let reply=String(response.data);
       if(reply==="True" || reply==="true")
          navigate("/farmer-menu");
        else
        setFlag(false);
     });
  }

  const  onChangeHandler = (event) =>{
     event.persist();
     setFlag(true);
     const name = event.target.name;
     const value = event.target.value;
     setLoginData(values =>({...values, [name]: value }));
 };

 const handleValidation = (event) => {
     event.preventDefault();
     let tempErrors = {};
     let isValid = true;
 
     if (!loginData.username.trim()) {
       tempErrors.username = "User Name is required";
       isValid = false;
     }
 
     if (!loginData.password.trim()) {
       tempErrors.password = "Password is required";
       isValid = false;
     }
 
     setErrors(tempErrors);
     if (isValid) {
       validateLogin(event);
     }
   };

   const registerNewUser=(e)=>{
     navigate('/register');
 }

  return(
      
<div
style={{
    minHeight: "100vh",
    backgroundImage: `url(${farmBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}}
>

<div
style={{
    position: "absolute",
    inset: 0,
    background: "rgba(0,60,20,0.55)"
}}
></div>

<Card
style={{
    width: "430px",
    zIndex: 2,
    borderRadius: "25px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 20px 50px rgba(0,0,0,.25)",
    border: "none",
    color: "white"
}}
>

<Card.Body className="p-5">

<div className="text-center mb-4">

<i
className="bi bi-tree-fill"
style={{
fontSize:"55px",
color:"#90ee90"
}}
></i>

<h2 className="fw-bold mt-3">
FarmVerse
</h2>

<p>
Agriculture Management System
</p>

</div>

<Form>

<Form.Group className="mb-3">

<Form.Label>
Username
</Form.Label>

<Form.Control
type="text"
name="username"
placeholder="Enter Username"
value={loginData.username}
onChange={onChangeHandler}
/>

{errors.username &&
<p style={{color:"#ffb3b3"}}>
{errors.username}
</p>
}

</Form.Group>

<Form.Group className="mb-3">

<Form.Label>
Password
</Form.Label>

<Form.Control
type="password"
name="password"
placeholder="Enter Password"
value={loginData.password}
onChange={onChangeHandler}
/>

{errors.password &&
<p style={{color:"#ffb3b3"}}>
{errors.password}
</p>
}

</Form.Group>

<div className="d-grid mt-4">

<Button
variant="success"
size="lg"
onClick={handleValidation}
>

Login

</Button>

</div>

{!flag &&
<p
className="text-center mt-3"
style={{color:"#ffaaaa"}}
>
Invalid Username or Password
</p>
}

<div className="text-center mt-4">

<Button
variant="outline-light"
onClick={registerNewUser}
>

Register New User

</Button>

</div>

</Form>

</Card.Body>

</Card>

</div>
);
    
 
};
export default LoginPage;