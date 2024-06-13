import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
          const sortedOrders = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(sortedOrders);

        console.log(res.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus=async(event,orderId)=>{
    const res = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if(res.data.success){
        await fetchAllOrders();
        toast.success('Status changed');
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-bold mb-4">Order Page</h3>
      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : (
        <div>
          {orders.length > 0 ? (
            <ul className="space-y-6">
              {orders.map((order, index) => (
                <li key={index} className="order-item p-4 border rounded-lg shadow-md bg-white">
                  <div className="order-details flex items-start justify-between space-x-4">
                    <img src={assets.parcel_icon} alt="Order" width={80} className="flex-shrink-0" />

                    <div>
                      <p className="mb-2 text-lg">
                        {order.items.map((item, itemIndex) => (
                          <span key={itemIndex}>
                            {item.name} x {item.quantity}
                            {itemIndex !== order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                      <p className="font-semibold text-gray-800">{order.address.name}</p>
                      <p className="text-gray-600">
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}
                      </p>
                      <p className="text-gray-600">{order.address.phone}</p>
                      <p className="mt-2">Items: {order.items.length}</p>
                      <p className="mt-2">Amount: <span className='font-semibold'>Rs {order.amount}</span></p>
                      
                    </div>
                    <div className="">
                    <select className="mt-2 border rounded-md p-2" onChange={(event)=>handleStatus(event,order._id)} value={order.status}>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
