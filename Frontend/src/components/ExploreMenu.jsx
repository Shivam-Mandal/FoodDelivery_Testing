import React from "react";
import { menu_list } from "../assets/assets";
const ExploreMenu = ({category,setCategory}) => {
   
    return (
        <>
            <div className="container m-auto py-9 px-6 overflow-x-scroll" id="explore-menu">
                <h1 className="font-bold text-2xl">Explore our menu</h1>
                <p className="py-3">Discover a variety of delicious dishes crafted with fresh ingredients. <br /> From appetizers to desserts, we have something to satisfy every palate. Dive into our menu and find your new favorite meal!</p>
                <div className="flex  space-x-6 py-4 "  >
                    {menu_list.map((item,index)=>{
                        return(
                            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="max-w-max overflow-auto cursor-pointer text-center mb-4 sm:mb-0">
                                <img src={item.menu_image} className="object-cover rounded-full" alt="" />
                                <p className="text-center mt-2">{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default ExploreMenu;