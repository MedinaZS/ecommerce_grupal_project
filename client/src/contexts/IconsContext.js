import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'

const IconsContext = createContext();

const IconsContextProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [wishList, setWishList] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            await axios.get('http://localhost:8000/api/cart', { withCredentials: true })
                .then((response) => {
                    setCart(response.data.cart)
                })
                .catch((error) => console.log("Error", error));
        }

        const fetchWishList = async () => {
            await axios.get('http://localhost:8000/api/wish-list', { withCredentials: true })
                .then((response) => {
                    setWishList(response.data.wishList)
                })
                .catch((error) => console.log("Error", error));
        }

        fetchCart();
        fetchWishList();
    }, []);




    return (
        <IconsContext.Provider value={{ globalCart: [cart, setCart], globalWishList: [wishList, setWishList] }}>
            {children}
        </IconsContext.Provider>
    );
};

export { IconsContext, IconsContextProvider };
