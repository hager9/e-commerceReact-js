import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const wishListContext = createContext();

export default function WishListContextProvider(props) {

    const [addedToWishlist, setAddedToWishlist] = useState([]);

    async function addToWishList(id) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId: id
            }, {
                headers: { token: localStorage.getItem('userToken') }
            });
            if (data.status === "success") {
                setAddedToWishlist((prevState)=> [...prevState , id]);
                localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
               
            }
            
            return data;
        } catch (error) {
            return error;
        }
        
    }

    async function getLoggedUserWishlist() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                headers: { token: localStorage.getItem('userToken') }
            });
            if (data?.status === 'success') {
                const productsId = data.data.map((item) => item.id) 
                setAddedToWishlist(productsId);
                localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
                
            }
            
            return data;
        } catch (error) {
            return error;
        }
        
    }

    async function removeProductFromWishlist(id) {

        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
                headers: { token: localStorage.getItem('userToken') }
            });
            if (data.status === 'success') {
                const newAddedArray = [...addedToWishlist];
                newAddedArray.filter((products) => products !== id);
                setAddedToWishlist(newAddedArray);
                localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
                
            }
            getLoggedUserWishlist();
            return data;
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getLoggedUserWishlist();
   },[])
    

    return <>
        <wishListContext.Provider value={{ addToWishList , getLoggedUserWishlist , removeProductFromWishlist , addedToWishlist , setAddedToWishlist}}>
            {props.children}
        </wishListContext.Provider>
        
    
    </>
}
