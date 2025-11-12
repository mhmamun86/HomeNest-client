import { Link } from 'react-router';
import Heading from '../../common/Heading';
import RatingCard from './RatingCard';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import MyReviewSkeleton from '../../common/Loader/MyReviewSkeleton';
import useTitle from '../../../Hooks/useTitle';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const MyRatings = () => {
  useTitle('My Ratings');
  const { user } = useContext(AuthContext);
  const secureApi = useAxiosSecure();
  const {
    data: userRatings,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['user-ratings', user.email],
    queryFn: async () => {
      try {
        const result = await secureApi.get(`/my-ratings?email=${user.email}`);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (userRatings?.length === 0) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 text-center">
        <Heading title={'My'} highlight={'Ratings'}></Heading>
        <div className="alert alert-warning shadow-lg mt-12 max-w-lg mx-auto">
          <FaStar className="w-6 h-6" />
          <span>You haven't submitted any reviews yet.</span>
        </div>
        <p className="mt-6 text-lg text-base-300">
          Find a property you've interacted with and share your feedback!
        </p>
        <Link to="/properties" className="btn btn-primary mt-6">
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-11/12 mx-auto px-4 py-16">
      <Heading
        title={'My Ratings'}
        highlight={'& Feedback'}
        subtitle={
          'Manage all your submitted reviews for properties on HomeNest.'
        }
      ></Heading>
      <div className=" max-w-4xl mx-auto">
        {isFetching || isLoading ? (
          <div>
            {Array.from({ length: 4 }).map((_, i) => (
              <MyReviewSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {userRatings?.map(rating => (
              <RatingCard key={rating._id} rating={rating} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;
