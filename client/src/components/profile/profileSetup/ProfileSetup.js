import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'Setup contact info',
    content: 'hey first contact'
  },
  {
    title: 'Setup company info',
    content: 'setup company info'
  },
  {
    title: 'Add socials',
    content: 'add socials'
  }
];

const ProfileSetup = () => {
  const [current, setCurrent] = useState(0);

  function next() {
    setCurrent(current + 1);
  }

  function prev() {
    setCurrent(current - 1);
  }

  return (
    <div className='container'>
      <Steps current={current}>
        <Step tile='first Step' />
        <Step tile='second Step' />
        <Step tile='third Step' />
      </Steps>
      <div className='steps-content'>{steps[current].content}</div>
      <div className='steps-actions'>
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' onClick={() => console.log('done')}>
            Done
          </Button>
        )}

        {current > 0 && (
          <Button type='primary' onClick={() => prev()}>
            Prev
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
