import React from 'react';
import { Radio, Form } from 'antd';
import queryString from 'query-string';
import { useLocation, withRouter } from 'react-router-dom';

const CategoryPick = ({ searchData, handleSearchData }) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  // make the radio value already be selected to the one in the url
  let location = useLocation();
  let params = queryString.parse(location.search);

  return (
    <div style={{ padding: '1em' }}>
      <span style={{ fontSize: '17px', fontWeight: '600', display: 'block' }}>
        Category
      </span>
      <Radio.Group
        defaultValue={params.category}
        name='category'
        value={searchData.category}
        onChange={handleSearchData}
      >
        <Radio style={radioStyle} value=''>
          All
        </Radio>
        <Radio style={radioStyle} value='Arts and Craft'>
          Arts and Craft
        </Radio>
        <Radio style={radioStyle} value='Automotive'>
          Automotive
        </Radio>
        <Radio style={radioStyle} value='Technology'>
          Technology
        </Radio>
        <Radio style={radioStyle} value='Books'>
          Books
        </Radio>
        <Radio style={radioStyle} value='Electronics'>
          Electronics
        </Radio>
        <Radio style={radioStyle} value='Fashion'>
          Fashion
        </Radio>
        <Radio style={radioStyle} value='Home and Kitchen'>
          Home and Kitchen
        </Radio>
        <Radio style={radioStyle} value='Toys and Games'>
          Toys and Games
        </Radio>
        <Radio style={radioStyle} value='Video Games'>
          Video Games
        </Radio>
        <Radio style={radioStyle} value='Health'>
          Health
        </Radio>
        <Radio style={radioStyle} value='Tools'>
          Tools
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default withRouter(CategoryPick);
