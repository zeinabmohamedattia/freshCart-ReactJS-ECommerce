import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik/dist/formik.cjs.production.min.js';
import * as Yup from 'yup'
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext.js';
export default function Login() {
  


  let { setUserToken, setUserData, userData } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
      })
    if (data.message === 'success') {
     
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userEmail', data.user.email)
      setUserToken(data.token)
      setUserData(data.user)
      navigate('/')
       setLoading(false)
    }
  }
  // Yup Validation
  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required("password is required").matches(/^[A-Z][\w\W]{5,8}$/, 'invalid password ex:(Zeianb@123)'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema
    , onSubmit: loginSubmit
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
    </Helmet>
    <div className='w-75 mx-auto py-4'>
      <h2 className='text-capitalize py-2'>login now  </h2>
      <form onSubmit={formik.handleSubmit}>

        {apiError ? <div className='alert alert-danger text-center py-2'>{apiError}</div> : ''}

        <label htmlFor='email'> Email :</label>
        <input type='email' className='form-control mb-3 ' onBlur={formik.handleBlur} id='email' name='email' onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

        <label htmlFor='password'> Password :</label>
        <input type='password' className='form-control mb-3 ' onBlur={formik.handleBlur} id='password' name='password' onChange={formik.handleChange} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

        {loading ? <button disabled type='button' className='btn bg-main text-light'>
          <FallingLines
            color="#FFF"
            width="20"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </button>
          : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>
        }
        <Link className='ps-3 text-decoration-none text-dark' to={'/forgetpassword'} > Forget Your Password ?</Link>
        <Link className='ps-3 text-decoration-none text-dark' to={'/register'} > Register Now</Link>
      </form>
    </div>
  </>
}
