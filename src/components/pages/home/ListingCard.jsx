import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosBed } from 'react-icons/io';
import { MdBathtub } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  const formattedPrice =
    listing.category === 'Rental'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${listing.price.toLocaleString()}`;

  const hasBedBath = listing.beds !== null && listing.baths !== null;

  return (
    <div
      className="card w-full h-full bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
      data-aos="fade-up"
      data-aos-delay={listing._id * 100}
    >
      <figure className="aspect-video w-full">
        <img
          src={listing.img}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl text-secondary">
              {listing.name}
            </h2>
            <div className="badge badge-accent text-xs font-semibold uppercase">
              {listing.category}
            </div>
          </div>

          <div className="text-lg font-bold text-primary mb-2 flex items-center gap-1">
            <AiFillDollarCircle className="w-5 h-5 text-primary" />
            {formattedPrice}
          </div>
          <p className="flex items-center text-gray-600 mb-3 text-sm">
            <FaLocationDot className="w-4 h-4 mr-1" />
            {listing.location}
          </p>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {listing.desc}
          </p>
        </div>

        <div className="card-actions justify-between items-center mt-3">
          {hasBedBath && (
            <div className="flex gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1 font-medium">
                <IoIosBed className="w-4 h-4" /> {listing.beds}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <MdBathtub className="w-4 h-4" />
                {listing.baths}
              </span>
            </div>
          )}
          <Link
            to={`/properties/${listing._id}`}
            className="btn btn-sm btn-primary transition duration-300"
          >
            View Details <FaArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
