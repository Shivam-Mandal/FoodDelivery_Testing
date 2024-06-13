import React, { useState } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'
import MobileApp from '../components/MobileApps'
const Home=()=>{
    const [category,setCategory] = useState("All");
    return(
        <>
        <div className="">
        <ImageCarousel/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
        <MobileApp/>
        </div>
        </>
    )
}
export default Home;