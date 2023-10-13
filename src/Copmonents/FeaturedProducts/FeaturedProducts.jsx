import React, { useState , useContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import toast from 'react-hot-toast';
import Loading from "../Loading/Loading";
import { wishListContext } from "../../Contexts/WishListContext";
import { ColorRing } from 'react-loader-spinner';

export default function FeaturedProducts() {

    const [isAdding, setIsAdding] = useState({});
    const { addToWishList, addedToWishlist,getLoggedUserWishlist } = useContext(wishListContext);
    const { addToCart } = useContext(CartContext);
    const [addingToWishlist, setAddingToWishlist] = useState({});
    const [search, setSearch] = useState('');

    async function addproductToWish(id) {
        setAddingToWishlist(prevState => ({...prevState, [id]: true}));
        try {
            await addToWishList(id);
            toast.success('Product successfully added to your wishlist', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }})
        } 
        catch (error) {
            toast.error('error occured');
        }
        setAddingToWishlist(prevState => ({...prevState, [id]: false}));
    }
    
    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let { isLoading, data } = useQuery("featuredProducts", getFeaturedProducts);

    

    async function addProductToCart(id) {
        setIsAdding(prevState => ({ ...prevState, [id]: true }));
        try {
            await addToCart(id);
            setIsAdding(prevState => ({ ...prevState, [id]: false }));
            toast.success('Product successfully added to your cart', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }});

        } catch (error) {
            setIsAdding(prevState => ({ ...prevState, [id]: false }));
            toast.error("We can't add this product to your cart right now");
        }
    }

    useEffect(() => {
        getLoggedUserWishlist();
    }, []);

    return <>
        {isLoading ? <Loading/> : <div className="container py-2">
            <div className="row">
                <div className="container mt-4 mb-5">
                <input className="form-control w-75 mx-auto" placeholder="Search...." onChange={(e)=> setSearch(e.target.value)} />
                </div>
                {data?.data.data.filter((product) => { return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search.toLowerCase()) || product.brand.name.toLowerCase().includes(search.toLowerCase()) || product.category.name.toLowerCase().includes(search.toLowerCase()) })
                    .map((product) => 
                    <div key={product.id} className="col-lg-3 col-md-6 cursor-pointer">
                        
                        <div className="product py-3 px-2">
                        <Link to={`/productdetails/${product.id}`}>
                                <img className="w-100" src={product.imageCover} alt={product.title} />
                                    <div className="px-3 pt-2">
                                    <span className="text-main fw-bold font-sm">{ product.category.name }</span>
                                <h3 className="h6">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                    </div>
                            <div className="d-flex justify-content-between px-3">
                                <span>{ product.price } EGP</span>
                                <span><i className="fas fa-star rating-color"></i> {product.ratingsAverage }</span>
                                
                            </div>
                            
                            </Link>
                            <div className="d-flex justify-content-center align-items-center">
                            {isAdding[product.id] ? <button type="button" className="btn bg-main fw-bold text-white btn-sm w-100  mx-3 mt-3">Adding...</button>
                                    : <button onClick={() => addProductToCart(product.id)} className="btn bg-main fw-bold text-white btn-sm w-100 mx-3 mt-3">+ Add to cart</button>}
                                {addingToWishlist[product.id]? <ColorRing
  visible={true} 
  height="35"
  width="35"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/> : <span onClick={() => addproductToWish(product.id)}>{ addedToWishlist.includes(product.id) ? <i className={'fas fa-heart text-danger fs-3'}></i> : <i className={'fas fa-heart text-dark fs-3'}></i>}</span>}
                              
                            </div>
                            
                            
                            </div>
                            
                    </div>
                )}
            </div>
        </div>}
        
    </>
}