import React from 'react';
import BestProductsList from './BestProductsList';
import SubInfluencer from './SubInfluencer';
import BestInfluencerList from './BestInfluencerList';
import ReviewList from './ReviewList';
import Banner from './swiper/Banner';
import "./style.css"
import UpButton from '../common/button/UpButton';

function Main() {
  return (
    <div className="p-5 max-w-[1200px] mx-auto flex flex-col gap-y-5 mb-[80px]">
      <Banner />
      <SubInfluencer/>
      <hr />
      <BestProductsList/>
      <hr />
      <BestInfluencerList/>
      <hr />
      <ReviewList/>
      <UpButton/>
    </div>
  );
}

export default Main;
