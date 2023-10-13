import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
    const [brandDetails, setBrandDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState({});
  const [search, setSearch] = useState('');
    
    async function getBrands() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    const { data, isLoading } = useQuery('getBrands', getBrands);

    async function getSpecificBrand(id) {
      setLoadingBrands(prevLoadingBrands => ({...prevLoadingBrands, [id]: true}));
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrandDetails(res?.data.data);
      setLoadingBrands(prevLoadingBrands => ({...prevLoadingBrands, [id]: false}));
      setShowModal(true); 
    }

    
  return <>
      
      <Helmet>
            <title>brands</title>
            <meta name="description" content="freshCart wishlist page" />
        </Helmet>
    
        {isLoading ? <Loading /> : <>
      <div className="row">
      <div className="container mt-4 mb-5">
                <input className="form-control w-75 mx-auto" placeholder="Search...." onChange={(e)=> setSearch(e.target.value)} />
                </div>
                {data?.data.data.filter((brand)=>{return search.toLowerCase() === '' ? brand : brand.name.toLowerCase().includes(search.toLowerCase())}).map((brand) => {
                  return <React.Fragment key={brand._id}>
                        <div onClick={()=> getSpecificBrand(brand._id)}  className="col-md-3 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div className="brand cursor-pointer position-relative border m-3 rounded">
                                <div className="brand-layer position-absolute top-0 w-100 rounded-top-1"></div>
                                <img className="w-100 py-2" src={brand.image} alt={brand.name}></img>
                                <p className="text-center" >{brand.name}</p>
                            </div>
                        </div>

                        
                    </React.Fragment>
                })}
        </div>
        {showModal && loadingBrands[brandDetails?._id]? <Loading /> : <>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body p-0 px-5">
      <div className="brand cursor-pointer position-relative rounded">
                                <div className="brand-layer position-absolute top-0 w-100 rounded-top-1"></div>
                                <img className="w-50 mx-auto d-block py-2" src={brandDetails?.image} alt={brandDetails?.name}></img>
                                <p className="text-center m-0" >{brandDetails?.name}</p>
                            </div>
      </div>
      <div className="modal-footer border-0">
        <button type="button" className="btn bg-main text-white" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                        </>}
    </>}
        
    </>
}
