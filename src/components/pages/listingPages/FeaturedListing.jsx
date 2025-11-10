import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedListing } from '../../../Api/api';
import ListingCard from './ListingCard';
import Heading from '../../common/Heading';
const FeaturedListing = () => {
  const { data: ListingItems = [], isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: fetchFeaturedListing,
  });

  return (
    <section className="py-16 bg-base-200/50" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <Heading
          title={'Explore Our'}
          highlight={'Featured Homes'}
          subtitle={
            'Hand-picked properties, updated hourly based on newest arrivals.'
          }
        ></Heading>
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
