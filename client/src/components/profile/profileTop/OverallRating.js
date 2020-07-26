import React, { Fragment } from 'react';
import { Rate } from 'antd';

const OverallRating = ({ feedback, role }) => {
  const ratings = [];

  // add all the ratings to the array
  feedback.map((feedback) => ratings.push(feedback.rating));

  //   get the average of the array
  const sumOfNumsInRatings = ratings.reduce((a, b) => a + b, 0);
  const average = Math.floor(sumOfNumsInRatings / ratings.length);

  //   the descriptions of the rating system
  const desc = [
    `Novice ${role}`,
    `Normal ${role}`,
    `Average ${role}`,
    `Good ${role}`,
    `Expert ${role}`
  ];

  return (
    <Fragment>
      {feedback.length > 0 ? (
        <div>
          <Rate tooltips={desc} disabled defaultValue={average} allowHalf />
          <p> {desc[average - 1]}</p>
        </div>
      ) : (
        <small>No feedback</small>
      )}
    </Fragment>
  );
};

export default OverallRating;
