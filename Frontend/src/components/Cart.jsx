import React, { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FoodContext from "../context/FoodContext";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
    const { addToCart, cartItem, food_list, removeFromCart, getTotalCartItem, url } = useContext(FoodContext);
    const navigate = useNavigate();
    const handleProceedToPayment=()=>{
        navigate('/placeOrder');
    }
    useEffect(()=>{
        window.scrollTo({top:0})
    })
    return (
        <div className="container mx-auto p-5">
            <div className="my-4">
                <ul className="flex justify-between text-center font-semibold bg-gray-200 p-2 rounded">
                    <li className="w-16">Items</li>
                    <li className="flex-1">Title</li>
                    <li className="w-28">Price</li>
                    <li className="w-20">Quantity</li>
                    <li className="w-20">Total</li>
                    <li className="w-14">Add</li>
                    <li className="w-16">Remove</li>
                </ul>
                <hr className="bg-black mt-2" />
            </div>
            <div className="space-y-4">
                {food_list.map((item) => {
                    if (cartItem[item._id] > 0) {
                        return (
                                <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                                    <img src={url+'/images/'+item.image} className="w-14 h-14 rounded-full object-cover" alt="no image" />
                                    <p className="flex-1 text-center">{item.name}</p>
                                    <p className="w-28 text-center">Rs {item.price.toFixed(2)}</p>
                                    <p className="w-16 text-center">{cartItem[item._id]}</p>
                                    <p className="w-28 text-center">Rs {(cartItem[item._id] * item.price).toFixed(2)}</p>
                                    <div className="flex space-x-8">
                                        <button
                                            onClick={() => addToCart(item._id)}
                                            className="w-8 h-8 flex items-center justify-center bg-green-400 text-white rounded-full"
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full"
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                </div>

                        );
                    }
                    return null;
                })}

                {Object.values(cartItem).every(quantity => quantity === 0) && (
                    <>
                        <p className="my-48 text-center font-semibold text-slate-500 text-xl">
                            Your cart is empty...
                        </p>

                    </>
                )}
                 <div className="border-t-2 border-gray-200">
                    <p className="font-bold text-xl mb-2">Cart Total</p>
                    <div className="flex justify-between mb-2 px-2">
                        <span>Subtotal</span>
                        <span>Rs {cartItem<=0?0:getTotalCartItem().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 px-2">
                        <span>Delivery Fee</span>
                        <span>Rs {cartItem <=0? 0 : (getTotalCartItem() * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold bg-green-200 rounded-2xl px-2 py-2">
                        <span>Total</span>
                        <span>Rs {cartItem <=0? 0 :( getTotalCartItem() + getTotalCartItem() * 0.07).toFixed(2)}</span>
                    </div>
                    <button onClick={handleProceedToPayment} className="bg-orange-500 px-3 py-2 my-5 ml-auto text-white block rounded-lg">PROCEED TO CHECKOUT</button>
                </div>

            </div>
        </div>
    );
};

export default Cart;
