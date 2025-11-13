import React from 'react';

const RatingCard = ({ rating }) => {
  return (
    <div
      className="card lg:card-side bg-base-100 shadow-xl border border-gray-100"
      data-aos="fade-up"
    >
      <figure className="h-48 lg:h-auto lg:w-48 flex-shrink-0">
        <img
          src={rating.propertyImage}
          alt={rating.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6 w-full">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-2xl text-secondary line-clamp-2">
            {rating.propertyName}
          </h3>
          <span className="text-sm text-neutral font-medium">
            Reviewed: {new Date(rating.reviewed).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="rating rating-sm">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`mask mask-star-2 w-5 h-5 ${
                  i < rating.rating ? 'bg-success' : 'bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
          <span className="text-base-300 font-bold">({rating.rating} / 5)</span>
        </div>
        <p className="text-base-300 italic mb-4 line-clamp-5">
          "{rating.review}"
        </p>
        <p className="text-sm font-semibold text-base-300 border-t pt-2 mt-2">
          Reviewer: <span className="text-primary">{rating.reviewerName}</span>
        </p>
        {/* <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-sm btn-outline btn-info transition duration-300 gap-2"
            onClick={() => handleUpdate(rating)}
          >
            <FaRegEdit className="w-4 h-4" /> Update
          </button>
          <button
            className="btn btn-sm btn-outline btn-error transition duration-300 gap-2"
            onClick={() => handleDelete(rating)}
          >
            <RiDeleteBin6Fill className="w-4 h-4" /> Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default RatingCard;
