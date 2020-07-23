import React from 'react';
import { Row, Col, Button, Badge } from 'antd';
import { Link } from 'react-router-dom';

const TopBanner = () => {
  return (
    <div className='banner'>
      <div className='container'>
        <Row align='middle' justify='center' className='banner'>
          <Col span={12} xl={9} lg={12} md={16} xs={24} sm={16}>
            <div className='banner-info'>
              <h1>The best p2p ecommerce platform across the globe</h1>
              <ul>
                <li>
                  <Button type='primary'>Shop now</Button>
                </li>
                <li>
                  <Badge dot offset={[0, 5]}>
                    <Link to='/register'>Register & start selling</Link>
                  </Badge>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12} md={8} xl={8} lg={8} xs={0} sm={8}></Col>
        </Row>
      </div>
    </div>
  );
};

export default TopBanner;
