import React from 'react';
import { assets } from '../assets/assets';
const MobileApp=()=>{

    return(
        <>
         <div className="container mx-auto py-20 sm:py-24 lg:py-40 border-t-2" id='mobile-apps'>
        <p className='text-lg sm:text-xl lg:text-2xl text-center px-4 sm:px-0'>
          For a better experience, download the FlavorFeet app now
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <img src={assets.play_store} alt="Play Store" className="w-32 sm:w-40 lg:w-48" />
          <img src={assets.app_store} alt="App Store" className="w-32 sm:w-40 lg:w-48" />
        </div>
      </div>
        </>
    )
}
export default MobileApp;