import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slider1 from '../../Assets/images/kelly-sikkema-1Pgq9ZpIatI-unsplash.jpg';
import slider2 from '../../Assets/images/malvestida-u79wy47kvVs-unsplash.jpg';
import blog1 from '../../Assets/images/brooke-lark-W1B2LpQOBxA-unsplash.jpg';
import blog2 from '../../Assets/images/anete-lusina-zwsHjakE_iI-unsplash.jpg';

export default function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed:2000,
        slidesToScroll: 1,
        arrows: false
      };
    return <>
        <div className="container my-3">
        <div className="row g-0 justify-content-center">
            <div className="col-md-3">
            <Slider {...settings}>
            <img src={slider1} alt="main slider backpack image" className="w-100"/>
            <img src={slider2} alt="main slider baby seat image" className="w-100"/>
        </Slider>
            </div>
            <div className="col-md-3 mt-md-0 mt-4">
                <img src={blog1} alt="main slider bags image" className="w-100 heigth"/>
                <img src={blog2} alt="main slider guitar image" className="w-100 heigth"/>
            </div>
        </div>
        </div>
        
    
    </>
}