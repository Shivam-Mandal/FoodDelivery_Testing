import React, { useContext } from 'react';
import FoodContext from '../context/FoodContext';
import FoodItems from './FoodItems';
const FoodDisplay = ({ category }) => {
    const { food_list, url } = useContext(FoodContext);
    return (
        <>
            <div className="container m-auto px-4 py-4">
                <h1 className='font-bold text-2xl pb-4'>Best Bites in Your Area</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
                    {food_list.map((item) => {
                        if (category === "All" || category === item.category) {
                            console.log(item._id)
                            return <FoodItems key={item._id} id={item._id} name={item.name} desc={item.description} price={item.price} image={url + '/images/' + item.image} />
                        }
                        // return <FoodItems key={index} id={item._id} name={item.name} desc={item.description} price={item.price} image={item.image} />
                    })}
                </div>
            </div>
        </>
    )
}
export default FoodDisplay;


// import React, { useContext } from 'react';
// import FoodContext from '../context/FoodContext';
// import FoodItems from './FoodItems';

// const FoodDisplay = ({ category }) => {
//     const { food_list = [], url = '' } = useContext(FoodContext);
    
//     return (
//         <div className="container m-auto px-4 py-4">
//             <h1 className='font-bold text-2xl pb-4'>Best Bites in Your Area</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {Array.isArray(food_list) && food_list.length > 0 ? (
//                     food_list.map((item) => {
//                         if (category === "All" || category === item.category) {
//                             return (
//                                 <FoodItems
//                                     key={item._id}
//                                     id={item._id}
//                                     name={item.name}
//                                     desc={item.description}
//                                     price={item.price}
//                                     image={`${url}/images/${item.image}`}
//                                 />
//                             );
//                         }
//                         return null; // If the condition doesn't match, return null
//                     })
//                 ) : (
//                     <p className="col-span-4 text-center">No food items available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FoodDisplay;
