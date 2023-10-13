import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function SubCategories() {
    
    let params = useParams();

    async function getSubCategory(id) {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    };

    let { data, isLoading } = useQuery('getSubCategory', () => getSubCategory(params.id));
    return <>
        {isLoading ? <Loading /> : <>
        <div className="row py-5 px-lg-5 px-3 my-5 mx-lg-5 mx-2">
        <h5 className="fw-bold mb-4">Sub categories: </h5>
                {data?.data.data.map((subCategory) => {
                    return <React.Fragment key={subCategory._id}>
                        <Helmet>
                <title>{ subCategory.name}</title>
                <meta name="description" content="freshCart login page" />
            </Helmet>
                        <div className="col-md-6">
                            <div className="item">
                            <p className="subCat px-2 py-3 rounded text-white fw-bold ">{ subCategory.name}</p>
                        </div>
                        
                        </div>
                    </React.Fragment>
            })}
            </div>
        </>}
        
        
        
    </>
}