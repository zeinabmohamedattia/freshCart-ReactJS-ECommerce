import React from 'react';
import styles from './CategoriesSlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    arrows: false,
    slidesToScroll: 1
  };
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data } = useQuery('allCategories', getCategories);
  return <>
    <div className='row'>
      <Slider {...settings}>
        {data?.data.data.map(category => <div key={category._id} className='col-md-2'>
          <div className='category'>
            <img height={200} src={ category.image} alt={category.name} className='w-100'  />
            <p>{category.name }</p>
          </div>
        </div>
          
          )
          
}
        


      </Slider>
    </div>
  </>
}
