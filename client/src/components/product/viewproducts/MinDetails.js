import React from 'react';
import { Tag, Row, Col, Tooltip } from 'antd';
import { getCode } from 'country-list';
import {
  FlagOutlined,
  StarFilled,
  StarOutlined,
  EyeOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const MinDetails = ({ item }) => {
  return (
    <div>
      <Row align='middle' gutter={6}>
        {item.shippingDetails.itemLocation && (
          <Col>
            <Tooltip
              placement='bottom'
              title={`This item is located in ${item.shippingDetails.itemLocation}`}
            >
              <Tag>
                <img
                  src={`https://www.countryflags.io/${getCode(
                    item.shippingDetails.itemLocation
                  )}/shiny/64.png`}
                  alt='country flag'
                  style={{ width: '18px' }}
                />{' '}
                {getCode(item.shippingDetails.itemLocation)}
              </Tag>
            </Tooltip>
          </Col>
        )}
        {item.feedback.length <= 0 ? null : (
          <Col>
            <Tooltip
              title={`${item.feedback.length} review(s)`}
              placement='bottom'
            >
              <Tag color='green'>
                {item.feedback.length} <StarOutlined />
              </Tag>
            </Tooltip>
          </Col>
        )}
        {item.shippingDetails.internationalShipping === true && (
          <Col>
            <Tooltip
              title='Seller allows international Shipping'
              placement='bottom'
            >
              <Tag icon={<GlobalOutlined />}>International</Tag>
            </Tooltip>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MinDetails;
