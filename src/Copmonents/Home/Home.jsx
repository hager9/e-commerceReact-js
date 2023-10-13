import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";


export default function Home() {
    
    return <>
          <Helmet>
                <title>home</title>
                <meta name="description" content="freshCart home page" />
        </Helmet>
        <div className="container">
        <MainSlider/>
        <CategorySlider />
        <FeaturedProducts />
        </div>
        
    </>
}