import React from 'react';
import image1 from '../../Assets/images/slider-2.jpeg'
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import image2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick';

export default function MainSlider() {
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
  return <>
    <div className='row py-4 gx-0 ' >
      <div className='col-md-9'>
        <div className='images'>
          <Slider {...settings}>
            <img src={slide3} alt='fresh cart' className='w-100' height={400} />
            <img src={slide1} alt='fresh cart' className='w-100' height={400} />
            <img src={slide2} alt='fresh cart' className='w-100' height={400} />


          </Slider>
        </div>
      </div>
      <div className='col-md-3'>
        <div className='images'>

          <img src={image1} alt='fresh cart' className='w-100' height={200} />
          <img src={image2} alt='fresh cart' className='w-100' height={200} />
        </div>
      </div>
    </div>
  </>
}
