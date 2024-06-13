// import React, { useContext } from 'react'
// import { assets } from '../assets/assets';
// import FoodContext from '../context/FoodContext';
// const FoodItems = ({ id, name, desc, price, image }) => {
//     // const [countItem,setCountItem] = useState(0);
//     // const incrementCount =()=>{
//     //     setCountItem(prev=>prev+1);
//     // }
//     // const decrementCount = ()=>{
//     //     setCountItem(countItem>0?countItem-1:0);
//     // }

//     const { cartItem, addToCart, removeFromCart } = useContext(FoodContext);
//     return (
//         <>
//             <div className="py-8">
//                 <img className='h-60 rounded-xl m-auto' src={image} alt="" />
//                 <div className="">
//                     <div className="flex">
//                         <p className='font-semibold py-1'>{name}</p>
//                         <img src={assets.rating_starts} alt="" />
//                     </div>
//                     <p className='py-1'>{desc}</p>
//                     <div className="flex items-center justify-between">
//                         <span>Price: ${price}</span>
//                         {!cartItem[id] ? <img
//                             src={assets.plus}
//                             alt="Plus"
//                             className="cursor-pointer w-9 pr-2"
//                             onClick={() => addToCart(id)}
//                         /> :
//                             <div className=" flex items-center bg-slate-200 p-2 rounded-full space-x-2">
//                                 <img
//                                     src={assets.minus}
//                                     alt="Minus"
//                                     className="cursor-pointer w-6"
//                                     onClick={() => removeFromCart(id)}
//                                 />
//                                 <span>{cartItem[id]}</span>
//                                 <img
//                                     src={assets.plus}
//                                     alt="Plus"
//                                     className="cursor-pointer w-6"
//                                     onClick={() => addToCart(id)}
//                                 />
//                             </div>}
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }
// export default FoodItems;

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import FoodContext from '../context/FoodContext';

const FoodItems = ({ id, name, desc, price, image }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(FoodContext);
  console.log(id)
  return (
    <div className="food-item py-8 shadow-xl flex flex-col items-center gap-4">
      <img
        className="h-60 rounded-xl object-cover"
        src={image}
        alt={name}
        // width={100}
        // height={100}
      />
      <div className="food-info px-2 flex flex-col gap-2">
        <div className="food-title flex justify-between items-center">
          <p className="font-semibold py-1">{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-desc py-1">{desc}</p>
        <div className="food-price flex items-center justify-between">
          <span>Price: Rs {price}</span>
          {!cartItem[id] ? (
            <img
              src={assets.plus}
              alt="Add to Cart"
              className="cursor-pointer w-9 pr-2"
              onClick={() => addToCart(id)}
            />
          ) : (
            <div className="quantity-control flex items-center bg-slate-200 p-2 rounded-full space-x-2">
              <img
                src={assets.minus}
                alt="Remove from Cart"
                className="cursor-pointer w-6"
                onClick={() => removeFromCart(id)}
              />
              <span className="quantity">{cartItem[id]}</span>
              <img
                src={assets.plus}
                alt="Add More"
                className="cursor-pointer w-6"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
        <hr className=' md:hidden' />
      </div>
    </div>
  );
};

export default FoodItems;
