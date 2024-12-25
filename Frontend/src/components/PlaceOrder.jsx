import React, { useContext, useState, useEffect } from 'react';
import FoodContext from '../context/FoodContext';
import axios from 'axios';
import { toast } from 'react-toastify'
const PlaceOrder = () => {

    const { cartItem, getTotalCartItem, token, food_list, url } = useContext(FoodContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        phone: ""
    });

    useEffect(() => {
        const cartData = localStorage.getItem('cartData');
        if (cartData) {
            setData(JSON.parse(cartData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(data));
    }, [data]);

    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItem = food_list.filter(item => cartItem[item._id] > 0).map(item => ({
            ...item,
            quantity: cartItem[item._id]
        }));
        console.log(orderItem);
        if (orderItem.length === 0) {
            toast.error("Cart is empty.");
            return;
        }

        let orderData = {
            address: data,
            items: orderItem,
            amount: (getTotalCartItem() + getTotalCartItem() * .07).toFixed(2)
        };

        try {
            if (token) {
                let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
                if (res.data.success) {
                    let { session_url } = res.data;
                    window.location.replace(session_url);
                } else {
                    toast.error("Error placing order.");
                }
            } else {
                toast.error("Please login to place an order")
            }

        } catch (error) {
            console.error("API error:", error);
            toast.error("API error occurred.");
        }
    };


    return (
        <>
            <div className="flex w-full flex-col md:flex-row md:space-x-8 p-6 bg-gray-100 min-h-screen">
                <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
                    <form onSubmit={placeOrder}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.name}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Mobile no. <span className='text-red-500'>*</span></label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.phone}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className='text-red-500'>*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.email}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Address <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.street}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.city}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.state}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-2">ZIP Code <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={onChangeHandler}
                                value={data.zipcode}
                                required
                            />
                        </div>
                        <button type='submit' className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white font-semibold rounded-lg w-full">
                            PROCEED TO PAYMENT
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md mt-6 md:mt-0" style={{ height: '250px' }}>
                    <p className="font-bold text-xl mb-4">Cart Total</p>
                    <div className="flex justify-between mb-2 px-2">
                        <span>Subtotal</span>
                        <span>Rs {cartItem <= 0 ? 0 : getTotalCartItem().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 px-2">
                        <span>Delivery Fee</span>
                        <span>Rs {cartItem <= 0 ? 0 : (getTotalCartItem() * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold bg-green-200 rounded-2xl px-2 py-2">
                        <span>Total</span>
                        <span>Rs {cartItem <= 0 ? 0 : (getTotalCartItem() + getTotalCartItem() * 0.07).toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PlaceOrder;
