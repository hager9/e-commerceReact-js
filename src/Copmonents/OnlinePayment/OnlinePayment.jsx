import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Contexts/CartContext";
import * as Yup from 'yup';
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";


export default function OnlinePayment() {

    let {setCartProducts,setTotalCartPrice,setNumOfCartItems, cartId } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    async function onlinePayment(cartId, url, values) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
                shippingAddress: values
            },
                {
                    headers:{ token : localStorage.getItem("userToken")}
                });
            return data;
        } catch (error) {
            return error;
        }
    }

    let validationSchema = Yup.object({
        details: Yup.string().min(3,"minLength is 3 letters").required("details is required"),
        phone: Yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'phone is invalid').required("phone is required"),
        city: Yup.string().required('city is required').matches(/^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/, 'city name is invalid')
    });
    
    async function addressSubmit(values) {
        setIsLoading(true);
        let response = await onlinePayment(cartId, 'https://hager9.github.io', values);
        if (response.status === 'success') {
            setIsLoading(false);
            window.location.href = response.session.url;
            setCartProducts(null);
            setTotalCartPrice(0);
            setNumOfCartItems(0);
        } else {
            toast.error('Error Occured');
        }
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        }, validationSchema,
        onSubmit: addressSubmit
    });
    

    return <>
        <Helmet>
                <title>checkout</title>
                <meta name="description" content="freshCart checkout page" />
        </Helmet>
        {isLoading ? <Loading/> :   <form onSubmit={formik.handleSubmit}>
            
            <label htmlFor="details" className=" mt-2">details : </label>
            <input name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" type="text" className="form-control"></input>
            {formik.errors.details && formik.touched.details ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.details }</div> : ''}
            
            <label htmlFor="phone" className=" mt-2">phone : </label>
                    <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" type="tel" className="form-control"></input>
                    {formik.errors.phone && formik.touched.phone ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.phone }</div> : ''}
    
            
            <label htmlFor="city" className=" mt-2">city : </label>
            <input name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="city" type="text" className="form-control"></input>
            {formik.errors.city && formik.touched.city ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.city }</div> : ''}
            <div className="d-flex justify-content-between align-items-center my-3">
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn myBtn fw-bold px-3 py-2">Pay Now</button>
            </div>
            
        </form>}
       
       
    </>
}