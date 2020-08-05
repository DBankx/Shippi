import React from 'react';
import { connect } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Watching = ({ ratings, auth: { user } }) => {
  // check if user is watching a product
  var isWatched;
  console.log(ratings);

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
      {isWatched == null ? (
        <Link to='#' className='watch'>
          <span>
            <EyeOutlined /> watch
          </span>
        </Link>
      ) : (
        <Link to='#' className='watch'>
          <span>
            <EyeInvisibleOutlined /> unwatch
          </span>
        </Link>
      )}
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(Watching);
