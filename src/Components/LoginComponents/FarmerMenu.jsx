import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {logoutUser} from '../../Services/LoginService';
import {useNavigate} from 'react-router-dom';


const FarmerMenu=()=>{

     let navigate=useNavigate();
    const handleLogout = () => {
      logoutUser()
        .then(() => {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/');
        })
    };


    return(
        <div className=".container">
        <br/>
                <div  align="center" style={{backgroundColor:'pink'}}>
                <h1 className = "text-center" style={{color:'magenta'}}><u><i>Farm Verse Farmer Menu</i></u></h1>
                </div>
                <Navbar expand="lg" bg="warning">
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <NavDropdown title="" id="collasible-nav-dropdown"><b>Farm</b>
                    <NavDropdown.Item href="">Farm Entry</NavDropdown.Item>
                    <NavDropdown.Item href="">Farm List</NavDropdown.Item>
                    <NavDropdown.Item href="">Crop Entry</NavDropdown.Item>
                    <NavDropdown.Item href="">Crop List</NavDropdown.Item>
                    </NavDropdown>
                    
                    <Nav.Link href=""><b></b></Nav.Link>
                    <Nav.Link onClick={handleLogout}><b>Logout</b></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

        )
 
};
export default FarmerMenu;


