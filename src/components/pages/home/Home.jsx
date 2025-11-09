import React from 'react';
import HeroSlider from './headers/HeroSlider';
import FeaturedState from './FeaturedListing';
import WhyChooseUs from './WhyChooseUs';
import MarketInsights from './MarketInsights';
import OwnerCTA from './OwnerCTA';

const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <HeroSlider></HeroSlider>
      <FeaturedState></FeaturedState>
      <WhyChooseUs></WhyChooseUs>
      <MarketInsights></MarketInsights>
      <OwnerCTA></OwnerCTA>
    </div>
  );
};

export default Home;
