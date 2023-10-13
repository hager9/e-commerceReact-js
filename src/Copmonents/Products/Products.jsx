import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";


export default function Products() {
    
    return <>
         <Helmet>
                <title>products</title>
                <meta name="description" content="freshCart products page" />
            </Helmet>
        <FeaturedProducts/>
    </>
}