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
  Input
} from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  TwitterSquareFilled,
  AmazonSquareFilled,
  InstagramFilled,
  YoutubeFilled,
  FacebookFilled,
  MailOutlined,
  StarOutlined,
  ShopOutlined,
  EyeOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import PaymentIcons from './PaymentIcons';
import Moment from 'react-moment';

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
              <Row align='middle' gutter={8}>
                <Col>
                  <TwitterSquareFilled
                    style={{ fontSize: '20px', color: '#0e6cff' }}
                  />
                </Col>
                <Col>
                  <AmazonSquareFilled
                    style={{ fontSize: '20px', color: '#000' }}
                  />
                </Col>
                <Col>
                  <InstagramFilled
                    style={{ fontSize: '20px', color: '#DD2A7B' }}
                  />
                </Col>
                <Col>
                  <FacebookFilled
                    style={{ fontSize: '20px', color: '#3B5998' }}
                  />
                </Col>
                <Col>
                  <YoutubeFilled
                    style={{ fontSize: '20px', color: '#c4302b' }}
                  />
                </Col>
              </Row>
            </div>
          </Row>
        </div>
        <div className='preview-body'>
          <Row gutter={6}>
            <Col xl={8}>
              <Carousel>
                {data.fileList.map((file, index) => {
                  return (
                    <div className='' key={index}>
                      <img src={file.thumbUrl} alt='product-image' />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            <Col xl={8}>
              <div className=''>
                {data.shippingPrice ? (
                  <Tag color='green'>Ready to ship</Tag>
                ) : null}
                {data.shippingPrice <= 0 && <Tag>Free shipping</Tag>}
              </div>
              <span style={{ margin: '2px', fontSize: '21px' }}>
                {data.title}
              </span>
              <p style={{ margin: '2px' }}>{data.subtitle}</p>
              <Row align='middle'>
                <Col>
                  <Rate />
                </Col>
                <Divider type='vertical' />
                <Col>(0) Ratings</Col>
              </Row>
              <Divider style={{ margin: '2px 0' }} />
              <Row align='middle'>
                <Col>
                  <div className='listing-preview'>
                    <p>
                      Condition: <strong>{data.condition}</strong>
                    </p>

                    <span>
                      Quantity:{' '}
                      <strong>{data.quantity} availabe/ 0 sold</strong>
                    </span>

                    <p>
                      Status: <strong>On Going</strong>
                    </p>
                    <span>
                      Price:{' '}
                      <span className='price-details' title={data.price}>
                        US ${data.price}
                      </span>
                      <span style={{ color: '#777' }}>/Piece</span>
                    </span>
                    <Tag color='#89c9b8'>
                      <EyeOutlined /> watch this item
                    </Tag>
                  </div>
                  <div className='user-profile-view'>
                    <h3 style={{ margin: '2px' }}>Seller information</h3>
                    <List
                      dataSource={listData}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar src={data.user.avatar} alt='avatar' />
                            }
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
                        <StarOutlined />
                        Give feedback
                      </Popover>
                    </p>
                  </div>
                </Col>
                <Col></Col>
              </Row>
              <Divider />
              <Descriptions column={1}>
                <Descriptions.Item label='returns'>
                  {data.returns ? '30 day returns' : 'Returns are not allowed'}
                </Descriptions.Item>
                <Descriptions.Item label='Payment'>
                  <PaymentIcons />
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xl={6}>
              <div className='checkout-box'>
                <span>
                  Arrives:{' '}
                  <strong>
                    {<Moment fromNow>{data.estimatedDelivery}</Moment>}
                  </strong>
                </span>
                <h4>in stock.</h4>
                <Form.Item
                  label='Qty'
                  name='quantity'
                  rules={[{ required: true, message: 'Quantity is required' }]}
                >
                  <Input
                    disabeled={true}
                    style={{ width: '5opx' }}
                    type='number'
                    defaultValue={1}
                  />
                </Form.Item>
                <Button type='default' icon={<CreditCardOutlined />}>
                  Buy it now
                </Button>
                <Button type='primary' icon={<ShoppingCartOutlined />}>
                  Add to cart
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default View;
