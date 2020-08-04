import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Spinner from '../../layout/layoutUtils/Spinner';
import { searchItem } from '../../../actions/product';
import { connect } from 'react-redux';

const Products = ({ searchItem, product: { loading, items } }) => {
  useEffect(() => {
    searchItem('', '', '', '', 0, '', 'Arts & Craft');
  }, [searchItem]);

  return <div>{loading && items.length <= 0 ? <Spinner /> : <h1>hey</h1>}</div>;
};

const mapState = ({ product }) => ({
  product
});

export default connect(mapState, { searchItem })(Products);
