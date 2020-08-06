import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'antd';
import Spinner from '../../layout/layoutUtils/Spinner';
import { searchItem } from '../../../actions/product';
import { connect } from 'react-redux';
import ProductColumn from './ProductsColumn';
import CategoryPick from './CategoryPick';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import queryString from 'query-string';

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

  let location = useLocation();
  let history = useHistory();
  // get the query strings from the url
  let params = queryString.parse(location.search);

  console.log(params);

  let mainParams = {
    ...params,
    condition,
    format,
    page,
    category,
    sortBy,
    order
  };

  console.log(mainParams);

  useEffect(() => {
    searchItem(
      mainParams.format,
      mainParams.condition,
      mainParams.order,
      mainParams.sortBy,
      mainParams.page,
      mainParams.title ? mainParams.title : '',
      mainParams.category
    );
  }, [
    searchItem,
    mainParams.category,
    mainParams.title,
    mainParams.format,
    mainParams.condition,
    mainParams.page,
    mainParams.order
  ]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container'>
          <Row gutter={6} className='products-view'>
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

export default connect(mapState, { searchItem })(withRouter(Products));

// push new url strings to search for the products
// history.push({
//   pathname: '/search',
//   search:
//     '?' +
//     new URLSearchParams({
//       title: params.title ? params.title : '',
//       category:
//         category || params.category ? category || params.category : '',
//       condition: condition,
//       format: format,
//       sortBy: sortBy,
//       order: order,
//       page: page
//     })
// });
