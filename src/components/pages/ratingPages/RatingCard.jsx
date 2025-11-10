import React from 'react';
import { FaRegEdit, FaStar } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const RatingCard = ({ rating, onDelete, onUpdate }) => {
  return (
    <div
      className="card lg:card-side bg-base-100 shadow-xl border border-gray-100"
      data-aos="fade-up"
    >
      <figure className="h-48 lg:h-auto lg:w-48 flex-shrink-0">
        <img
          src={rating.propertyImg}
          alt={rating.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6 w-full">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-2xl text-secondary">
            {rating.propertyName}
          </h3>
          <span className="text-sm text-gray-500 font-medium">
            Posted: {rating.reviewDate}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="rating rating-sm">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`mask mask-star-2 w-4 h-4 ${
                  i < rating.rating ? 'text-warning' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-primary font-bold">({rating.rating} / 5)</span>
        </div>
        <p className="text-gray-700 italic mb-4">"{rating.reviewText}"</p>
        <p className="text-sm font-semibold text-gray-800 border-t pt-2 mt-2">
          Reviewer: <span className="text-primary">{rating.reviewerName}</span>
        </p>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-sm btn-outline btn-info transition duration-300 gap-2"
            onClick={() => onUpdate(rating)}
          >
            <FaRegEdit className="w-4 h-4" /> Update
          </button>
          <button
            className="btn btn-sm btn-outline btn-error transition duration-300 gap-2"
            onClick={() => onDelete(rating.id)}
          >
            <RiDeleteBin6Fill className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default RatingCard;
