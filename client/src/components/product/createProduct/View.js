import React from 'react';
import Navbar from '../../layout/navbar/Navbar';
import {
  Row,
  Col,
  Divider,
  Button,
  Rate,
  Tag,
  List,
  Avatar,
  Popover,
  Descriptions,
  Form,
  Input,
  Tooltip
} from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  TwitterOutlined,
  AmazonOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  MailOutlined,
  StarOutlined,
  ShopOutlined,
  EyeOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  EnvironmentOutlined,
  FlagOutlined
} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import PaymentIcons from './PaymentIcons';
import Moment from 'react-moment';
import { getCode } from 'country-list';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const View = ({ data }) => {
  console.log(data);

  const listData = [{ title: data.user.username }];

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className=''>
          <Row align='middle' justify='space-between'>
            <div className=''>
              <Row align='middle'>
                <Col>
                  <small>
                    <Link to='/'>
                      <HomeOutlined /> Back to home
                    </Link>
                  </small>
                </Col>
                <Divider type='vertical' />
                <Col>
                  <small>
                    Listed in category: <strong>{data.category}</strong>
                  </small>
                </Col>
              </Row>
            </div>
            <div className='fake-links hide-sm'>
              <Tag icon={<TwitterOutlined />} color='#55acee'>
                Twitter
              </Tag>
              <Tag icon={<YoutubeOutlined />} color='#cd201f'>
                Youtube
              </Tag>
              <Tag icon={<FacebookOutlined />} color='#3b5999'>
                Facebook
              </Tag>
              <Tag icon={<InstagramOutlined />} color='#55acee'>
                Instagram
              </Tag>
              <Tag icon={<AmazonOutlined />} color='#333'>
                Amazon
              </Tag>
            </div>
          </Row>
        </div>
        <div className='preview-body'>
          <Row gutter={6} justify='center'>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Carousel>
                {data.fileList.map((file, index) => {
                  return (
                    <div className='' key={index}>
                      <img src={file.thumbUrl} alt='product' />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <div className='middle-prev'>
                <div>
                  {data.estimatedDelivery ? (
                    <Tag color='green'>Ready to ship</Tag>
                  ) : null}
                  <Tag color='warning'>{data.format}</Tag>
                  {data.internationalShipping && (
                    <Tag color='' icon={<FlagOutlined />}>
                      International
                    </Tag>
                  )}
                  {data.shippingPrice <= 0 ? <Tag>Free shiping</Tag> : null}
                </div>
                <span
                  style={{ margin: '2px', fontSize: '21px', fontWeight: '600' }}
                >
                  {data.title}
                </span>
                <p style={{ margin: '2px' }}>{data.subtitle}</p>
                <Row align='middle'>
                  <Col>
                    <Rate />
                  </Col>
                  <Divider type='vertical' />
                  <Col>(0) Ratings</Col>
                  <Divider type='vertical' />
                  <Col>0 Sold</Col>
                </Row>
                <Divider style={{ margin: '2px 0' }} />
                <Row align='middle'>
                  <Col>
                    <div className='listing-preview'>
                      <Row style={{ margin: '1em 0' }} gutter={6}>
                        <Col>
                          <span>
                            Condition: <strong>{data.condition}</strong>
                          </span>
                        </Col>
                        <Col>
                          <span>
                            Quantity: <strong>{data.quantity} availabe</strong>
                          </span>
                        </Col>
                      </Row>

                      <p style={{ margin: '1em 0' }}>
                        Status: <strong>On Going</strong>
                      </p>
                      <p>
                        <Link>
                          <EyeOutlined /> watch this item
                        </Link>
                      </p>
                      <span>
                        Price:{' '}
                        <span className='price-details' title={data.price}>
                          US ${data.price}
                        </span>
                        <span style={{ color: '#777' }}>/Piece</span>
                      </span>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
                <Divider />
                <span style={{ fontSize: '13px' }}>
                  shippi.shop protects all orders made
                </span>
                <table className='prev-table'>
                  <tbody>
                    <tr>
                      <td>Returns:</td>
                      <td>
                        <span style={{ fontSize: '13px' }}>
                          {' '}
                          {data.returns
                            ? '30 day returns'
                            : 'Returns are not allowed'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Payments:</td>
                      <td>
                        {' '}
                        <PaymentIcons />
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>
                        <span style={{ fontSize: '13px' }}>
                          {data.shippingPrice <= 0
                            ? 'FREE shipping'
                            : `$${data.shippingPrice}`}{' '}
                          Domestic{' '}
                          {data.internationalShipping
                            ? '& international shipping'
                            : 'shipping'}{' '}
                          <Divider type='vertical' />{' '}
                          <span style={{ fontSize: '10px', color: '#555' }}>
                            International shipment of items may be subject to
                            customs processing and additional charges.
                          </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col xl={6} lg={6} md={8} sm={24}>
              <div className='checkout-box'>
                <span>
                  Arrives:{' '}
                  <strong>
                    {<Moment fromNow>{data.estimatedDelivery}</Moment>}
                  </strong>
                </span>
                <h4 className='stock-checkout'>in stock.</h4>
                <Form>
                  <Form.Item
                    label='Qty'
                    name='quantity'
                    rules={[
                      { required: true, message: 'Quantity is required' }
                    ]}
                  >
                    <Input
                      disabeled={true}
                      style={{ width: '50%' }}
                      type='number'
                      defaultValue={1}
                    />
                    <span style={{ color: '#c4c4c4' }}> /{data.quantity}</span>
                  </Form.Item>

                  <Divider dashed style={{ color: '#777', margin: '4px 0' }} />
                  <Row align='middle' justify='space-between'>
                    <Col>
                      <span style={{ marginRight: '2px' }}>Total</span>
                    </Col>
                    <Col>
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '22px',
                          marginRight: '2px'
                        }}
                      >
                        ${data.price}
                      </span>
                    </Col>
                  </Row>
                  <Form.Item style={{ display: 'block' }}>
                    <Button type='primary' icon={<CreditCardOutlined />}>
                      Buy it now
                    </Button>
                    <Button
                      type='default'
                      style={{
                        borderColor: '#89c9b8',
                        color: '#89c9b8',
                        marginTop: '1em'
                      }}
                      icon={<ShoppingCartOutlined />}
                    >
                      Add to cart
                    </Button>
                  </Form.Item>
                </Form>
                <span style={{ fontSize: '13px' }}>
                  <LockOutlined /> Secure Transaction
                </span>
                {data.itemLocation ? (
                  <p className='item-location'>
                    <EnvironmentOutlined /> item ships from{' '}
                    <Tooltip title={data.itemLocation} placement='top'>
                      <img
                        src={`https://www.countryflags.io/${getCode(
                          data.itemLocation
                        )}/shiny/64.png`}
                        style={{ width: '20px' }}
                      />
                    </Tooltip>
                  </p>
                ) : null}
                <Divider style={{ margin: '4px 0' }} dashed />
                <span style={{ fontWeight: '600', fontSize: '13px' }}>
                  {data.shippingPrice <= 0
                    ? 'FREE shipping'
                    : `$${data.shippingPrice}`}{' '}
                  by {data.nameOfService}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <div className='preview-description'>
          <Row justify='center' gutter={6}>
            <Col xl={16}>
              <Tabs>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Customer Reviews</Tab>
                </TabList>

                <TabPanel>
                  <div className='description-preview'>
                    <p>Seller assumes all responsibility for this listing.</p>
                    <div className='prev-spec'>
                      <Descriptions column={{ sm: 1, md: 2, lg: 3, xl: 3 }}>
                        <Descriptions.Item label='Condition'>
                          {data.condition}
                        </Descriptions.Item>
                        <Descriptions.Item label='Size'>
                          {data.size}
                        </Descriptions.Item>
                        <Descriptions.Item label='Model'>
                          {data.modelNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label='Color'>
                          <strong>{data.color}</strong>
                        </Descriptions.Item>
                        <Descriptions.Item label='Brand'>
                          <strong>{data.brandName}</strong>
                        </Descriptions.Item>
                        <Descriptions.Item label='Country Origin'>
                          {data.countryOrigin}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <p className='prev-desc'>{data.description}</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='cs-feedback'>
                    <Divider orientation='left'>0 Reviews</Divider>
                    <p>Product has no reviews yet</p>
                  </div>
                </TabPanel>
              </Tabs>
            </Col>
            <Col xl={6}>
              <div className='user-profile-view'>
                <h3 style={{ margin: '2px' }}>Seller information</h3>
                <List
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={data.user.avatar} alt='avatar' />}
                        title={<p>{item.title}</p>}
                        description={
                          <Link to={`/profile/${data.user.username}`}>
                            View profile
                          </Link>
                        }
                      ></List.Item.Meta>
                    </List.Item>
                  )}
                ></List>
                <Divider dashed />
                <p>
                  <Popover placement='bottom' title='Contact seller'>
                    <MailOutlined /> Contact seller
                  </Popover>
                </p>

                <p>
                  <Popover placement='bottom' title=''>
                    <ShopOutlined /> View other items
                  </Popover>
                </p>
                <p>
                  <Popover placement='bottom'>
                    <StarOutlined /> Give feedback
                  </Popover>
                </p>
              </div>{' '}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default View;
