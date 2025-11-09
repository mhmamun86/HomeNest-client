import React from 'react';
import HeroSlider from './headers/HeroSlider';
import FeaturedState from './FeaturedListing';

const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <HeroSlider></HeroSlider>
      <FeaturedState></FeaturedState>
    </div>
  );
};

export default Home;
