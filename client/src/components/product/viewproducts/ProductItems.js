import React from 'react';
import { Row, Col } from 'antd';
import CarouselItem from './CarouselItem';
import MinDetails from './MinDetails';

const ProductItems = ({ items }) => {
  return (
    <div className='productItems'>
      {items && items.length <= 0 ? (
        <div>
          <p>
            <strong>No matches for item found</strong>
          </p>
          <p style={{ fontSize: '16px' }}>
            Please input correct fields to match exactly what you are looking
            for
          </p>
        </div>
      ) : (
        <Row>
          {items &&
            items.map((product) => {
              return (
                <Col key={product._id} xl={6} className='item'>
                  <CarouselItem product={product} />
                  <span style={{ fontSize: '16px' }}>{product.title}</span>
                  <span
                    style={{
                      fontWeight: '700',
                      fontSize: '17px'
                    }}
                  >
                    ${product.price}
                    <span
                      style={{
                        display: 'inline',
                        color: '#999999',
                        fontSize: '12px',
                        fontWeight: 'normal'
                      }}
                    >
                      /piece
                    </span>
                  </span>
                  <MinDetails item={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
};

export default ProductItems;
