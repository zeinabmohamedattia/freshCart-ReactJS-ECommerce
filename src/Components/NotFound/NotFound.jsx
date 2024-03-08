import React from 'react';
import error from '../../Assets/images/error.svg'
export default function NotFound() {
  return <>
    <div className='row justify-content-center  align-items-center'>
      <h2 className='text-main text-center fw-bold my-4'> Page Not Found</h2>
      <div className='image w-50'>
        <img className='w-100' src={error} alt={'not_found' } />
      </div>
    </div>
  </>
}
