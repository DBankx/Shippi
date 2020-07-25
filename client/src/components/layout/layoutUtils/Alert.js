import React, { Fragment } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';

const AlertSet = ({ alerts }) => {
  return (
    <div className='alert'>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div className='alert-box' key={alert.id}>
              <Alert
                message={alert.message}
                description={alert.description}
                type={alert.type}
                showIcon
              />
            </div>
          );
        })}
    </div>
  );
};

// get the state
const mapState = (state) => ({
  alerts: state.alerts
});

export default connect(mapState)(AlertSet);