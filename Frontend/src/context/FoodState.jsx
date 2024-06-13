import React, { useEffect, useState } from "react";
import FoodContext from "./FoodContext";
import axios from 'axios';

const FoodState = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "http://localhost:3000";

    const fetchFoodList = async () => {
        try {
            const res = await axios.get(url + "/api/food/list");
            setFoodList(res.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartItem = async () => {
        try {
            const res = await axios.post(url + '/api/cart/get', {}, { headers: { token} });
            setCartItem(res.data.cartData);
        } catch (error) {
            console.error("Failed to load cart item:", error);
        }
    };

    const addToCart = async (itemId) => {
        const newCartItem = {...cartItem}
        console.log('item Id:', itemId);
        console.log('token during add to cart:', token);
        // if (!cartItem[itemId]) {
        //     setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        // } else {
        //     setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        // }
        if(!newCartItem[itemId]){
            newCartItem[itemId] = 1;
        }
        else{
            newCartItem[itemId]+=1;
        }
        setCartItem(newCartItem)

        if (token) {
            try {
                // await axios.post(
                //     `${url}/api/cart/add`,
                //     { itemId },
                //     // { headers: { Authorization: `Bearer ${token}` } }
                //     {headers:token}
                // );
                // await axios.post(
                //     `${url}/api/cart/add`,
                //     { itemId },
                //     { headers: {token} }
                // );
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: {token} }
                );
                await loadCartItem();
                
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        // setCartItem((prev) => {
        //     const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
        //     if (updatedCart[itemId] <= 0) {
        //         delete updatedCart[itemId];
        //     }
        //     return updatedCart;
        // });

        const newCartItem = { ...cartItem };
        if (newCartItem[itemId] > 1) {
            newCartItem[itemId] -= 1;
        } else {
            delete newCartItem[itemId];
        }
        setCartItem(newCartItem);

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: {token } }
                );
                await loadCartItem();
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartItem = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };

    const stateValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartItem,
        url,
        setToken,
        token
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                console.log("Token from localStorage:", storedToken);
                setToken(storedToken);
                // await loadCartItem();
            }
        }
        loadData();
    }, []);
    useEffect(()=>{
        if(token){
            loadCartItem()
        }
    },[token])

    useEffect(() => {
        console.log("Cart items:", cartItem);
    }, [cartItem]);

    return (
        <FoodContext.Provider value={stateValue}>
            {props.children}
        </FoodContext.Provider>
    );
};

export default FoodState;
