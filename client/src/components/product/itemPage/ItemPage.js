import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItemById } from '../../../actions/product';
import Spinner from '../../layout/layoutUtils/Spinner';
import { Row, Col } from 'antd';
import ItemImages from './ItemImages';

const ItemPage = ({ match, getItemById, product: { loading, item } }) => {
  useEffect(() => {
    getItemById(match.params.itemId);
  }, [getItemById, match.params.itemId]);

  return (
    <div>
      {!loading && item ? (
        <div>
          <Row>
            <Col>
              <ItemImages item={item} />
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapState = ({ product }) => ({
  product
});

export default connect(mapState, { getItemById })(ItemPage);