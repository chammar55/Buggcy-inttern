import React from "react";
import Star from "./Star";

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} filled />;
        }
        if (i === fullStars && halfStar) {
          return <Star key={i} filled half />;
        }
        return <Star key={i} />;
      })}
    </div>
  );
};

export default Rating;
