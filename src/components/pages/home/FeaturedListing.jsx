import React from 'react';
import { Link } from 'react-router';
import ListingCard from './ListingCard';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedListing } from '../../../Api/api';

const FeaturedListing = () => {
  const { data } = useQuery({
    queryKey: ['post'],
    queryFn: fetchFeaturedListing,
  });
  const ListingItems = data;

  return (
    <section className="py-16 bg-base-200/50" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4">
          Explore Our <span className="text-primary">Featured Homes</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Hand-picked properties, updated hourly based on newest arrivals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {ListingItems?.map(listing => (
            <ListingCard key={listing._id} listing={listing}></ListingCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="btn btn-primary btn-outline btn-lg font-semibold hover:bg-primary hover:text-white transition duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListing;
