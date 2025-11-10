import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { fetchMyListing } from '../../../Api/api';
import { AuthContext } from '../../../contexts/AuthContext';
import MyListingCard from './MyListingCard';
import MyListingSkeleton from '../../common/MyListingSkeleton';

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
  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Are you sure you want to delete "${name}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        toast.error(`Listing "${name}" has been deleted.`, {
          position: 'top-center',
        });
      }
    });
  };

  return (
    <div className="py-12 bg-base-200 min-h-screen" data-aos="fade-in">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-extrabold text-gray-800 md:text-5xl text-center mb-2">
          My <span className="text-primary">Properties</span>
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Manage and review all properties listed by **{user.displayName}**.
        </p>

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
              <MyListingCard
                key={listing._id}
                listing={listing}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperty;
