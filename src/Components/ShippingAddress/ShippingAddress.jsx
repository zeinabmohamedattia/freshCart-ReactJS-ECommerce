import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext.js';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';

export default function ShippingAddress() {
  let { id } = useParams()
  let { checkOutSession } = useContext(CartContext);
  async function checkOut(values) {
    let { data } = await checkOutSession(id, values);
    if (data.status === 'success') {
      window.location.href = data.session.url
    }
  }
  let validationSchema = Yup.object({
    details: Yup.string().required("details is required").min(3, "details min length is 3").max(20, "details max length is 20"),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'not egyptian number'),
    city: Yup.string().required("city is required").min(3, "city min length is 3").max(15, "city max length is 15"),
  })
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    }, validationSchema,
    onSubmit: checkOut
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Shipping Address</title>
    </Helmet>
    <h2 className='text-main text-center'>Shipping Address</h2>
    <div className='w-75 mx-auto'>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='details'>Details :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type='text' name='details' id='details' />
        {formik.errors.details && formik.touched.details ? <div className='alert alert-danger py-2'>{formik.errors.details}</div> : null}

        <label htmlFor='phone'>Phone :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type='tel' name='phone' id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

        <label htmlFor='city'>City :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type='text' name='city' id='city' />
        {formik.errors.city && formik.touched.city ? <div className='alert alert-danger py-2'>{formik.errors.city}</div> : null}

        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Pay Now</button>
      </form>

    </div>
  </>
}
