import React , {useContext, useState} from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";
import * as Yup from 'yup';
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";

export default function ResetPassword() {

    let {setUserToken} =  useContext(userContext);
    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState('');

    let validationSchema = Yup.object({
        newPassword: Yup.string()
            .matches(/^[A-Z][A-Za-z0-9]{5,8}/, "password should start with uppercase letter and only contain letters (A-Z or a-z) and numbers (0-9) and Be between 6 and 9 characters in total.")
            .required('password is required')
            .min(6).max(9)
    })

    async function resetPassword(values) {
        setIsLoading(true)
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values).catch((error) => {
            setIsLoading(false);
            setIsError(error.response.data.message)
        });
        if (data.token) {
            setIsLoading(false);
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
            navigate('/');
        }
    }

    let formik = useFormik({
        initialValues: {
            email:'',
            newPassword:'',
        },
        validationSchema,
        onSubmit: resetPassword
    });
    
    return <>
     <Helmet>
                <title>reset password</title>
                <meta name="description" content="freshCart reset password page" />
            </Helmet>
        
        {isLoading ? <Loading /> : <>
            <div className="container">
            <h2 className="fw-bold mt-5">reset your account password</h2>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" class="form-control" id="email" placeholder="Email"/>
                <label htmlFor="email">Email</label>
            </div>
                    
            <div className="form-floating">
                <input name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" class="form-control" id="password" placeholder="Password"/>
                <label htmlFor="password">New Password</label>
                {formik.errors.newPassword && formik.touched.newPassword ? <div className="text-danger font-bold mt-2 p-2">{ formik.errors.newPassword }</div> : ''}
            </div>
                    
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn myBtn mt-4 fw-bold py-2 px-3">Reset Password</button>
            
        </form>
        {isError ? <p className="text-danger fw-bold my-3">{isError}</p> : ''}
            </div>
        
        </>}
    </>
}