import React from 'react';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  AntDesignOutlined
} from '@ant-design/icons';
import { Row, Col } from 'antd';

const ProductsPaginate = ({ items, page, setPage }) => {
  return (
    <div style={{ padding: '1em' }}>
      {items && items.length <= 0 ? null : (
        <Row gutter={24} align='middle' justify='center'>
          {page <= 0 ? null : (
            <Col>
              <div className='action-box' onClick={() => setPage(page - 1)}>
                <CaretLeftOutlined />
              </div>
            </Col>
          )}

          <Col>
            <strong>page {page}</strong>
          </Col>
          {items && items.length < 8 ? null : (
            <Col>
              <div className='action-box' onClick={() => setPage(page + 1)}>
                <CaretRightOutlined />
              </div>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default ProductsPaginate;
