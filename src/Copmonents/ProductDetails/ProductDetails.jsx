import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Contexts/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { wishListContext } from "../../Contexts/WishListContext";
import { ColorRing } from 'react-loader-spinner';

export default function ProductDetails() {

    const [isAdding, setIsAdding] = useState(false);
    let params = useParams();
    const { addToWishList, addedToWishlist } = useContext(wishListContext);
    const [addingToWishlist, setAddingToWishlist] = useState({});

    async function addproductToWish(id) {
        setAddingToWishlist(prevState => ({...prevState, [id]: true}));
        try {
            await addToWishList(id);
            toast.success('Product successfully added to your wishlist', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }})
        } catch (error) {
            toast.error('error occured');
        }
        setAddingToWishlist(prevState => ({...prevState, [id]: false}));
    }
    
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    };

    let { data, isLoading } = useQuery('productDetails', () => getProductDetails(params.id));

    let { addToCart } = useContext(CartContext);

    async function addProductToCart(id) {
        setIsAdding(true);
        let response = await addToCart(id);
        if (response.status === 'success') {
            toast.success('Product successfully added to your cart', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }});
        } else {
            toast.error("We can't add this product to your cart right now");
        }
        setIsAdding(false);
    }

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return <>
        {isLoading ? <Loading /> : <>
        {data?.data.data ? <div className="row py-2 align-items-center">
         <Helmet>
                 <title>{data?.data.data.title }</title>
                 <meta name="description" content={data?.data.data.description} />
             </Helmet>
                <div className="col-md-4">
             <Slider {...settings}>
                     {data?.data.data.images.map((img) => <img key={data?.data.data.id} src={ img } alt={data?.data.data.title} className="w-100" />)}
         </Slider>
             </div>
             <div className="col-md-8">
                    <div className="item py-2">
                    <h2 className="h5 fw-bold">{data?.data.data.title }</h2>
                 <p className=" fw- px-2 py-3">{data?.data.data.description}</p>
                 <h6 className="text-main">{data?.data.data.category.name}</h6>
                 <h6 className="text-main fw-bold">Price: { data?.data.data.price} EGP</h6>
                 <div className="d-flex justify-content-between my-3">
                     <span>Ratings Quantity: { data?.data.data.ratingsQuantity}</span>
                     <span><i className="fas fa-star rating-color"></i> { data?.data.data.ratingsAverage}</span>
                        </div>
                        
                 <div className="d-flex justify-content-evenly align-items-center">
                            {isAdding? <button type="button" className="btn bg-main fw-bold text-white w-75 mt-2">Adding...</button>
                                : <button onClick={() => addProductToCart(data?.data.data._id)} className="btn bg-main fw-bold text-white w-75 mt-2">+ Add to cart</button>}
                                {addingToWishlist[data?.data.data._id]? <ColorRing
  visible={true} 
  height="35"
  width="35"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/> : <span className="cursor-pointer" onClick={() => addproductToWish(data?.data.data._id)}>{ addedToWishlist.includes(data?.data.data._id) ? <i className={'fas fa-heart text-danger fs-3'}></i> : <i className={'fas fa-heart text-dark fs-3'}></i>}</span>}
                                
                            </div>
                 </div>
             </div>
         </div> : ''}
        </>
         
        }
       
        
        
    </>
}