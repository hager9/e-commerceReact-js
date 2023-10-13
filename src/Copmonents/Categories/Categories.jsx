import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Categories() {

    const [search, setSearch] = useState('')

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    };
    const { data , isLoading } = useQuery('categorySlider', getCategories);

    
    return <>
        <Helmet>
                <title>categories</title>
                <meta name="description" content="freshCart categories page" />
        </Helmet>

        {isLoading ? <Loading /> : <div className="row my-4 categories">
            <div className="container mt-4 mb-5">
                <input onChange={(e)=>setSearch(e.target.value)} className="form-control w-75 mx-auto" placeholder="Search...." />
            </div>
                {data?.data.data.filter((category)=>{return search.toLowerCase() === '' ? category : category.name.toLowerCase().includes(search.toLowerCase())}).map((category) => { return <React.Fragment key={category._id}>
                    <div  className="col-md-3 my-3 cursor-pointer">
                        <Link to={`/categories/${category._id}`}>
                            <div className="item border">
                                <div className="img position-relative">
                                    <img style={{objectFit: "cover", height: "300px"}} className="w-100" src={category.image} alt={category.name} /> 
                                    <div className="layer position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                                        <p className="btn bg-main text-white fw-bold">Category details</p>
                                    </div>
                                </div>
                            <h5 className="text-center text-main fw-bold p-3">{ category.name}</h5>
                            </div>
                        </Link>
                
                    </div>
            </React.Fragment>
        })}
        </div>}
        
     
        
    </>
}