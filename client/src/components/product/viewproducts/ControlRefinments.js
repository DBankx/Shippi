import React from 'react';
import { Radio, Form, Row, Col, Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ControlRefinments = ({
  searchData,
  handleSearchData,
  items,
  setCondition,
  setSortBy,
  setOrder,
  sortBy,
  order,
  condition
}) => {
  return (
    <div className='refine'>
      <Form>
        <Row gutter={6} justify='space-between' align='middle'>
          <Col>
            <Row gutter={24}>
              <Col>
                <Form.Item>
                  <Radio.Group
                    defaultValue=''
                    buttonStyle='solid'
                    optionType='button'
                    size='middle'
                    name='format'
                    value={searchData.format}
                    onChange={handleSearchData}
                  >
                    <Radio.Button value=''>All Listings</Radio.Button>
                    <Radio.Button value='Fixed price'>Fixed price</Radio.Button>
                    <Radio.Button value='Negotiatable'>
                      Negotiatable
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col>
                <Select
                  defaultValue=''
                  dropdownMatchSelectWidth={false}
                  name='condition'
                  value={condition}
                  onChange={(value) => setCondition(value)}
                >
                  <Option value=''>Any Condition</Option>
                  <Option value='New with box'>New with box</Option>
                  <Option value='New without box'>New without box</Option>
                  <Option value='New with defects'>New with defects</Option>
                  <Option value='Used'>Used</Option>
                </Select>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row gutter={24}>
              <Col>
                <Form.Item label='Sort' name='sortBy'>
                  <Select
                    name='sortBy'
                    value={sortBy}
                    dropdownMatchSelectWidth={false}
                    onChange={(value) => setSortBy(value)}
                  >
                    <Option value='price'>Price</Option>
                    <Option value='lastUpdated'>Date posted</Option>
                    <Option value='quantity'>Quantity</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name='order' label='Order'>
                  <Select
                    name='order'
                    value={order}
                    dropdownMatchSelectWidth={false}
                    onChange={(value) => setOrder(value)}
                  >
                    <Option value='asc'>Lowest to Highest</Option>
                    <Option value='desc'>Highest to Lowest</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Row gutter={24}>
        <Col>
          <strong>{items && items.length}</strong> result(s) found
        </Col>
        <Col>
          <Link to='/'>
            <HomeOutlined /> Back to home
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ControlRefinments;
