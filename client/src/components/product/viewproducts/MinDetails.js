import React from 'react';
import { Tag, Row, Col, Tooltip } from 'antd';
import { getCode } from 'country-list';
import { FlagOutlined } from '@ant-design/icons';
import Moment from 'react-moment';

const MinDetails = ({ item }) => {
  // get the country code of the item location
  const countryCode = getCode(item.shippingDetails.itemLocation);

  return (
    <div>
      <Row>
        {item.shippingDetails.itemLocation && (
          <Col>
            <Tooltip
              placement='bottom'
              title={`This item is located in ${item.shippingDetails.itemLocation}`}
            >
              <Tag>
                <img
                  src={`https://www.countryflags.io/${countryCode}/shiny/64.png`}
                  alt='country flag'
                  style={{ width: '18px' }}
                />{' '}
                {countryCode}
              </Tag>
            </Tooltip>
          </Col>
        )}
        {}
      </Row>
    </div>
  );
};

export default MinDetails;
