import { FaLocationDot } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  const formattedPrice =
    listing.category === 'Rental'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${listing.price.toLocaleString()}`;

  return (
    <div
      className="card w-full h-full bg-base-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
      data-aos="fade-up"
    >
      <figure className="aspect-video w-full">
        <img
          src={listing.imageLink}
          alt={listing.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-0 pt-0  flex flex-col  justify-between">
        <div className="card-content p-5 rounded-b-2xl">
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl text-secondary-content">
              {listing.propertyName}
            </h2>
            <div className="badge badge-accent text-xs font-semibold uppercase">
              {listing.category}
            </div>
          </div>

          <div className="text-lg font-bold text-accent mb-2 flex items-center gap-1">
            <AiFillDollarCircle className="w-5 h-5 text-primary" />
            {formattedPrice}
          </div>
          <p className="flex items-center text-base-300 mb-3 text-sm">
            <FaLocationDot className="w-4 h-4 mr-1" />
            {listing.location}
          </p>
          <p className="text-base-300 text-sm mb-4 line-clamp-3">
            {listing.description}
          </p>
        </div>

        <div className="card-actions justify-end items-center mt-3">
          <Link
            to={`/propertie-details/${listing._id}`}
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
