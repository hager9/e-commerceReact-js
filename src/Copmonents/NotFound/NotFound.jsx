import React from "react";
import errorImg from '../../Assets/images/error.svg'
export default function NotFound() {
    
    return <>
        <div className="d-flex justify-content-center align-items-center py-5">
            <img className="w-50" src={errorImg} alt="error 404" />
    </div>
        
    </>
}