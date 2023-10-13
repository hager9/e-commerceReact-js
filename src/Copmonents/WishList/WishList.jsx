import React, { useState } from "react";
import { useContext } from "react";
import { wishListContext } from "../../Contexts/WishListContext";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { ColorRing } from 'react-loader-spinner';
import { CartContext } from "../../Contexts/CartContext";
import { Link } from "react-router-dom";



export default function WishList() {
    
    const {getLoggedUserWishlist, removeProductFromWishlist} = useContext(wishListContext);
    const { addToCart } = useContext(CartContext);
    const [wishlist, setWishlist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRemoving, setIsRemoving] = useState({});
    const [isAdding, setIsAdding] = useState({});
    const [isEmpty, setIsEmpty] = useState(false);
    

    
    async function getWishList() {
        setIsLoading(true);
        try {
            const res = await getLoggedUserWishlist();
            if (res.status === 'success') {
                setWishlist(res?.data);
                
                if (res.data.length === 0) {
                    setIsEmpty(true);
                } 
            }
        } catch (error) {
            return error;
        }
        setIsLoading(false);
    }

    async function removeWishlistProduct(id) {
        setIsRemoving(prevState => ({...prevState, [id]: true}));
        try {
            const res = await removeProductFromWishlist(id);
            if (res.status === 'success') {
                toast.success('Product removed successfully from your wishlist', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }})
                setIsRemoving(prevState => ({...prevState, [id]: false}));
                await getWishList();
            }
        } catch (error) {
            toast.error('error occured');
            setIsRemoving(prevState => ({...prevState, [id]: false}));
        }
    }

    async function addProductToCart(id) {
        setIsAdding(prevState => ({ ...prevState, [id]: true }));
        try {
            await addToCart(id);
            setIsAdding(prevState => ({ ...prevState, [id]: false }));
            toast.success('Product successfully added to your cart', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' } });
        } catch (error) {
            setIsAdding(prevState => ({ ...prevState, [id]: false }));
            toast.error("We can't add this product to your cart right now");
        }
    }

    

    useEffect(() => {
        getWishList();
    }, []);
    

    return <>

        <Helmet>
            <title>wishlist</title>
            <meta name="description" content="freshCart wishlist page" />
        </Helmet>
        
        {isLoading ? <Loading /> : <> {isEmpty ? <>
            <div className="my-5 text-center bg-light p-5 rounded">
            <h3 className="text-center fw-bold mb-3"> Your wishlist is empty</h3>
            <Link to={'/'} className="btn bg-main fw-bold text-white px-3 py-2">Continue shopping</Link>
            </div>
            </> :
            <>
            <h5 className="fw-bold">Wishlist</h5>
            <div className="row py-2 px-3">
                {wishlist?.map((item) => {
                    return <React.Fragment key={item.id}>
                        <div  className="col-md-3 text-center g-5">
                            <div className="item-content bg-main-light product">
                                <img className="w-50" src={item.imageCover} alt={item.title} />
                                <h3 className="h6 fw-bold mt-2">{ item.title.split(" ").slice(0,3).join(" ")}</h3>
                                <h6 className="text-main fw-bold m-0">Price : { item.price}</h6>
                                {isRemoving[item.id] ? <p className='p-0 m-0'> 
                                <ColorRing
  visible={true} 
  height="35"
  width="35"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/> 
                                </p> : <button onClick={()=> removeWishlistProduct(item.id)} className="border-0 bg-transparent text-danger"><i className="fas fa-trash-can"></i> Remove</button>}
{isAdding[item.id] ? <button type="button" className="btn bg-main fw-bold text-white btn-sm w-75 my-2">Adding...</button>
                                : <button onClick={() => addProductToCart(item.id)} className="btn bg-main fw-bold text-white btn-sm w-75 my-2">+ Add to cart</button>}
                            </div>
                    </div>
                    </React.Fragment>
                })}
            </div>
            </>
        }
            
        
        </>}
    </>
}