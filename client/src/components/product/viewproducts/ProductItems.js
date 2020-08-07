import React from 'react';
import { Row, Col } from 'antd';
import CarouselItem from './CarouselItem';
import MinDetails from './MinDetails';
import ShippingDetail from './ShippingDetail';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ProductsPaginate from './ProductsPaginate';

const ProductItems = ({ items, page, setPage }) => {
  return (
    <div className='productItems'>
      {items && items.length <= 0 ? (
        <div style={{ padding: '1em' }}>
          <p style={{ fontSize: '16px' }}>
            <strong>No matches for item found</strong>
          </p>
          <p>
            Please input correct fields to match exactly what you are looking
            for
          </p>
        </div>
      ) : (
        <Row>
          {items &&
            items.map((product) => {
              return (
                <Col
                  key={product._id}
                  xl={6}
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className='item'
                >
                  <CarouselItem product={product} />
                  <Link to='#'>
                    <span
                      style={{
                        fontSize: '16px',
                        display: 'block'
                      }}
                      className='title'
                    >
                      {product.title}
                    </span>
                  </Link>
                  <Row align='middle' justify='space-between'>
                    <Col>
                      <span
                        style={{
                          fontWeight: '700',
                          fontSize: '17px',
                          display: 'block'
                        }}
                      >
                        ${product.price}
                        <span
                          style={{
                            display: 'inline',
                            color: '#999999',
                            fontSize: '12px',
                            fontWeight: 'normal'
                          }}
                        >
                          /piece
                        </span>
                        <span
                          style={{
                            display: 'block',
                            color: '#dddddd',
                            fontWeight: 'normal',
                            fontSize: '14px',
                            marginTop: '-0.2em'
                          }}
                        >
                          {product.format}
                        </span>
                      </span>
                    </Col>

                    <Col>
                      <ShippingDetail
                        shippingDetails={product.shippingDetails}
                      />
                    </Col>
                  </Row>
                  <MinDetails item={product} />
                  <Row
                    align='middle'
                    justify='space-between'
                    style={{ marginTop: '1em' }}
                  >
                    <Col>
                      {product.watchers.length > 0 ? (
                        <span
                          style={{
                            display: 'inline',
                            color: '#cd201f',
                            fontSize: '12px',
                            fontWeight: 'normal'
                          }}
                        >
                          {product.watchers.length} watcher(s)
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Moment fromNow>{product.lastUpdated}</Moment>
                    </Col>
                  </Row>
                </Col>
              );
            })}
        </Row>
      )}
      <ProductsPaginate items={items} page={page} setPage={setPage} />
    </div>
  );
};

export default ProductItems;
