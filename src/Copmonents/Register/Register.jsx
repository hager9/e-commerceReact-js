import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots  } from 'react-loader-spinner';
import { Helmet } from "react-helmet";

export default function Register() {
    
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    let validationSchema = Yup.object({
        name: Yup.string().min(3, "name minlength is 3").max(15, "name maxlength is 15").required('name is required'),
        email: Yup.string().email("email pattern is invalid").required("email is required"),
        phone: Yup.string().matches(phoneRegex, "phone is invalid").required('phone is required'),
        password: Yup.string().matches(/^[A-Z][A-Za-z0-9]{5,8}/, "password should start with uppercase letter & only contain letters (A-Z or a-z) and numbers (0-9) & be between 6 and 9 characters in total.")
        .required('password is required')
        .min(6).max(9),
        rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword don't match the password").required('rePassword is required')
    })


    
    
    async function submitRegister(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            });
        if (data.message === 'success') {
            setIsLoading(false)
            navigate('/login')
        }
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword:''
        },validationSchema,
        onSubmit:submitRegister
    })

    return <>
         <Helmet>
                <title>register</title>
                <meta name="description" content="freshCart register page" />
            </Helmet>
        
        <div className="py-5 mx-auto">
            {error ? <div className="alert alert-danger">{ error }</div>: ''}
            <h1 className="fw-bold h3 mb-3">Register Now : </h1>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="name">name : </label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" type="text" className="form-control"></input>
                {formik.errors.name && formik.touched.name ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.name }</div> : ''}

                <label htmlFor="email" className=" mt-2">email : </label>
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" type="email" className="form-control"></input>
                {formik.errors.email && formik.touched.email ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.email }</div> : ''}

                <label htmlFor="password" className=" mt-2">password : </label>
                <input name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" type="password" className="form-control"></input>
                {formik.errors.password && formik.touched.password ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.password }</div> : ''}


                <label htmlFor="rePassword" className=" mt-2">rePassword : </label>
                <input name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" type="password" className="form-control"></input>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.rePassword }</div> : ''}


                <label htmlFor="phone" className=" mt-2">phone : </label>
                <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" type="tel" className="form-control"></input>
                {formik.errors.phone && formik.touched.phone ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.phone }</div> : ''}

                {isLoading ? <button type="button" className="btn myBtn fw-bold mt-3 px-3 py-2">
                <ThreeDots 
height="28" 
width="40" 
radius="9"
color="white" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
                    </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn myBtn fw-bold mt-3 px-3 py-2">Register</button>
                }
                
            </form>
        </div>
    </>
}