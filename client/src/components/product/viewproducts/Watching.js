import React from 'react';
import { connect } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { watchItem } from '../../../actions/product';

const Watching = ({
  ratings,
  auth: { user, isAuthenticated, loading },
  watchItem,
  id
}) => {
  // check if user is watching a product
  var isWatched;

  async function isWatching() {
    if (user !== null) {
      isWatched = ratings.find((rating) => rating.user === user._id);
    } else {
      isWatched = null;
    }
  }

  isWatching();

  return (
    <div>
      {!loading && isAuthenticated && user !== null ? (
        isWatched == null ? (
          <Link to='#' className='watch'>
            <span onClick={() => watchItem(id)}>
              <EyeOutlined /> watch
            </span>
          </Link>
        ) : (
          <Link to='#' className='watch'>
            <span>
              <EyeInvisibleOutlined /> unwatch
            </span>
          </Link>
        )
      ) : null}
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { watchItem })(Watching);
