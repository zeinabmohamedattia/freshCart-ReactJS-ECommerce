import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }
    const [cartCount, setCartCount] = useState(null)

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then((response) =>response)
            .catch((err) => err)
    }
    function checkOutSession(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://zeinabmohamedattia.github.io/freshCart-ReactJS-ECommerce/#`, {
            shippingAddress
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
           .then((response) => response)
            .catch((err) => err)
    }
    function deleteCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function emptyCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function updateCartItems(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count
            }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    return <CartContext.Provider value={{ addToCart, getCartItems, deleteCartItems, checkOutSession, updateCartItems, emptyCart, cartCount, setCartCount }}>
        {props.children}
    </CartContext.Provider>
}
