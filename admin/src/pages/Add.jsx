import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({url}) => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    // const [data,setData]=useState({
    //     image:"",
    //     productName:"",
    //     description:"",
    //     category:"",
    //     price:""
    // })
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Form submission logic
        console.log({
            image,
            productName,
            description,
            category,
            price
        });
        const formData = new FormData();
        formData.append("image",image);
        formData.append("name",productName);
        formData.append("description",description);
        formData.append("category",category);
        formData.append("price",price);

        const res = await axios.post(`${url}/api/food/add`,formData)
        if(res.data && res.data.success){
            setImage(null)
            setProductName(''),
            setDescription(''),
            setCategory(''),
            setPrice('');
            toast.success(res.data.message)
        }
        else{
            toast.error("Error")
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-2xl drop-shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Upload Image <span className='text-red-500'>*</span></label>
                    <div className="relative inline-block cursor-pointer">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} width={150} alt="Upload Icon" />
                        <input 
                            id="file-upload"
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Name <span className='text-red-500'>*</span></label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description <span className='text-red-500'>*</span></label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 h-32" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Category <span className='text-red-500'>*</span></label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">--select--</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwitch</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Price <span className='text-red-500'>*</span></label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600 transition duration-200"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Add;
