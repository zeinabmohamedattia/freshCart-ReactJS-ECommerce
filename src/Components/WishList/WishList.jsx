import React, { useContext, useEffect, useState } from 'react';
 import { WishListContext } from '../../Context/WishListContext.js';
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext.js';
export default function WishList() {
  const [wishList, setWishList] = useState(null)
  const [loading, setLoading] = useState(true)
  let { addToCart, setCartCount } = useContext(CartContext)
  let { getwishListItems, deletewishListItems, setWishListCount} = useContext(WishListContext)
 
  async function getItems() {

    let { data } = await getwishListItems()
    setLoading(false)
    setWishList(data.data)
  }

  async function deletelistItems(id) {
    setLoading(true)
    let { data } = await deletewishListItems(id)
    getItems()
    setLoading(false)
    toast.error(data.message, {
      duration: 2000,
    })
    setWishListCount(data.data.length)
    if (data.data.length === 0) {
      setWishListCount(0)
    }
  }

  async function postToCart(id) {
    setLoading(true)
    let { data } = await addToCart(id)

    if (data.status === 'success') {
      setCartCount(data.numOfCartItems)

      toast.success(data.message, {
        duration: 2000,
      })
setLoading(false)
    }
  }
  
  useEffect(() => {
    getItems()
  }, [])
  
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My WishList</title>
    </Helmet>
    <div className='bg-light p-2 '>
      <h2 className=' ' >My Wish List :</h2>
      {loading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
        <FallingLines
          width="100"
          height='100'
          wrapperClass="bg-main"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
        : wishList.length!==0 ? <>

          {wishList.map(product => <div key={product._id} className='row align-items-center border-1 border-bottom p-2 m-0'>
            <div className='col-md-2'>
              <div className='image'>
                <img className='w-100' alt={product.title} src={product.imageCover} />
              </div>
            </div>
            <div className='col-md-8 '>
              <div className='item'>
                <h3 className='h5 fw-bold'> {product.title.split(' ').splice(0, 2).join(' ')}</h3>
                <p className='text-main fw-bold'>Price :  {product.price} EGP</p>
                <button className='btn 'onClick={()=>deletelistItems(product.id)}  ><i className='fas fa-trash-can text-danger' ></i> Remove</button>
              </div>
            </div>
            <div className='col-md-2 '>
              <div className=''>
               
                <button className='btn p-2 w-100 brdr' onClick={() => postToCart(product.id)} >Add To Cart</button>
              </div>
            </div>
          </div>)}
        </> : <h3 className='my-5'>Your Wish List Is Empty</h3>
        }
    </div>
  </>
}
