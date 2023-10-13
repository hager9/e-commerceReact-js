import jwtDecode from 'jwt-decode';
import React, {  useEffect, useState } from 'react'
import Loading from '../../Copmonents/Loading/Loading'
import { Helmet } from "react-helmet";

export default function Profile() {

    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const decoded = jwtDecode(localStorage.getItem('userToken'));
        setUserName(decoded.name);
        setIsLoading(false);
    }, []);

    return <>
        <Helmet>
                <title>profile</title>
                <meta name="description" content="freshCart login page" />
            </Helmet>
        {isLoading ? <Loading /> : <>
            <div className="container my-5 bg-main-light rounded p-5 width-fit box-shadow">
                <h5 className='fw-bold fs-3 text-main text-center mb-3'>Hi  { userName}</h5>
                <h5 className='fw-bold fs-4 text-center mb-3'>We’re thrilled to have you as part of our community. Enjoy your journey with us!</h5>
        </div>
        </>}
    </>
}
