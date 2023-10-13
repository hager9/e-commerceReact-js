import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function CategorySlider() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    };
    const { data , isLoading } = useQuery('categorySlider', getCategories);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed:3000,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992, 
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 400, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
       
      };
    return <>
        {isLoading ? <Loading /> : <>
        {data?.data.data ? <div className="my-5">
            <Slider {...settings}>
                {data?.data.data.map((category) => <div key={category._id}>
                    <img src={category.image} alt={category.name} className="w-100" style={{objectFit: "cover", height: "200px"}}  />
                    <p className="fw-bold fs-6 px-2">{category.name}</p></div>)}
        </Slider>
        </div> : ''}
        </>}
        
      
          
        
    </>
}