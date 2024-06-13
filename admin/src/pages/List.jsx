import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const res = await axios.get(`${url}/api/food/list`);
            if (res.data && res.data.success) {
                setList(res.data.data);
            } else {
                toast.error("Unable to get food list");
            }
        } catch (error) {
            toast.error("An error occurred while fetching the food list");
        }
    };
    const handleDelete= async(foodId)=>{
        try {
            const remove = await axios.post(`${url}/api/food/remove`,{_id:foodId});
            if(remove.data && remove.data.success){
                toast.success("Food item deleted successfully")
                fetchList()
            }
            else{
                toast.error("Failed to delete food item")
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occured while deleting the food item");
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Food List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {list.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <img src={`${url}/images/${item.image}`} width={50} alt={item.name} className="rounded-lg" />
                                </td>
                                <td className="py-3 px-6 text-left">{item.name}</td>
                                <td className="py-3 px-6 text-left">{item.category}</td>
                                <td className="py-3 px-6 text-left">${item.price}</td>
                                <td className="py-3 px-6 text-center">
                                    <button onClick={()=>handleDelete(item._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
