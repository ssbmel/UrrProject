"use client";

import React, { useState } from 'react';
import Full from "../../../../../public/icon/star-rating/fulls.svg"
import Half from "../../../../../public/icon/star-rating/halfs.svg"
import Empty from "../../../../../public/icon/star-rating/emptys.svg"

type RatingProps = {
  count?: number;
  value?: number;
  onChange?: (value: number) => void;
};

const FullStar: React.FC = () => <span style={{ fontSize: '2rem', color: '#ffc107' }}><Full/></span>;
const HalfStar: React.FC = () => <span style={{ fontSize: '2rem', color: '#ffc107' }}><Half/></span>; // 여기에 HalfStar 아이콘을 대체
const EmptyStar: React.FC = () => <span style={{ fontSize: '2rem', color: '#e4e5e9' }}><Empty/></span>;

const Rating: React.FC<RatingProps> = ({ count = 5, value = 0, onChange }) => {
  const [currentValue, setCurrentValue] = useState<number>(value);

  const handleClick = (index: number) => {
    let newValue = currentValue;

    // 클릭 시 현재 상태에 따라 빈별 -> 반별 -> 꽉찬별 순으로 상태 변경
    if (currentValue === index + 0.5) {
      newValue = index + 1;
    } else if (currentValue === index + 1) {
      newValue = index + 0;
    } else {
      newValue = index + 0.5;
    }

    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const getStarType = (index: number) => {
    const ratingValue = index + 1;

    if (currentValue >= ratingValue) {
      return <FullStar />;
    } else if (currentValue >= ratingValue - 0.5) {
      return <HalfStar />;
    } else {
      return <EmptyStar />;
    }
  };

  return (
    <div className="flex justify-center">
      {[...Array(count)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer text-2xl"
          onClick={() => handleClick(index)}
        >
          {getStarType(index)}
        </span>
      ))}
    </div>
  );
};

export default Rating;