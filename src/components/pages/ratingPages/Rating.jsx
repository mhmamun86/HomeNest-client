import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRatings, insertRating } from '../../../Api/api';
import Spinner from '../../common/Spinner';

const mockReviews = [
  {
    id: 1,
    userId: 'user-1',
    name: 'Sarah J.',
    rating: 5,
    review:
      'Excellent property! The location is superb and the owner was very responsive. Highly recommend HomeNest for finding quality rentals.',
    date: '2025-10-25',
  },
  {
    id: 2,
    userId: 'user-def-456',
    name: 'Mike T.',
    rating: 4,
    review:
      'The home was as described, though the backyard needs a little work. Overall a smooth transaction and fair price.',
    date: '2025-10-20',
  },
  {
    id: 3,
    userId: 'user-ghi-789',
    name: 'Community Living Trust',
    rating: 5,
    review:
      'Fantastic commercial opportunity. Prime location in the downtown core. Five stars for investment potential!',
    date: '2025-09-15',
  },
];

const Rating = ({ property }) => {
  const { user } = useContext(AuthContext);
  const { data: reviewData, isLoading } = useQuery({
    queryKey: ['all-ratings'],
    queryFn: fetchRatings,
  });
  const queryClient = useQueryClient();
  const [form, setForm] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [myReviewText, setMyReviewText] = useState('');
  const highlightStyle = 'text-primary';

  const addReview = useMutation({
    mutationFn: data => insertRating(data),
    onSuccess: (res, data) => {
      console.log(data, res);
      queryClient.setQueryData(['all-ratings'], oldData => {
        return [...oldData, data];
      });
      if (data.insertedId) {
        toast.success('Review submitted successfully! Thank you.', {
          position: 'top-center',
        });
        form.target.reset();
      }
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleReviewSubmit = e => {
    e.preventDefault();
    setForm(e);
    if (myRating === 0) {
      toast.error('Please select a star rating.', { position: 'top-center' });
      return;
    }
    const data = {
      propertyId: property._id,
      propertyName: property.propertyName,
      propertyImage: property.imageLink,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      rating: myRating,
      review: myReviewText,
      reviewed: new Date().toISOString(),
    };
    addReview.mutate(data);
    setMyRating(0);
    setMyReviewText('');
  };

  const hasReviewed = reviewData?.some(
    review => review.reviewerEmail === user.email
  );

  return (
    <section
      className="flex flex-col md:flex-row justify-between items-center mt-12 max-w-7xl mx-auto p-6 bg-base-100 rounded-lg shadow-xl border border-gray-200"
      data-aos="fade-up"
    >
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
            Ratings & <span className={highlightStyle}>Reviews</span>
          </h3>
        </div>
        <div className="space-y-6 mb-10">
          {reviewData.length === 0 ? (
            <div className="alert alert-info text-secondary bg-accent/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                This property has no review , write your review bellow.
              </span>
            </div>
          ) : (
            reviewData.map(review => (
              <div key={review._id} className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={`https://i.pravatar.cc/150?u=${review._id}`}
                        alt={review.reviewerName}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">
                      {review.reviewerName}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(review.reviewed).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="rating rating-sm mb-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${review.id}`}
                      className={`mask mask-star-2 ${
                        i <= review.rating ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      checked={i === review.rating}
                      readOnly
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex-1">
        {user ? (
          !hasReviewed ? (
            <div className="mt-8 ">
              <h4 className="text-xl font-semibold text-secondary mb-4">
                Submit Your Review
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-secondary">
                      Your Rating ({myRating} stars)
                    </span>
                  </label>
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map(i => (
                      <input
                        key={i}
                        type="radio"
                        name="rating-input"
                        className="mask mask-star-2 bg-primary"
                        checked={myRating === i}
                        onChange={() => setMyRating(i)}
                      />
                    ))}
                  </div>
                </div>
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text font-medium text-secondary mb-2.5">
                      Write Review
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 focus:border-primary focus:ring-primary"
                    placeholder="Share your experience "
                    value={myReviewText}
                    onChange={e => setMyReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                  Post Review
                </button>
              </form>
            </div>
          ) : (
            <div className="alert alert-info text-secondary bg-accent/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                You have already submitted a review for this property.
              </span>
            </div>
          )
        ) : (
          <div className="text-center p-6 border-t border-gray-200 mt-8">
            <p className="text-lg text-gray-600">
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>{' '}
              to submit a rating and review for this property.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rating;
