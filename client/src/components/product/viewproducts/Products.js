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
    category: ''
  });

  const { format, category } = searchData;

  const [page, setPage] = useState(0);

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

  let mainParams = {
    ...params,
    condition,
    format,
    page,
    category,
    sortBy,
    order
  };

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
            <Col xl={4} lg={4} md={0} xs={0} sm={0}>
              <CategoryPick
                searchData={searchData}
                handleSearchData={handleSearchData}
              />
            </Col>
            <Col xl={18} lg={20} md={24} sm={24} xs={24}>
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
                page={page}
                setPage={setPage}
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
