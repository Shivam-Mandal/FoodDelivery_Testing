

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { assets } from '../assets/assets';
import '../assets/styles/ImageCarousel.css'; // Corrected CSS import

const ImageCarousel = () => {
  const images = [assets.banner1, assets.banner2,assets.banner1, assets.banner3, assets.banner2, assets.banner3];

  return (
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        stopOnHover={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className='max-w-5xl lg:rounded-2xl' />
          </div>
        ))}
      </Carousel>
  );
};

export default ImageCarousel;
