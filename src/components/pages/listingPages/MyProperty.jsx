import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { fetchMyListing } from '../../../Api/api';
import { AuthContext } from '../../../contexts/AuthContext';
import MyListingCard from './MyListingCard';
import MyListingSkeleton from '../../common/MyListingSkeleton';
import Heading from '../../common/Heading';

const MyProperty = () => {
  const { user } = useContext(AuthContext);
  const { data: myListings = [], isLoading } = useQuery({
    queryKey: ['my-listing'],
    queryFn: () => fetchMyListing(user.email),
  });
  console.log(myListings);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {Array.from({ length: 6 }).map((_, i) => (
          <MyListingSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <Heading
          title={'My'}
          highlight={'Properties'}
          subtitle={'Manage and review all properties listed by'}
          showUser={true}
        ></Heading>

        {myListings?.length === 0 ? (
          <div className="text-center p-20 bg-base-100 rounded-lg shadow-inner">
            <p className="text-xl text-gray-500 mb-6">
              You currently have no properties listed.
            </p>
            <Link to="/add-property" className="btn btn-primary btn-lg">
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {myListings?.map(listing => (
              <MyListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperty;
