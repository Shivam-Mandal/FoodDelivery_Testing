import React, { useEffect, useState } from "react";
import FoodContext from "./FoodContext";
import axios from 'axios';

const FoodState = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // const url = "http://localhost:3000";
    // const url = "http://3.109.213.130:3000";

    // const url = "http://localhost:3000";
    const url = "https://fooddelivery-backend-j1h7.onrender.com";


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
            const res = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
            setCartItem(res.data.cartData);
        } catch (error) {
            console.error("Failed to load cart item:", error);
        }
    };

    const addToCart = async (itemId) => {
        const newCartItem = { ...cartItem }
        if (!newCartItem[itemId]) {
            newCartItem[itemId] = 1;
        } else {
            newCartItem[itemId] += 1;
        }
        setCartItem(newCartItem)

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
                await loadCartItem();
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
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
                    { headers: { token } }
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

    const [isDarkMode, setDarkMode] = useState(false);
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        setTheme(isDarkMode ? 'dark' : 'light');
        document.body.className = isDarkMode ? 'dark' : 'light';
    }, [isDarkMode]);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
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
        token,
        theme,
        toggleDarkMode,
        isDarkMode,
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (token) {
            loadCartItem();
        }
    }, [token]);

    return (
        <FoodContext.Provider value={stateValue}>
            {props.children}
        </FoodContext.Provider>
    );
};

export default FoodState;
