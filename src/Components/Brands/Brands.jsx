import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Redux/BrandsSlice.js';
import { FallingLines } from 'react-loader-spinner';

export default function Brands() {
  let { brand, isLoading } = useSelector(({ brands }) => brands)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title >All Brands</title>
    </Helmet>
    <h2 className='text-main text-center fw-bold fs-1'>All Brands </h2>
    {isLoading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
      <FallingLines
        width="100"
        height='100'
        wrapperClassNclassName="bg-main"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div> : <div className='row pointer py-5 g-4'>
      {brand.map(brand =>
        <div key={brand._id} className='col-md-3' data-bs-toggle="modal" data-bs-target={'#' + brand._id}>
          <div className='product p-2 text-center ' >
            <img className='w-100' src={brand.image} alt={brand.name} />
            <p className='m-0'>{brand.name}</p>
          </div>
        </div>
      )}

    </div>
    }
    {brand.map((brand,index) =>
      <>
        <div key={index} className="modal fade mt-5 " id={brand._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog mt-5 ">
            <div className="modal-content p-5 ">
             
              <div className="modal-body  ">
                <div className='row justify-content-around align-items-center gx-3 px-4 '>
                  <div className='col-md-6'>
                    <div className=''>
                      <h3 className='text-main fs-1 fw-bold'> {brand.name}</h3>
                      <span className='font-sm'> {brand.slug}</span>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <img className='w-100' src={brand.image} alt={brand.name} />
                  </div>

                </div>
              </div>
            
            </div>
          </div>
        </div>

      </>
    )}
  </>
}
