import React, { useEffect, useState } from 'react'

export default function useNetwork() {

    let [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        detectOnline()
    },[])
    function detectOnline() {
        window.addEventListener('online', () => {
            setIsOnline(true)
        });
        window.addEventListener('offline', () => {
            setIsOnline(false)
        })
    }

    return <>
          {!isOnline ?  <div className="network fw-bold bg-dark text-light px-4 py-3"> 
            <i className="fas fa-wifi me-2"></i> No internet connection!
            </div> : '' }
           
       
    </>
}


