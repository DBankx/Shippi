import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'antd';
import Spinner from '../../layout/layoutUtils/Spinner';
import { searchItem } from '../../../actions/product';
import { connect } from 'react-redux';
import ProductColumn from './ProductsColumn';
import CategoryPick from './CategoryPick';

const Products = ({ searchItem, product: { loading, items } }) => {
  // setting the search form data
  const [searchData, setSearchData] = useState({
    format: '',
    page: 0,
    category: ''
  });

  const { format, page, category } = searchData;

  const [condition, setCondition] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');

  function handleSearchData({ target }) {
    const { name, value } = target;
    setSearchData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const allSearchData = {
    format,
    condition,
    page,
    category,
    sortBy,
    order
  };

  useEffect(() => {
    searchItem(
      allSearchData.format,
      allSearchData.condition,
      allSearchData.order,
      allSearchData.sortBy,
      allSearchData.page,
      '',
      allSearchData.category
    );
  }, [
    searchItem,
    allSearchData.format,
    allSearchData.condition,
    allSearchData.page,
    allSearchData.category,
    allSearchData.order
  ]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container'>
          <Row gutter={6}>
            <Col xl={4} lg={4} md={4} xs={0}>
              <CategoryPick
                searchData={searchData}
                handleSearchData={handleSearchData}
              />
            </Col>
            <Col xl={18} lg={20} md={20} xs={24}>
              <ProductColumn
                items={items}
                searchData={searchData}
                handleSearchData={handleSearchData}
                setCondition={setCondition}
                setSortBy={setSortBy}
                setOrder={setOrder}
                condition={condition}
                sortBy={sortBy}
                order={order}
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
