import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";

export default function VerifyCode() {

    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState('');

    async function verifying(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values).catch((error) => {
            setIsLoading(false);
            setIsError(error.response.data.message);
        });

        if (data.status === 'Success') {
            setIsLoading(false);
            setIsError('');
            navigate('/reset-password');
        }
    }
    
    let formik = useFormik({
        initialValues: {
            resetCode:'',
        },
        onSubmit: verifying
    });



    return <>
        
        <Helmet>
                <title>verify code</title>
                <meta name="description" content="freshCart verify code page" />
            </Helmet>
        {isLoading ? <Loading/> :
            <>
                <div className="container">
                <h2 className="fw-bold mt-5">please enter your verification code</h2>
        <form onSubmit={formik.handleSubmit}>
        <div className="form-floating">
                <input name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" class="form-control" id="code" placeholder="code"/>
                <label htmlFor="code">Code</label>
            </div>
            <button type="submit" className="btn myBtn mt-4 fw-bold py-2 px-3">Verify</button>
        </form>
        {isError ? <p className="text-danger fw-bold my-3">{isError}</p> : ''}
                </div>
        
            </>}
        

    </>
}