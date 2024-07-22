import React from 'react';
import SectionCard from './SectionCard';
import Tabs from './Tabs';

const Section = () => {
  return (
    <div>
      <div>
        <Tabs />
        <h1>섹션 이름</h1>
        <span>더보기 😊</span>
        <SectionCard />
      </div>
    </div>
  );
};

export default Section;
