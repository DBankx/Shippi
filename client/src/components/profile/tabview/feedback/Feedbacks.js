import React from 'react';
import { Comment, Tooltip, Avatar, Rate, Divider } from 'antd';
import Moment from 'react-moment';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteFeedback } from '../../../../actions/profile';
import { connect } from 'react-redux';

const Feedbacks = ({ profile, user, deleteFeedback }) => {
  return (
    <div>
      <Divider orientation='left'>{profile.feedback.length} Feedbacks</Divider>
      {profile.feedback.length > 0
        ? profile.feedback.map((feedback) => {
            return (
              <Comment
                //   check if the user made the comment
                actions={
                  user && user._id === feedback.user
                    ? [
                        <Tooltip title='Delete feedback'>
                          <span
                            onClick={() =>
                              deleteFeedback(profile._id, feedback._id)
                            }
                          >
                            <DeleteOutlined />
                          </span>
                        </Tooltip>
                      ]
                    : null
                }
                key={feedback._id}
                author={feedback.username}
                avatar={<Avatar src={feedback.avatar} alt='avatar' />}
                content={
                  <div className='comment'>
                    <Rate disabled defaultValue={feedback.rating} allowHalf />
                    {feedback.comment ? <p>{feedback.comment}</p> : null}
                  </div>
                }
                datetime={<Moment fromNow>{feedback.date}</Moment>}
              />
            );
          })
        : 'There are no feedbacks yet'}
    </div>
  );
};

export default connect(null, { deleteFeedback })(Feedbacks);
