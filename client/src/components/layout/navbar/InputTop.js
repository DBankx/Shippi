import React from 'react';
import { Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const InputTop = () => {
  const select = (
    <Select defaultValue='All' dropdownMatchSelectWidth={false}>
      <option value='Arts and Craft'>Arts and Craft</option>
      <option value='Automotive'>Automotive</option>
      <option value='Technology'>Technology</option>
      <option value='Books'>Books</option>
      <option value='Electronics'>Electronics</option>
      <option value='Fashion'>Fashion</option>
      <option value='Home and Kitchen'>Home and Kitchen</option>
      <option value='Toys and Games'>Toys and Games</option>
      <option value='Video Games'>Video Games</option>
      <option value='Health'>Health</option>
      <option value='Tools'>Tools</option>
    </Select>
  );

  const search = (
    <Button
      className='search-top'
      type='primary'
      style={{
        backgroundColor: '#89c9b8',
        outline: 'none',
        borderColor: '#89c9b8',
        fontWeight: '700'
      }}
    >
      search
    </Button>
  );

  return (
    <div className='input-top'>
      <Input
        placeholder='Search Products...'
        addonBefore={select}
        prefix={<SearchOutlined />}
        suffix={search}
      />
    </div>
  );
};

export default InputTop;
