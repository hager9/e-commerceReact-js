import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";


export default function AllOrders() {

    const [userOrders, setUserOrders] = useState(null);
    
    useEffect(() => {
        const res = jwtDecode(localStorage.getItem('userToken'));
        getUserOrders(res.id);
    }, [])
    

    async function getUserOrders(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            setUserOrders(data);
            
        } catch (error) {
            toast.error('error occured');
        }
        
    }

    if (userOrders === null) {
        return <Loading/>
    } 
    
    if (userOrders.length === 0) {
        return <div className="container p-5 width-fit shadow my-5 rounded text-center bg-main-light ">
            <h5 className="fw-bold mb-3">You haven't placed any order yet  </h5>
            <h5 className="fw-bold mb-3 text-main">Wanna check our website!</h5>
            <Link to={'/'} className="d-block text-white fw-bold width-fit py-2 px-3 mx-auto btn bg-main">shopping!</Link>
        </div>
    }

    return <>
        <Helmet>
                <title>Orders</title>
                <meta name="description" content="freshCart cart page" />
        </Helmet>
        
        <h4 className="fw-bold mb-4 ">All orders</h4>
        {userOrders.map((order, index) => {
            return <React.Fragment key={order.id}>
                <div className="row d-flex justify-content-between outter-bg shadow my-5 py-4">
                <h6 className="fw-bold fs-5">Order {index + 1}</h6>
                    <div className="col-md-6">
                        <div className="container">
                            <div className="row inner-bg py-3 rounded">
                            <h5 className="fw-bold h5 mb-3 text-white">Order items</h5>
                        {order.cartItems.map((item) => {
                            return <React.Fragment key={item.product._id}>
                                <div className="col-md-6 mb-3 text-dark">
                                    
                                    <div className="inner text-white text-center deep-inner-bg rounded py-2 mx-3">
                                        <img className="w-25 mb-2" src={item.product.imageCover} alt={ item.product.title} />
                                        <div className="text-center">
                                        <p className="fw-bold m-0">{ item.product.title.split(" ").slice(0,3).join(" ")}</p>
                                        <p className="m-0">{ item.product.brand.name}</p>
                                        <p className="fw-bold m-0">Price : { item.price} EGP</p>
                                        <p className="m-0">Quantity : { item.count}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </React.Fragment>
                        })}
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-dark">
                        <div className="inner-bg rounded text-white py-3 px-2 my-md-0 my-3">
                            <h5 className="fw-bold h5 mb-3 text-white">Order details</h5>
                            <p className="fw-bold ps-3">Name : <span className="fw-normal">{ order.user.name}</span></p>
                            <p className="fw-bold ps-3">email : <span className="fw-normal"> { order.user.email} </span> </p>
                            <p className="fw-bold ps-3">Phone : <span className="fw-normal">{ order.shippingAddress?.phone}</span></p>
                            <p className="fw-bold ps-3">City : <span className="fw-normal">{ order.shippingAddress?.city}</span></p>
                            <p className="fw-bolder ps-3">Total order price : <span className="fw-bold">{order.totalOrderPrice } EGP</span></p>
                            <p className="fw-bold ps-3">Payment method : <span className="fw-normal">{order.paymentMethodType }</span></p>
                        
                        </div>
                    </div>
            </div>
            </React.Fragment>
        })}
      
        
    </>
}