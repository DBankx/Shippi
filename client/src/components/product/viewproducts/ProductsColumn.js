import React from 'react';
import ControlRefinments from './ControlRefinments';
import { Divider } from 'antd';
import InfoBox from './InfoBox';
import ProductItems from './ProductItems';

const ProductsColumn = ({
  items,
  searchData,
  handleSearchData,
  setCondition,
  setSortBy,
  setOrder,
  condition,
  sortBy,
  order,
  page,
  setPage
}) => {
  return (
    <div className='product-list-section'>
      <ControlRefinments
        searchData={searchData}
        handleSearchData={handleSearchData}
        items={items}
        setCondition={setCondition}
        setSortBy={setSortBy}
        setOrder={setOrder}
        condition={condition}
        sortBy={sortBy}
        order={order}
      />
      <Divider style={{ margin: '4px 0' }} />
      <ProductItems
        items={items && items}
        searchData={searchData}
        handleSearchData={handleSearchData}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductsColumn;
