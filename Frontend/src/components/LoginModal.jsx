import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FoodContext from '../context/FoodContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginModal = ({ setLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(FoodContext);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const onClose = () => {
        setLogin(false);
    };

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        gender:"",
        address:"",
        phone:""
    });
    console.log(input)

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let newUrl = url;
        let cnt = 0;
        if(input.phone.length!=10){
            toast.error("Enter valid phone number")
            return;
        }
        try {
            
            if (currState === 'Login') {
                newUrl += "/api/user/login";
            } else {
                newUrl += '/api/user/register';
                cnt = 1;
            }
            const res = await axios.post(newUrl, input);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                setLogin(false);
                if (cnt === 0) {
                    toast.success("Login successful");
                } else {
                    try {
                        await axios.post(url + "/api/mail/sendmail", {
                            to: input.email,
                            subject: "Welcome to Our Service",
                            text: `Hi ${input.name},\n\nThank you for registering with us.`
                        });
                        toast.success("Registration successful and email sent");
                    } catch (error) {
                        console.error('Error sending email:', error);
                        toast.error('Registration successful but failed to send email');
                    }
                }
            } else {
                if (cnt === 0) {
                    toast.error("Login failed");
                } else {
                    toast.error("Registration failed");
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/api/user/forget-password`, { email: input.email });
            if (res.data.success) {
                try {
                    await axios.post(`${url}/api/mail/sendmail`, {
                        to: input.email,
                        subject: "Password Reset OTP",
                        text: `Your OTP for password reset is: ${res.data.otp}`
                    });
                    setOtp(res.data.otp);
                    toast.success("OTP sent successfully to your email");
                    setOtpSent(true);
                } catch (error) {
                    console.error('Error sending OTP email:', error);
                    toast.error('Failed to send OTP email');
                }
            } else {
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/api/user/reset-password`, {
                email: input.email,
                otp,
                password: newPassword
            });
            console.log(res);
            if (res.data.success) {
                toast.success("Password reset successfully");
                setOtpSent(false);
                setNewPassword("")
                setCurrState("Login");
            } else {
                toast.error(res.data.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };
    

    // useEffect(() => {
    //     console.log(input);
    // }, [input]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">{currState}</h2>
                    <button onClick={onClose}><FaTimes size={20} /></button>
                </div>
                {otpSent ? (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Enter OTP</label>
                            <input
                                name="otp"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                type="text"
                                className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                                placeholder='Enter OTP'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                name="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                type="password"
                                className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                                placeholder='Enter new password'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="bg-blue-500 text-white w-full text-lg px-4 py-2 rounded">
                                Reset Password
                            </button>
                        </div>
                       
                    </form>
                ) : (
                    <>
                        {currState === "ForgetPassword" ? (
                            <form onSubmit={handleForgetPassword}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        value={input.email}
                                        type="email"
                                        className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <button type="submit" className="bg-blue-500 text-white w-full text-lg px-4 py-2 rounded">
                                        Send Reset Link
                                    </button>
                                </div>
                            </form>
                        ) : (
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
                                            placeholder='Enter your full name'
                                            required
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
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>
                                {currState === "Signup" && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Gender</label>
                                        <div className="flex space-x-4">
        
                                        <label htmlFor="">
                                            <input type="radio" name="gender" value="male" checked={input.gender === "male"} onChange={handleChange} /> Male
                                        </label>
                                        <label htmlFor="">
                                            <input type="radio" name='gender' value="female" checked={input.gender === "female"} onChange={handleChange} /> Female
                                        </label>
                                        </div>
                                        <div className="my-4">
                                        <label className="block text-gray-700 ">Address</label>
                                        <input className='w-full p-2 border text-slate-500 border-gray-300 rounded mt-1' type="text" name='address' value={input.address} onChange={handleChange} placeholder='Enter your address'/>
                                        </div>
                                        <div className="">
                                        <label className="block text-gray-700">Phone</label>
                                    <input
                                        name="phone"
                                        onChange={handleChange}
                                        value={input.phone}
                                        type="number"
                                        className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                                        placeholder='Enter your phone number'
                                        required
                                    />
                                        </div>
                                    </div>

                                )}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input
                                        name="password"
                                        onChange={handleChange}
                                        value={input.password}
                                        type="password"
                                        className="w-full p-2 border text-slate-500 border-gray-300 rounded mt-1"
                                        placeholder='Enter your password'
                                        required
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
                                            <span onClick={() => setCurrState("ForgetPassword")} className='text-blue-700 cursor-pointer'>
                                                Forget Password?
                                            </span>
                                            <br />
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
