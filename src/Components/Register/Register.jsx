import React, { useContext, useState } from 'react';

import { useFormik } from 'formik/dist/formik.cjs.production.min.js';
import * as Yup from 'yup'
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  async function registerSubmit(values) {
    setLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
      })
    if (data.message === 'success') {
      setLoading(true)
      navigate('/login')
    }
  }

  // Yup Validation
  let validationSchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "name min length is 3").max(10, "name max length is 10"),
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required("password is required").matches(/^[A-Z][\w\W]{5,8}$/, 'invalid password ex:(Zeianb@123)'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'rePassword dosenot match password '),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'not egyptian number')

  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    }, validationSchema
    , onSubmit: registerSubmit
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Register</title>
    </Helmet>
    <div className='w-75 mx-auto py-4'>
      <h2 className='text-capitalize py-2'>register now  </h2>
      <form onSubmit={formik.handleSubmit}>

        {apiError ? <div className='alert alert-danger text-center py-2'>{apiError}</div> : ''}

        <label htmlFor='name'> Name :</label>
        <input type='text' className='form-control mb-3 ' onBlur={formik.handleBlur} id='name' name='name' onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

        <label htmlFor='email'> Email :</label>
        <input type='email' className='form-control mb-3 ' onBlur={formik.handleBlur} id='email' name='email' onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

        <label htmlFor='password'> Password :</label>
        <input type='password' className='form-control mb-3 ' onBlur={formik.handleBlur} id='password' name='password' onChange={formik.handleChange} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

        <label htmlFor='rePassword'> RePassword :</label>
        <input type='password' className='form-control mb-3 ' onBlur={formik.handleBlur} id='rePassword' name='rePassword' onChange={formik.handleChange} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}

        <label htmlFor='phone'> Phone :</label>
        <input type='tel' className='form-control mb-3 ' onBlur={formik.handleBlur} id='phone' name='phone' onChange={formik.handleChange} />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

        {loading ? <button type='button' disabled className='btn bg-main text-light'>
          <FallingLines
            color="#FFF"
            width="20"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </button>
          : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>

        }
        <Link className='ps-3 text-decoration-none text-dark' to={'/login'} > Login Now</Link>

      </form>
    </div>
  </>
}
