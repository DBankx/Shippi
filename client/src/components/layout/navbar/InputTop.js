import React from 'react';
import { Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const InputTop = () => {
  const select = (
    <Select defaultValue='All'>
      <option value='Arts & Craft'>Arts & Craft</option>
      <option value='Automotive'>Automotive</option>
      <option value='Technology'>Technology</option>
      <option value='Books'>Books</option>
      <option value='Electronics'>Electronics</option>
      <option value='Fashion'>Fashion</option>
      <option value='Home & Kitchen'>Home & Kitchen</option>
      <option value='Toys & Games'>Toys & Games</option>
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
    <div>
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
