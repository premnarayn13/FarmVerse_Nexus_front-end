import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import '../../DisplayView.css';

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
        <div>
        <div className = ".container">
        <div className = "row">
            <div className = "card col-md-2 offset-md-3 offset-md-3">
            <div className = "login-box">
                <h2 className="text-center"><u>User Login Page</u></h2>
                <form>
                    <div className = "form-group">
                        <label>User Name: </label>
                        <input placeholder="username" name="username" className="form-control" value={loginData.username} onChange={onChangeHandler} />
                        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                    </div>
                    <div className = "form-group">
                        <label>Password: </label>
                        <input type="password"   name="password" className="form-control" value={loginData.password} onChange={onChangeHandler}/>
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                    </div>
                    <br/>
                    <button className='btn btn-primary' onClick={handleValidation}>Submit</button>
                </form>
                <br/>
                <div>
                    {!flag && <p style={{ color: "red" }}>Invalid User Id or Password</p>}
                </div>
                <div>
                <h2 size="5" color='yellow'/>
                <br/>
                <button className='btn btn-info' onClick={(e) => registerNewUser(e)}>Register New User</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    )
 
};
export default LoginPage;