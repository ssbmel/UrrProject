import React from 'react';
import Banner from './Banner';
import BestProductsList from './BestProductsList';
import SubInfluencer from './SubInfluencer';
import BestInfluencerList from './BestInfluencerList';
import ReviewList from './ReviewList';

function Main() {
  return (
    <div className="p-5 max-w-[1200px] mx-auto">
      <Banner />
      <SubInfluencer/>
      <BestProductsList/>
      <BestInfluencerList/>
      <ReviewList/>
    </div>
  );
}

export default Main;
