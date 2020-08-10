import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ItemImages = ({ item }) => {
  return (
    <div>
      <Carousel>
        {item.productImages.map((img) => {
          return (
            <div key={img._id}>
              <img src={img.image.data} alt='product' />
            </div>
          );
        })}
      </Carousel>
      <h1>{item && item.title}</h1>
    </div>
  );
};

export default ItemImages;
