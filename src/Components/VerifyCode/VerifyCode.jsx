import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  async function submitCode(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
      .catch(err => {
        setApiError(err.response.data.message)

        toast.error(err.response.data.message, {
          duration: 2000,

        })
        setLoading(false)
      })
    if (data.status === 'Success') {
      toast.success('Correct Reset Code', {
        duration: 2000,
      })
      setLoading(false)

      navigate('/resetpassword')
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: ''
    }, onSubmit: submitCode
  });
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Verify Code</title>
    </Helmet>
    <h2 className='my-4' >please enter your verification Code</h2>
    <form onSubmit={formik.handleSubmit}  >
      {apiError ? <div className='alert alert-danger text-center py-2'>{apiError}</div> : ''}

      <div className="form-floating mb-3">
        <input type="text" onChange={formik.handleChange} id="resetCode" placeholder="name@example.com" name="resetCode" className="form-control " />
        <label htmlFor="resetCode">Reset Code </label>
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
