import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext.js';

export default function ProductDetails() {
  const [clickedButtons, setClickedButtons] = useState([]);
  const [wishList, setWishList] = useState([])
  let { addToCart, setCartCount } = useContext(CartContext)
  let { addTowishList, deletewishListItems, setWishListCount, getwishListItems  } = useContext(WishListContext)


  const handleClick = (buttonId) => {
    if (clickedButtons.includes(buttonId)) {
      deletelistItems(buttonId)
    } else {
      postTowishList(buttonId)
    }

    // Toggle the clicked state for the current button
    setClickedButtons((prevClickedButtons) => {
      if (prevClickedButtons.includes(buttonId)) {
        return prevClickedButtons.filter((id) => id !== buttonId);
      } else {
        return [...prevClickedButtons, buttonId];
      }
    });
  };
  

  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data.status === 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message, {
        duration: 2000,
      })

    }
  }

  async function postTowishList(id) {
    let { data } = await addTowishList(id)

    if (data.status === 'success') {
      setWishList(data.data)
      setWishListCount(data?.data.length)
      toast.success(data.message, {
        duration: 2000,
      })

    }
  }
  async function deletelistItems(id) {
    let { data } = await deletewishListItems(id)
    setWishList(data.data)
    setWishListCount(data?.data.length)
    toast.error(data.message, {
      duration: 2000,
    })
    
  }
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1
  };
  let { id } = useParams();
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)

  async function getProduct(id) {
    setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)

    setLoading(false)
  }
  useEffect(() => {
    getProduct(id)
    getList()
  }, [])
  async function getList() {
setLoading(true)
    let { data } = await getwishListItems()
    setWishList(data.data)
    let clicked = data.data.map(item => item._id)
    setClickedButtons(clicked)
    setLoading(false)
  }
  return <>
    {loading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
      <FallingLines
        width="100"
        height='100'
        wrapperClass="bg-main"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
      : <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{details.title}</title>
        </Helmet>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-4'>
            <Slider {...settings}>
              {details.images.map((image, index) => <img src={image} alt={details.title} key={index} className='w-100' />)}

            </Slider>
          </div>
          <div className='col-md-8'>
            <div className='details p-4'>
              <h3 className='h6'>{details.title}</h3>
              <p className='py-3'>{details.description} </p>

              <span className='font-sm text-main'> {details.category.name}</span>
              <div className='d-flex justify-content-between align-items-center py-3'>

                <span className='font-sm' >{details.price} EGP</span>
                <span>
                  <i
                    className={`heart-icon ${clickedButtons.includes(details.id) ? 'clicked' : ''} fa fa-heart pointer fa-2x w-100 text-end `}
                    onClick={() => handleClick(details.id)}
                  />
                </span>
                <span className='font-sm' >
                  <i className='fas fa-star rating-color me-1'></i>
                  {details.ratingsAverage}
                </span>

              </div>
              <button className='w-100 btn bg-main text-main-light btn-sm' onClick={() => postToCart(details.id)}> Add To Cart</button>

            </div>
          </div>

        </div>
      </>

    }  </>
}
