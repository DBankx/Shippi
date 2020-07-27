import React, { useState } from 'react';
import { Rate, Comment, Avatar, Button, List, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { addFeedback } from '../../../../actions/profile';

const { TextArea } = Input;

const FeedbackInput = ({ profile, auth, addFeedback }) => {
  const [rating, setRate] = useState(0);
  const [comment, setComment] = useState('');

  function handleRate(value) {
    setRate(value);
  }
  function handleChange({ target }) {
    setComment(target.value);
  }

  const [click, setClick] = useState(false);

  return (
    //   check if user is logged in and if user is on his profile
    <div>
      {auth && auth.isAuthenticated === true ? (
        auth.user && auth.user._id !== profile.user._id ? (
          <div className='feedback-profile-form'>
            <p>
              Give {profile.username} a feedback{' '}
              <Button
                shape='circle'
                icon={!click ? <PlusOutlined /> : <MinusOutlined />}
                onClick={() => setClick(!click)}
                type='primary'
                style={{ marginLeft: '1em' }}
              ></Button>
            </p>
            {click ? (
              <Form
                initialValues={{
                  remember: true
                }}
                onFinish={() => {
                  addFeedback(rating, comment, profile._id);
                }}
              >
                <Form.Item>
                  <Rate
                    onChange={handleRate}
                    value={rating}
                    name='rating'
                    allowHalf
                    rules={[
                      {
                        required: true,
                        message: 'Rating is required'
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    rows={4}
                    onChange={handleChange}
                    value={comment}
                    name='comment'
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType='submit' type='primary'>
                    Give Feedback
                  </Button>
                </Form.Item>
              </Form>
            ) : null}
          </div>
        ) : null
      ) : (
        <Link to='/login'>Login to leave a feedback</Link>
      )}
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { addFeedback })(FeedbackInput);
