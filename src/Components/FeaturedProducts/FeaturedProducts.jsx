
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext.js';

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState(null)
  let { getCartItems, setCartCount, addToCart, cartCount } = useContext(CartContext)
  const [wishList, setWishList] = useState([])
  const [clickedButtons, setClickedButtons] = useState([]);
  let { addTowishList, setWishListCount, deletewishListItems, getwishListItems, wishListCount } = useContext(WishListContext)

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredProducts) {
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);

    }
  };
  async function getProducts() {
    // setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data?.data)
    setSearchResults(data?.data)
    setLoading(false)
  }
  async function getItems() {
    setLoading(true)
    let { data } = await getCartItems()
    if (data?.status === 'success') {
      
      setCart(data?.data)
      setCartCount(data?.numOfCartItems)
      console.log(data)
    }
    
setLoading(false)
  }

  async function getList() {
    setLoading(true)
    let { data } = await getwishListItems()
    console.log(data)
    setWishList(data.data)
    setWishListCount(data?.count)
    let clicked = data.data.map(item => item._id)
    setClickedButtons(clicked)
    setLoading(false)
  }

  useEffect(() => {
     
    getList()
   
    getProducts()
    getItems()

  }, []);
  

  const handleClick = (buttonId) => {
    if (clickedButtons.includes(buttonId)) {
      deletelistItems(buttonId)
    } else {
      postTowishList(buttonId)
    }

    // Toggle the clicked state for the current button
    setClickedButtons((prevClickedButtons) => {
      if (prevClickedButtons.includes(buttonId)) {
        return prevClickedButtons.filter((id) => id !== buttonId);
      } else {
        return [...prevClickedButtons, buttonId];
      }
    });
  };
  useEffect(() => {
    
    searchProducts();
  }, [clickedButtons, searchTerm]);

  async function postToCart(id) {
setLoading(true)
    let { data } = await addToCart(id)

    if (data?.status === 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message, {
        duration: 2000,
      })

    }
    setLoading(false)
  }


  

  async function postTowishList(id) {
    let { data } = await addTowishList(id)

    if (data.status === 'success') {
      setWishList(data.data)
      setWishListCount(data?.data.length)
      toast.success(data.message, {
        duration: 2000,
      })
    }
  }
  async function deletelistItems(id) {
    let { data } = await deletewishListItems(id)
    setWishList(data.data)
    setWishListCount(data?.data.length)
    toast.error(data.message, {
      duration: 2000,
    })
  }
  return <>
    {loading ? <div className='row justify-content-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
      <FallingLines
        width="100"
        height='100'
        wrapperClass="bg-main"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
      :
      <div className='  '>
        <label className='text-main w-75 mt-3 d-block mx-auto fw-bold'>Search By Product Name </label>
        <input type="text" placeholder="search...." value={searchTerm} onChange={handleSearchInputChange} className="w-75 mx-auto form-control my-3 " />
        <div className='row gy-4 py-4 '>
          {searchResults.length !== 0 ?
            searchResults?.map(product =>
              <>
                <div key={product._id} className='col-md-3 '>
                  <div className='product p-2'>
                    <Link to={`/productdetails/${product.id}`} className=''>
                      <img src={product.imageCover} alt={product.title} height={300} className='w-100' />
                      <span className='font-sm text-main'> {product.category.name}</span>
                      <h3 className='h6'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                      <div className='d-flex justify-content-between align-items-center py-3'>
                        <span className='font-sm' >{product.price} EGP</span>
                        <span className='font-sm' >
                          <i className='fas fa-star rating-color me-1'></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div>
                      <i
                        className={`heart-icon ${clickedButtons.includes(product.id) ? 'clicked' : ''} fa fa-heart fa-2x w-100 text-end pointer `}
                        onClick={() => handleClick(product.id)}
                      />
                    </div>
                    <button onClick={() => postToCart(product.id)} className='w-100 btn bg-main text-main-light btn-sm'> Add To Cart</button>
                  </div>
                </div>
              </>

            )
            : <h3 className='text-center'>Your search "{searchTerm}" did not match any Products</h3>

          }
        </div>
      </div>
    }
  </>
}
