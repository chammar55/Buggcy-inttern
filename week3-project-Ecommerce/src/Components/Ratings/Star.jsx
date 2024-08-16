import React from 'react';

const Star = ({ filled }) => {
  return (
    <span style={{ color: filled ? 'gold' : 'gray' }}>
      {filled ? '★' : '☆'}
    </span>
  );
};

export default Star;
