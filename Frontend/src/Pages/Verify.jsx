import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(FoodContext);

    const navigate = useNavigate();

    const sendBillEmail = async (orderId) => {
        try {
            console.log("Sending bill for order:", orderId);
            const res = await axios.post(`${url}/api/mail/sendBill`, { orderId });
            console.log("sendBill response:", res);
            if (res.data.success) {
                toast.success("Bill sent to your email successfully");
            } else {
                toast.error("Failed to send bill email");
            }
        } catch (error) {
            console.error("Error sending bill email:", error);
            toast.error("An error occurred while sending the bill email");
        }
    };
    

    const verifyPayment = async () => {
        try {
            const res = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (res.data.success) {
                // await sendBillEmail(orderId); // Call sendBillEmail after successful payment verification
                navigate('/myorders');
            } else {
                toast.error("Payment not verified");
                navigate('/');
            }
        } catch (error) {
            toast.error("An error occurred during payment verification");
            navigate('/');
        }
    };
    

    useEffect(() => {
        verifyPayment();
    }, []);

    return null;
};

export default Verify;
