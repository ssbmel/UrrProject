import React from 'react';
import Banner from './Banner';
import BestProductsList from './BestProductsList';
import SubInfluencer from './SubInfluencer';
import BestInfluencerList from './BestInfluencerList';
import ReviewList from './ReviewList';

function Main() {
  return (
    <>
      <Banner />
      <SubInfluencer/>
      <BestProductsList/>
      <BestInfluencerList/>
      <ReviewList/>
    </>
  );
}

export default Main;
