import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";


export let CartContext = createContext();



export default function CartContextProvider(props) {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [reqTimeOut, setReqTimeOut] = useState(); 
    const { userToken } = useContext(userContext);


    async function getLoggedUserCart() {

        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            
                headers: { token: localStorage.getItem('userToken') }
            });
            if (data.status === 'success') {
                setNumOfCartItems(data?.numOfCartItems);
                setTotalCartPrice(data?.data.totalCartPrice);
                setCartProducts(data?.data.products);
                setCartId(data?.data._id);
            }
            
            return data;
        } catch (error) {
                setNumOfCartItems(0);
                setTotalCartPrice(0);
                setCartProducts(null);
                setCartId(null);
            
            return error;
        }
    };

    async function addToCart(id) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId: id
            },
                {
                    headers : { token: localStorage.getItem('userToken')  }
                });
            await getLoggedUserCart();
            return data;
        } catch (error) {
            return error;
        }
    }

    async function removeCartItem(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers : { token: localStorage.getItem('userToken') }
            });
            setNumOfCartItems(data?.numOfCartItems);
            setTotalCartPrice(data?.data.totalCartPrice);
            setCartProducts(data?.data.products);
            if (cartProducts.length === 1) {
                await clearCart();
            }
            return data;
        } catch (error) {
            return error;
        }
    }

    
    function updateProductQuantity(id, count, index) {

        let res;
        let newProducts = [...cartProducts];
        newProducts[index].count = count;
        
        clearTimeout(reqTimeOut);
        setReqTimeOut(setTimeout(async () => {
            try {
                
                res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                    count
                },
                    {
                        headers : { token: localStorage.getItem('userToken') }
                    });
                if (count <= 0) {
                    removeCartItem(id);
                }
                if (res) {
                    setTotalCartPrice(res.data.data.totalCartPrice);
                    setCartProducts(res.data.data.products);
                    }
                return res;
            } catch (error) {
                return error
            }
        }, 300));
       
    }
    
    async function clearCart() {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers : { token: localStorage.getItem('userToken') }
            });
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setCartProducts(null);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getLoggedUserCart();
    }, [])
    

   
    useEffect(() => {
        getLoggedUserCart();
   },[userToken])
  


    return <>
        <CartContext.Provider value={{cartId,totalCartPrice,setTotalCartPrice,cartProducts,clearCart,numOfCartItems,setNumOfCartItems, addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity }}>
        {props.children}
    </CartContext.Provider>
    </>
}