import React, {  useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ColorRing } from 'react-loader-spinner';



export default function Cart() {
    
    const {totalCartPrice,cartProducts,numOfCartItems,clearCart , removeCartItem , updateProductQuantity} = useContext(CartContext);
    const [isRemoving, setIsRemoving] = useState({});
    const [isClearing, setIsClearing] = useState(false);
    const [isUpdating, setIsUpdating] = useState({});

    async function removeItem(id) {
        setIsRemoving(prevState => ({...prevState, [id]: true}));
        const res = await removeCartItem(id);
        if (res.status === "success") {
            toast.success('Product successfully removed from your cart', { duration: 2000, style: { backgroundColor: '#198754', color: '#fff' }})
            setIsRemoving(prevState => ({...prevState, [id]: false}));
        } else {
            toast.error("Error Occured");
            setIsRemoving(prevState => ({...prevState, [id]: false}));
        }
    }
    
    async function updateCount(id, count, index) {
        setIsUpdating(prevState => ({...prevState, [id]: true}));
        await updateProductQuantity(id, count,index );
        setIsUpdating(prevState => ({...prevState, [id]: false }));
    }


    async function clearUserCart() {
        setIsClearing(true);
        await clearCart();
        setIsClearing(false);
        
    }
  

    return <>

        <Helmet>
                <title>cart</title>
                <meta name="description" content="freshCart cart page" />
            </Helmet>
        
          { cartProducts === null?  <>
            <div className="container bg-light rounded p-5 my-5 text-center">
            <p className="fw-bold fs-3"> Your cart is empty!</p>
            <Link to={'/'} className="btn myBtn fw-bold px-3 py-2">Continue shopping</Link>
            </div>
        </> : 
         <>  <div className="container bg-light rounded p-5 my-3 ">
            <div className="d-sm-flex justify-content-between align-items-center pb-3">
                    <h3 className="fw-bold">Shop Cart :</h3>
                    {isClearing? <ColorRing
  visible={true}
  height="40"
  width="40"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/> : <button onClick={clearUserCart} className="border-main fs-5 width-fit py-2 px-3 rounded">Clear Your Cart</button>}
                    
        
            </div>
            <div className="d-md-flex justify-content-between align-items-center pt-3 pb-5">
            <h4 className="h6 fw-bold">Total Cart Price : <span className="text-main">{ totalCartPrice } EGP</span> </h4>
            <h4 className="h6 fw-bold">Number Of Cart Items : <span className="text-main">{ numOfCartItems}</span> </h4>
            </div>
            
            {cartProducts?.map((product, index) => <div key={product.product.id} className="row d-flex align-items-center border-bottom py-2 px-3">
                    <div className="col-md-2">
                        <img className="w-100" src={product.product.imageCover} alt={product.product.title} />
                    </div>
                    <div className="col-md-10">
                        <div className="d-sm-flex justify-content-between align-items-center my-2">
                            <div>
                                <h3 className="h6 fw-bold">{ product.product.title.split(" ").slice(0,3).join(" ")}</h3>
                                <h6 className="text-main fw-bold">Price : { product.price}</h6>
                            </div>
                        <div>
                            {isUpdating[product.product.id]? <button className="bg-transparent p-1 border-main rounded"><i className="fas fa-spinner fa-spin "></i></button> : <button onClick={()=>updateCount(product.product.id,product.count + 1, index)} className="bg-transparent p-1 border-main rounded">+</button>}
                                
                            <span className="fw-bold mx-2">{product.count}</span>
                            {isUpdating[product.product.id]? <button className="bg-transparent p-1 border-main rounded"><i className="fas fa-spinner fa-spin "></i></button> : <button onClick={()=>updateCount(product.product.id,product.count - 1, index)} className="bg-transparent p-1 border-main rounded">-</button>}
                            
                            </div>
                    </div>
                    {isRemoving[product.product.id] ? <ColorRing
  visible={true} 
  height="35"
  width="35"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
                                : <button onClick={()=>removeItem(product.product.id)} className="btn text-danger"><i className="fas fa-trash-can"></i> Remove</button>}
                    
                    </div>
                </div>
            )}
                
                <div className="mt-4 mb-3">
                <Link className="btn myBtn py-2 px-3 fw-bolder text-white mx-2" to={'/cash-payment'}>Cash Payment</Link>
                
                
                <Link className="btn myBtn py-2 px-3 fw-bolder text-white mx-2 my-md-0 my-3" to={'/online-payment'}>Online Payment</Link>
                </div>
            
        </div>
        
            
        </>}
    </>
}