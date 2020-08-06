import React from 'react';

const ShippingDetail = ({ shippingDetails }) => {
  return (
    <div>
      {shippingDetails.shippingPrice <= 0 ? (
        <span
          style={{
            display: 'inline',
            color: '#999999',
            fontSize: '12px',
            fontWeight: 'normal'
          }}
        >
          Free shipping
        </span>
      ) : null}
    </div>
  );
};

export default ShippingDetail;
