import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const InputTop = () => {
  // state handling for the search data
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  let history = useHistory();
  // go to the search page with the query params
  function handleClick() {
    history.push({
      pathname: '/search',
      search:
        '?' +
        new URLSearchParams({
          title: title,
          category: category,
          condition: '',
          format: '',
          sortBy: '',
          order: '',
          page: ''
        })
    });
  }
  const select = (
    <Select
      defaultValue=''
      dropdownMatchSelectWidth={false}
      name='category'
      value={category}
      onChange={(value) => setCategory(value)}
    >
      <option value=''>All</option>
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
      onClick={() => handleClick()}
    >
      search
    </Button>
  );

  return (
    <div className='input-top'>
      <Input
        value={title}
        name='title'
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Search Products...'
        addonBefore={select}
        prefix={<SearchOutlined />}
        suffix={search}
      />
    </div>
  );
};

export default InputTop;
