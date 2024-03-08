import axios from 'axios';
import { useFormik } from 'formik/dist/formik.cjs.production.min.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  const [apiError, setApiError] = useState(null)

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function emailSubmit(values) {
    setLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {
        setApiError(err.response.data.message)

        toast.error(err.response.data.message, {
          duration: 2000,

        })
        setLoading(false)

      })
    if (data.statusMsg === 'success') {
      toast.success(data.message, {
        duration: 2000,
      })
      setLoading(false)

      navigate('/verifycode')
    }
  }
  let formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: emailSubmit
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Forget Password</title>
    </Helmet>

    <h2 className='my-4' >please enter your verification Email</h2>
    <form onSubmit={formik.handleSubmit}  >
      {apiError ? <div className='alert alert-danger text-center py-2'>{apiError}</div> : ''}

      <div className="form-floating mb-3">
        <input type="email" id="email" placeholder="name@example.com" onChange={formik.handleChange} name="email" className="form-control " />
        <label htmlFor="email">Email </label>
      </div>
      {loading ? <button type='button' disabled className='btn bg-main text-light'>

        <FallingLines
          color="#FFF"
          width="20"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </button>
        : <button disabled={!(formik.dirty)} type='submit' className='btn bg-main text-light px-4 py-2'>Verify</button>
      }
    </form>
  </>
}
