import React from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const CartIcon = ({ cart }) => {
  return (
    <div>
      <Badge count={cart.length} showZero>
        <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />
      </Badge>
    </div>
  );
};

export default CartIcon;
