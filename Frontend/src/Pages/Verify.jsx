import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const {url} = useContext(FoodContext)

    const navigate = useNavigate();
    const verifyPayment= async()=>{
        const res = await axios.post(url+'/api/order/verify',{success,orderId})
        if(res.data.success){
            navigate('/myorders')
        }
        else{
            toast("payment not verified ")
            navigate('/')

        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])

    return (
        <>  </>
    )
}
export default Verify;