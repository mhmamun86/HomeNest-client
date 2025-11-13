import React from 'react';
import { FaArrowAltCircleRight, FaDollarSign } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router';

const PropertiesCard = ({ listing }) => {
  const formattedPrice =
    listing.category === 'Rental'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${listing.price.toLocaleString()}`;

  return (
    <div
      className="card w-full h-full bg-base-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
      data-aos="fade-up"
    >
      <figure className="aspect-video w-full">
        <img
          src={listing.imageLink}
          alt={listing.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-5 card-content flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl text-secondary line-clamp-2">
              {listing.propertyName}
            </h2>
            <div className="badge badge-accent text-xs font-semibold uppercase">
              {listing.category}
            </div>
          </div>

          <div className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
            <h2 className="text-neutral text-xl font-normal">Price: </h2>{' '}
            {formattedPrice}
          </div>

          <p className="flex gap-2 items-center text-base-300 mb-3 text-sm">
            <h2 className="text-neutral ">Location:</h2>
            <p className="line-clamp-2"> {listing.location}</p>
          </p>

          <p className="text-sm text-base-300 mt-2">
            Posted by:{' '}
            <span className="font-semibold text-secondary">{listing.name}</span>
          </p>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/propertie-details/${listing._id}`}
            className="btn btn-sm btn-primary transition duration-300"
          >
            See Details <FaArrowAltCircleRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertiesCard;
