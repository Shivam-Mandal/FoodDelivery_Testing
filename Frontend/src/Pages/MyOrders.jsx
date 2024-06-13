import React, { useContext, useEffect, useState } from "react";
import FoodContext from "../context/FoodContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
    const { token, url } = useContext(FoodContext);
    const [data, setData] = useState([]);
    
    const fetchOrderData = async () => {
        try {
            const res = await axios.post(url + '/api/order/userorder', {}, { headers: { token } });
            console.log(res)
            setData(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrderData();
            localStorage.removeItem('cartData')
            toast.success('Your orders fetched successfully');

        }
    }, [token]);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>
            {data.length === 0 ? (
                <p className="text-center text-gray-500">No orders found</p>
            ) : (
                <div className="space-y-4">
                    {data.map((order, index) => (
                        <div className="order-item bg-white border border-gray-200 p-6 rounded-lg shadow-md" key={index}>
                            <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center mb-4">
                                        <img className="w-16 h-16 object-cover rounded-md border border-gray-200 mr-4" src={url + '/images/' + (item.image || "default-image-url")} alt={item.name} />
                                        <div>
                                            <p className="text-gray-700">{item.name} x {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-gray-700 mt-4 ">
                                <p className="font-semibold mb-1">Total Amount: <span className="text-gray-900">Rs {order.amount}</span></p>
                                <p className="font-semibold mb-1">Total Items: <span className="text-gray-900">{order.items.length}</span></p>
                                <p className="font-semibold">Status: <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>{order.status}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
