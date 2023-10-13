import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg"
import { userContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(userContext);
  const { numOfCartItems } = useContext(CartContext);
  let navigate = useNavigate();

  async function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
    navigate('/login');
  }

    return <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed fixed-top py-3">
  <div className="container">
          <Link className="navbar-brand" to="/"><img src={logo} alt="fresh market logo"></img></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken !== null ? <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link rounded px-3" aria-current="page" to="/">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link rounded px-3" to="cart">Cart</NavLink>
                        </li>
                        <li className="nav-item">
          <NavLink className="nav-link rounded px-3 " to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
          <NavLink className="nav-link rounded px-3 " to="categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
          <NavLink className="nav-link rounded px-3 " to="brands">Brands</NavLink>
                </li>
                <li className="nav-item">
          <NavLink className="nav-link rounded px-3" to="wishlist">Wishlist</NavLink>
                </li>
            
      </ul>
            </> : ""}
      
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto align-items-center">
                 
              {userToken !== null ? <>
                <li className="nav-item mx-3">
                  <Link className="position-relative" to={'/cart'}>
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-success">
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <i className="fa-solid fa-cart-shopping fs-3 text-dark"></i></Link>
                </li>
                <li className="nav-item">
          <NavLink className="nav-link rounded px-3" to="allorders">Orders</NavLink>
                </li>
                <li className="nav-item">
          <NavLink className="nav-link rounded px-3" to="profile">Profile</NavLink>
                </li>
                
                  <li className="nav-item">
                          <Link onClick={()=>{logout()}} className="nav-link cursor-pointer">Logout</Link>
                </li>
                
               
              </> : <>
                  <li className="nav-item">
                          <NavLink className="nav-link rounded px-3" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                          <NavLink className="nav-link rounded px-3" to="/register">Register</NavLink>
                  </li>
                 
            </>}
               
            
     </ul>
    </div>
  </div>
</nav>
    </>
}