import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import { FaCircleInfo, FaLocationDot } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';

const MyListingCard = ({ listing, onDelete }) => {
  const navigate = useNavigate();

  const formattedPrice =
    listing.category === 'Rental'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${listing.price.toLocaleString()}`;
  const posted = new Date(listing.createdAt).toLocaleDateString();

  return (
    <div
      className="card w-full h-full bg-base-100 shadow-xl overflow-hidden border border-gray-200"
      data-aos="fade-up"
    >
      <figure className="aspect-video w-full">
        <img
          src={listing.imageLink}
          alt={listing.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-xl text-secondary mb-1">
            {listing.propertyName}
          </h2>
          <div className="badge badge-accent text-xs font-semibold uppercase mb-3">
            {listing.category}
          </div>

          <p className="text-lg font-bold text-primary mb-2 flex items-center gap-1">
            <FaDollarSign className="w-5 h-5 text-primary" />
            {formattedPrice}
          </p>

          <div className="text-gray-600 space-y-1 text-sm mb-4">
            <p className="flex items-center">
              <FaLocationDot className="w-4 h-4 mr-1 text-primary/70" />{' '}
              {listing.location}
            </p>
            <p className="font-medium">Posted: {posted}</p>
          </div>
        </div>

        <div className="card-actions justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
          <button
            className="btn btn-sm btn-outline btn-primary hover:bg-primary transition duration-300"
            onClick={() => navigate(`/properties/${listing.id}`)}
          >
            <FaCircleInfo className="w-4 h-4" /> Details
          </button>
          <button
            className="btn btn-sm btn-primary transition duration-300"
            onClick={() =>
              toast.info(
                `Pretending to navigate to Update Page for ${listing.propertyName}`
              )
            }
          >
            <GrUpdate className="w-4 h-4" />
            Update
          </button>
          <button
            className="btn btn-sm btn-error transition duration-300"
            onClick={() => onDelete(listing.id, listing.name)}
          >
            <RiDeleteBin5Fill className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListingCard;
