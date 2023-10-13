import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { userContext } from "../../Contexts/UserContext";
import { Helmet } from "react-helmet";


export default function Login() {
    let { setUserToken} = useContext(userContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let validationSchema = Yup.object({
        email: Yup.string().email("email pattern is invalid").required("email is required"),
        password: Yup.string()
            .matches(/^[A-Z][A-Za-z0-9]{5,8}/, "password should start with uppercase letter and only contain letters (A-Z or a-z) and numbers (0-9) and Be between 6 and 9 characters in total.")
            .required('password is required')
            .min(6).max(9)
    })


    async function submitLogin(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
            setIsLoading(false);
            setError(err.response.data.message);
            });
        if (data.message === 'success') {
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
            setIsLoading(false);
            navigate('/');
        }
    }

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },validationSchema,
        onSubmit:submitLogin
    })
    

    return <>
         <Helmet>
                <title>login</title>
                <meta name="description" content="freshCart login page" />
            </Helmet>
        <div className="py-5 mx-auto .container">
            {error ? <div className="alert alert-danger">{ error }</div>: ''}
            <h1 className="fw-bold h3 mb-3" >Login Now : </h1>
            <form onSubmit={formik.handleSubmit}>
                
                <label htmlFor="email" className=" mt-2">email : </label>
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" type="email" className="form-control"></input>
                {formik.errors.email && formik.touched.email ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.email }</div> : ''}

                <label htmlFor="password" className=" mt-3">password : </label>
                <input name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" type="password" className="form-control"></input>
                {formik.errors.password && formik.touched.password ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.password }</div> : ''}


   
                        <div className="d-flex align-items-center justify-content-between mt-3">
                        <Link className="link-hover fw-bold fs-5" to={'/forget-password'}>forget your password ?</Link>
                    {isLoading ? <> <button type="button" className="btn myBtn px-3 py-2 ms-3">
                        
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
                </button> </> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn myBtn fw-bold px-3 py-2 ms-3">Login</button>}
                            
                        </div>
            </form>
        </div>
    </>
}