import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { getCategories, getSubCategories, getCurrentCategory } from '../../Redux/CategoriesSlice.js';
import { FallingLines } from 'react-loader-spinner';

export default function Categories() {
  
  let { categories, isLoading, subCategories, currentCategory } = useSelector(({ category }) => category)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Categories</title>
    </Helmet>
    {isLoading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
      <FallingLines
        width="100"
        height='100'
        wrapperClass="bg-main"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div> : <>
      <div className='row  py-5 g-4 pointer'>
        {categories.map(category =>
          <div onClick={() => { dispatch(getSubCategories(category._id)); dispatch(getCurrentCategory(category._id))}} key={category._id} className='col-md-4'>
          <div className='product p-2 text-center'>
            <img className='w-100' height={400} src={category.image} alt={category.name} />
            <h3 className='p-3 text-main text-center fw-bold'>{category.name}</h3>
          </div>
          </div>
          )} 
        </div>
        <div >
          {currentCategory.name?
            <h3 className='text-main text-center fw-bold'>{currentCategory.name} SubCategories</h3>
            :''
          }
          
          <div className='row  py-5  g-4'>
          
            {!currentCategory.name || subCategories.length!==0?
              subCategories.map(subCategory =>
            <div onClick={() => dispatch(getSubCategories(subCategory._id))} key={subCategory._id} className='col-md-4'>
              <div className='product brdr p-2 text-center'>
                <h4 className='p-3 text-center fw-bold'>{subCategory.name}</h4>
              </div>
                </div>) : <h3 className='text-center' > No Available SubCategories</h3>
    }
      </div>
    </div>
        </>
    }  </>
}
