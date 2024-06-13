import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FoodContext from '../context/FoodContext';
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginModal = ({ setLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(FoodContext);

    const onClose = () => {
        setLogin(false);
    };

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUrl = url;
        let cnt = 0;
        try {
            if (currState === 'Login') {
                newUrl += "/api/user/login"
            }
            else {
                newUrl += '/api/user/register'
                cnt = 1;
            }
            const res = await axios.post(newUrl, input);
            if (res.data.success) {
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
                setLogin(false)
                if (cnt == 0) {
                    toast.success("Login successfull")

                }
                else {
                    try{
                        await axios.post(url+"/api/mail/sendmail",{
                            to:input.email,
                            subject:"Welcome to Our Service",
                            text:`Hi ${input.name},\n\nThank you for registering with us.`
                        })
                        toast.success("Registration successful and email sent");
                    }catch(error){
                        console.error('Error sending email:', error);
                        toast.error('Registration successful but failed to send email');
                    }
                    
                }

            }
            else {
                if(cnt=0){
                    toast.error("Login failed")
                }
                else{
                    toast.error("Registration failed")
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
        console.log('Form submitted:', input);

    };

    useEffect(() => {
        console.log(input);
    }, [input]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">{currState}</h2>
                    <button onClick={onClose}><FaTimes size={20} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    {currState === "Signup" && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                name="name"
                                onChange={handleChange}
                                value={input.name}
                                type="text"
                                className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={input.email}
                            type="email"
                            className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            value={input.password}
                            type="password"
                            className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-green-500 text-white w-full text-lg px-4 py-2 rounded">
                            {currState === "Login" ? "Login" : "Signup"}
                        </button>
                    </div>
                    <div>
                        {currState === "Login" ? (
                            <p>
                                Create a new account?
                                <span onClick={() => setCurrState("Signup")} className='font-semibold text-orange-400 cursor-pointer'>
                                    Signup
                                </span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?
                                <span onClick={() => setCurrState("Login")} className='font-semibold text-orange-400 cursor-pointer'>
                                    Login
                                </span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
