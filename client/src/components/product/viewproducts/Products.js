import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'antd';
import Spinner from '../../layout/layoutUtils/Spinner';
import { searchItem } from '../../../actions/product';
import { connect } from 'react-redux';
import ProductColumn from './ProductsColumn';

const Products = ({ searchItem, product: { loading, items } }) => {
  useEffect(() => {
    searchItem('', '', '', '', 0, '', 'Technology');
  }, [searchItem]);

  // setting the search form data
  const [searchData, setSearchData] = useState({
    title: '',
    format: '',
    condition: '',
    page: 0,
    order: '',
    category: '',
    sortBy: ''
  });

  function handleSearchData({ target }) {
    const { name, value } = target;
    setSearchData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container'>
          <Row gutter={6}>
            <Col xl={4}></Col>
            <Col xl={16}>
              <ProductColumn
                items={items}
                searchData={searchData}
                handleSearchData={handleSearchData}
              />
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

const mapState = ({ product }) => ({
  product
});

export default connect(mapState, { searchItem })(Products);
