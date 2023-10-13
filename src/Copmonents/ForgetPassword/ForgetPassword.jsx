import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";

export default function ForgetPassword() {

    let navigate = useNavigate();
    let [isError, setIsError] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    async function verify(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values).catch((error) => {
            setIsLoading(false);
            setIsError(error.response.data.message);
        });

        if (data.statusMsg === 'success') {
            setIsLoading(false);
            setIsError("");
            toast.success(data.message)
            navigate('/verify-code');
        }
        
    }

    let formik = useFormik({
        initialValues: {
            email:'',
        },
        onSubmit: verify
    })

    
    return <>
         <Helmet>
                <title>forget password</title>
                <meta name="description" content="freshCart forget password page" />
            </Helmet>
        {isLoading ? <Loading /> : <> <div className="container">
        <h2 className="fw-bold mt-5">Find your account</h2>
        <p className="text-muted">Please enter your email</p>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-floating">
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" class="form-control" id="email" placeholder="Email"/>
                <label htmlFor="email">Email</label>
            </div>
            <button type="submit" className="btn myBtn mt-4 fw-bold py-2 px-3">Verify</button>
            
        </form>
        {isError ? <p className="text-danger fw-bold my-3">{isError}</p> : ''}
        </div>
        
        </>}
      
        
    </>
}