import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {


    let headers = {
        token: localStorage.getItem('userToken')
    }
    const [wishListCount, setWishListCount] = useState(null)
    function addTowishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            productId
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function getwishListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function deletewishListItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishList/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
   
    return <WishListContext.Provider value={{ addTowishList, getwishListItems, wishListCount, setWishListCount , deletewishListItems }}>
        {props.children}
    </WishListContext.Provider>
}
