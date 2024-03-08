import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext.js';
import { FallingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  let { getCartItems, deleteCartItems, updateCartItems, setCartCount, emptyCart } = useContext(CartContext)
  async function getItems() {
    let { data } = await getCartItems()
    if (!data) {
      setLoading(false)
      setCart(null)
      setCartCount(0)
    } else {
      setLoading(false)
      setCart(data)
      setCartCount(data.numOfCartItems)
    }
  }
  async function deleteItems(id) {
    setLoading(true)
    let { data } = await deleteCartItems(id)
    if (data.status === 'success') {
      setCart(data)
      setCartCount(data.numOfCartItems)
      toast.error('Product Deleted Successfully', {
        duration: 2000,
      }
      )
      if (data.numOfCartItems === 0) {
        setCart(null);
        setCartCount(0)
      }
      setLoading(false)
    }
  }

  async function clearCart() {
    setLoading(true)
    await emptyCart()
    setLoading(false)
    setCart(null)
    setCartCount(0)
  }
  async function updateItems(id, count) {
    if (count < 1) {

      deleteItems(id)

    } else {
      let { data } = await updateCartItems(id, count)
      setCart(data)
      setCartCount(data.numOfCartItems)
    }

  }
  useEffect(() => {
    getItems()
  }, [])
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Cart</title>
    </Helmet>
    <div className='bg-light p-2 '>
      <h2 >Shop Cart :</h2>
      {loading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
        <FallingLines
          width="100"
          height='100'
          wrapperClass="bg-main"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
        : !cart ? <h3>Your Cart Is Empty</h3> : <>
          <div className='d-flex justify-content-between align-items-center p-2  '>
            <div className='p-3'>
              <p className='fw-bold'>Number Of CartItems : <span className='text-main fw-bold'>{cart.numOfCartItems}</span> </p>
              <p className='fw-bold'>Total Cart Price :<span className='text-main fw-bold'> {cart.data.totalCartPrice} EGP </span>  </p>
            </div>
            <div><Link to={`/shippingaddress/${cart.data._id}`} className='btn text-white btn-info'>Check Out</Link>
            </div>

          </div>
          {cart.data.products.map(product => <div key={product.product._id} className='row align-items-center border-1 border-bottom p-2 m-0'>
            <div className='col-md-1'>
              <div className='image'>
                <img className='w-100' alt={product.product.title} src={product.product.imageCover} />
              </div>
            </div>
            <div className='col-md-10 '>
              <div className='item'>
                <h3 className='h5 fw-bold'> {product.product.title.split(' ').splice(0, 2).join(' ')}</h3>
                <p className='text-main fw-bold'>Price :  {product.price} EGP</p>
                <button className='btn' onClick={() => deleteItems(product.product._id)}><i className='fas fa-trash-can text-danger'></i> Remove</button>
              </div>
            </div>
            <div className='col-md-1 '>
              <div className='count'>
                <button className='btn  p-1 brdr' onClick={() => updateItems(product.product._id, product.count + 1)}>+</button>
                <span className='mx-2' >{product.count}</span>
                <button className='btn p-1 brdr' onClick={() => updateItems(product.product._id, product.count - 1)}>-</button>
              </div>
            </div>

          </div>)}
          <div className='col-md-12 justify-content-center d-flex'>
            <button className='btn brdr mt-2' onClick={() => clearCart()}> Clear Your Cart</button>

          </div>
        </>}

    </div>
  </>
}
