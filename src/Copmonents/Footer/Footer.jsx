import React from "react";
import { Link } from "react-router-dom";
import partner1 from "../../Assets/images/Amazon_Pay_logo.svg.f1d7ed8012ba50041d47.png";
import partner2 from "../../Assets/images/American-Express-Color.338cd681a6afc75592a3.png";
import partner3 from "../../Assets/images/MasterCard_Logo.svg.cbdfb6078b7efff912d4.webp";
import partner4 from "../../Assets/images/paypal-784404_640.18d11fd717a05790fc1a.webp";
import delivery1 from "../../Assets/images/download.png";
import delivery2 from "../../Assets/images/Google_Play_Store_badge_EN.svg.eb8bd3bc1f11fd061057.png";


export default function Footer() {
    
    return <>
    
    <footer className="bg-main-light py-5">
            <div className="container">
                <h4 className="fw-bold">Get the Frech Cart App</h4>
                <p>We will send you a link, ioen it on your phone to download the app.</p>
                <div className="d-flex">
                    <div className="col-sm-10">
                        <input type="email" className="form-control py-2" placeholder="Email..." />
                    </div>
                    <div className="col-sm-2 ps-3">
                        <Link target="blank" to={'/login'} className="btn w-100 bg-main text-white">Share App Link</Link>
                    </div>
                </div>
                <div className="line border-bottom border-2 my-4">
                </div>
                <div className="line border-bottom border-2 my-4 d-flex justify-content-between align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 align-items-center">
                                <p className="d-inline-block">Payment partners</p>
                                <img className="ms-3" src={partner1} style={{width:'60px', height: '20px'}} alt="amazom pay image"></img>
                                <img className="ms-3" src={partner2} style={{width:'60px', height: '30px'}} alt="american epress pay image"></img>
                                <img className="ms-3" src={partner3} style={{width:'60px', height: '30px'}} alt="master card pay image"></img>
                                <img className="ms-3" src={partner4} style={{width:'60px', height: '30px'}} alt="pay pal pay image"></img>
                            </div>
                            <div className="col-md-6">
                                <p className="d-inline-block">Get deliveries with freshCart</p>
                                <img className="mx-3" src={delivery1} style={{width:'100px', height: '30px'}} alt="app store image"></img>
                                <img src={delivery2} style={{width:'100px', height: '30px'}} alt="google play image"></img>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}