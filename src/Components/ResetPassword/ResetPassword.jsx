import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null)

  let { setUserToken, setUserData } = useContext(UserContext)
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email'),
    newPassword: Yup.string().required("password is required").matches(/^[A-Z][\w\W]{5,8}$/, 'invalid password ex:(Zeianb@123)'),
  })
  async function submitPassword(values) {
    setLoading(true)
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch(err => {
        setApiError(err.response.data.message)
        setLoading(false)
      })

    setLoading(false)
    localStorage.setItem('userToken', data.token)

    setUserToken(data.token)
    setUserData(data.user)
    console.log(data.user)
    navigate('/login')
  }

  let formik = useFormik({
    initialValues: {
      "email": "",
      "newPassword": ""
    }, validationSchema
    , onSubmit: submitPassword
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Reset Password</title>
    </Helmet>
    <h2 className='my-4' >Reset Your account password</h2>
    <form onSubmit={formik.handleSubmit}  >
      {apiError ? <div className='alert alert-danger text-center py-2'>{apiError}</div> : ''}

      <div className="form-floating mb-3">
        <div className="form-floating mb-3">
          <input type="email" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" className="form-control  mb-2" />
          <label htmlFor="email">Email </label>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

        </div>
        <div className="form-floating mb-3">
          <input type="password" id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} name="newPassword" className="form-control form-floating" />
          <label htmlFor="newPassword">New Password </label>
          {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger py-2'>{formik.errors.newPassword}</div> : null}

        </div>
      </div>
      {loading ? <button type='button' disabled className='btn bg-main text-light'>
        <FallingLines
          color="#FFF"
          width="20"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </button>
        : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light px-4 py-2'>Reset</button>
      }
    </form>

  </>
}
