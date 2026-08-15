import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
import '../../DisplayView.css';
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import farmBg from "../../assets/farmbg.jpeg";

const RegisterUser=()=>{
 let navigate=useNavigate();
    const [errors,setErrors]=useState({});
    const [farmUser,setFarmUser]=useState({
         username:"",
         password: "",
         personalName:"",
         email:"",
        });
   const [flag,setFlag]=useState(false);
   const [confirmPassword,setConfirmPassword]=useState("");
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
   useEffect(() => {
       setFlag(false);
   }, []);

   const createNewUser = (event) => {
     event.preventDefault();
     if (farmUser.password === confirmPassword) {
       registerNewUser(farmUser)
         .then((response) => {
           setFlag(true);
         })
         .catch((error) => {
           console.error("Registration error:", error);
           alert("Registration failed: " + (error.response?.data || error.message));
         });
     }
   };

  const  onChangeHandler = (event) =>{
     event.persist();
     setFlag(false);
     const name = event.target.name;
         const value = event.target.value;
        setFarmUser(values =>({...values, [name]: value }));
    };

    const handleValidation = (event) => {
     event.preventDefault();
     let tempErrors = {};
     let isValid = true;
 
     if (!farmUser.username.trim()) {
       tempErrors.username = "User Name is required";
       isValid = false;
     }
 
     if (!farmUser.password.trim()) {
       tempErrors.password = "Password is required";
       isValid = false;
     }
     else if (farmUser.password.length < 5 || farmUser.password.length > 10) {
        tempErrors.password="Password must be 5-10 characters long";
       isValid = false;
     }
     else if (farmUser.password!==confirmPassword) {
       tempErrors.password="Both the passwords are not matched";
      isValid = false;
    }
 
   if (!farmUser.personalName.trim()) {
         tempErrors.personalName = "Personal Name is required";
         isValid = false;
     }
 if (!farmUser.email.trim()) {
         tempErrors.email = "Email is required";
         isValid = false;
       }
       else if(!emailPattern.test(farmUser.email)){
         tempErrors.email = "Invalid Email Format";
         isValid = false;
       }
   
       if (!confirmPassword.trim()) {
         tempErrors.confirmPassword = "Confirm Password is required";
         isValid = false;
       }
 
    setErrors(tempErrors);
     if (isValid) {
         createNewUser(event);
     }
   };

   const returnBack=()=>{
   navigate('/');
  }
  return (

<div
style={{
minHeight:"100vh",
backgroundImage:`url(${farmBg})`,
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<div
style={{
position:"absolute",
inset:0,
background:"rgba(0,70,20,.55)"
}}
></div>

<Card
style={{
width:"500px",
zIndex:2,
borderRadius:"25px",
background:"rgba(255,255,255,.18)",
backdropFilter:"blur(18px)",
border:"none",
boxShadow:"0 20px 50px rgba(0,0,0,.25)"
}}
>

<Card.Body className="p-5">

<div className="text-center mb-4">

<i
className="bi bi-tree-fill"
style={{
fontSize:"55px",
color:"#9be15d"
}}
></i>

<h2
className="fw-bold text-white mt-2"
>
Create Account
</h2>

<p className="text-white">
Join FarmVerse
</p>

</div>

<Form>

<Form.Group className="mb-3">

<Form.Label className="text-white">
Username
</Form.Label>

<Form.Control
placeholder="Enter Username"
name="username"
value={farmUser.username}
onChange={onChangeHandler}
/>

{errors.username &&
<p style={{color:"#ffb3b3"}}>
{errors.username}
</p>
}

</Form.Group>

<Form.Group className="mb-3">

<Form.Label className="text-white">
Password
</Form.Label>

<Form.Control
type="password"
name="password"
value={farmUser.password}
onChange={onChangeHandler}
/>

{errors.password &&
<p style={{color:"#ffb3b3"}}>
{errors.password}
</p>
}

</Form.Group>

<Form.Group className="mb-3">

<Form.Label className="text-white">
Confirm Password
</Form.Label>

<Form.Control
type="password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

{errors.confirmPassword &&
<p style={{color:"#ffb3b3"}}>
{errors.confirmPassword}
</p>
}

</Form.Group>

<Form.Group className="mb-3">

<Form.Label className="text-white">
Full Name
</Form.Label>

<Form.Control
placeholder="Enter Name"
name="personalName"
value={farmUser.personalName}
onChange={onChangeHandler}
/>

{errors.personalName &&
<p style={{color:"#ffb3b3"}}>
{errors.personalName}
</p>
}

</Form.Group>

<Form.Group className="mb-4">

<Form.Label className="text-white">
Email
</Form.Label>

<Form.Control
placeholder="Enter Email"
name="email"
value={farmUser.email}
onChange={onChangeHandler}
/>

{errors.email &&
<p style={{color:"#ffb3b3"}}>
{errors.email}
</p>
}

</Form.Group>

<div className="d-grid">

<Button
variant="success"
size="lg"
onClick={handleValidation}
>

Create Account

</Button>

</div>

{flag &&

<div className="text-center mt-4">

<p style={{color:"#b7ffb7"}}>

Registration Successful

</p>

<Button
variant="outline-light"
onClick={returnBack}
>

Go To Login

</Button>

</div>

}

</Form>

</Card.Body>

</Card>

</div>

);
 
};
export default RegisterUser;