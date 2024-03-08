import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext.js';
import { CartContext } from '../../Context/CartContext.js';
import { useSelector } from 'react-redux';
import { WishListContext } from '../../Context/WishListContext.js';



export default function Navbar() {
  let { getCartItems, cartCount, setCartCount } = useContext(CartContext)
  let { getwishListItems, wishListCount, setWishListCount } = useContext(WishListContext)
  const [cart, setCart] = useState(null)
  const [wishList, setWishList] = useState(null)
  let { userToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate();

  async function getWishList() {

    let { data } = await getwishListItems()
    if (!data) {
      setWishListCount(0)
    } else {
      setWishList(data)
      setWishListCount(data?.count)
    }
  }
 
  async function getCart() {

    let { data } = await getCartItems()
    if (!data) {
      
      setCartCount(0) 

    } else {
     setCart(data)
    setCartCount(data?.numOfCartItems) 
     }
  }
  useEffect(() => {

    getCart()
    getWishList()
  }, [])

  function logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userEmail')
    setUserToken(null)
    navigate('/login')
  }
  return <>
    <nav className="navbar fixed-top   navbar-expand-lg bg-body-tertiary">
      <div className="container  ">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex align-items-center font-sm">
            {userToken != null ? <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home  </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">Wish List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">Brands</Link>
              </li>
            </>
              : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {<li className="nav-item d-flex align-items-center">
              <a href="https://www.linkedin.com/in/zeinab-mohamed-attia/" target='_blanck' >
                <i className='fab mx-2 fa-linkedin-in'></i>
                </a>
              <a href="https://github.com/zeinabmohamedattia" target='_blanck' >
                <i className='fab mx-2 fa-github'></i>
                </a>
              
            </li>}
            {userToken != null ? <div className='d-flex align-items-center justify-content-between'>
             
              <li className="nav-item">
                <Link className="nav-link position-relative d-flex align-items-center  justify-content-center" to="/cart">
                  <i className="fa fa-cart-shopping fa-2x "></i>
                  <span className='position-absolute bg-main  notification d-flex align-items-center justify-content-center top-0 end-0  font-sm  text-white p-2 rounded-circle'>{cartCount}</span>

                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative d-flex align-items-center  justify-content-center" to="/wishlist">
                  <i className="fa fa-heart fa-2x "></i>
                  <span className='position-absolute bg-main  notification d-flex align-items-center justify-content-center top-0 end-0  font-sm  text-white p-2 rounded-circle'>{wishListCount}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  " to={'/profile'}  >
                  <i className='fa-solid fa-user fa-2x '></i>
                </Link>
              </li>
              <li className="nav-item">
                <i className="nav-link cursor-pointer  fa-solid fa-person-walking-arrow-right fa-2xl" onClick={() => logOut()} ></i>
              </li>
            </div> :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  </>
}
