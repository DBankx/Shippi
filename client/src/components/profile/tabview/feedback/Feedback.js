import React from 'react';
import FeedbackInput from './FeedbackInput';
import Feedbacks from './Feedbacks';
const Feedback = ({ profile, user }) => {
  return (
    <div>
      <FeedbackInput user={user} profile={profile} />
      <Feedbacks profile={profile} user={user} />
    </div>
  );
};

export default Feedback;
