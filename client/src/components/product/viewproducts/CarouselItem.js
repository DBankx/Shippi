import React from 'react';

import { Carousel } from 'react-responsive-carousel';

const CarouselItem = ({ product }) => {
  return (
    <div>
      <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
        {product.productImages.map((img, index) => {
          return (
            <div className='' key={index}>
              <img src={img.image.data} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
