import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";
import useNetwork from "../../Hooks/useNetwork";


export default function Layout() {
    const { setUserToken } = useContext(userContext);

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setUserToken(localStorage.getItem('userToken'));
        }
        
    }, [])

   
   
    const network = useNetwork(); 

    return <>
        
        <Navbar/>
        <div className="container my-5 py-5 min-vh-100">
        <Outlet/>
       </div>
      
        <div>{network}</div>
      
        <Footer/>
    
    </>
}