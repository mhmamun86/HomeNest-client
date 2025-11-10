import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Heading from '../../common/Heading';
import RatingCard from './RatingCard';

const IconStar = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);
const IconEdit = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
    />
  </svg>
);
const IconDelete = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);
// --- END MOCK ICONS ---

// Mock Auth Context (Simulating user ID fetch)
const useAuth = () => ({
  user: {
    isLoggedIn: true,
    displayName: 'Reviewer Jane',
    userId: 'user_001',
  },
});

// --- DUMMY RATINGS DATA ---
const mockRatingsData = [
  {
    id: 101,
    propertyId: 5,
    propertyName: 'Riverside Townhome',
    reviewerId: 'user_001', // This user's rating
    reviewerName: 'Reviewer Jane',
    rating: 5,
    reviewText:
      "Absolutely stunning location and the management was incredibly helpful during move-in. The best rental I've ever had!",
    reviewDate: '2025-10-25',
    propertyImg: 'https://placehold.co/100x70/10B981/ffffff?text=TOWN',
  },
  {
    id: 102,
    propertyId: 2,
    propertyName: 'Suburban Family Home',
    reviewerId: 'user_001', // This user's rating
    reviewerName: 'Reviewer Jane',
    rating: 4,
    reviewText:
      'Great backyard for the kids and a very quiet street. House itself is solid, but could use a few minor cosmetic updates.',
    reviewDate: '2025-10-10',
    propertyImg: 'https://placehold.co/100x70/3B82F6/ffffff?text=HOME',
  },
  {
    id: 103,
    propertyId: 6,
    propertyName: 'Skyline Penthouse',
    reviewerId: 'user_999', // Another user's rating
    reviewerName: 'Non-User Reviewer',
    rating: 3,
    reviewText:
      'View is amazing, but the price is a bit high for the maintenance level. Good, but not perfect.',
    reviewDate: '2025-09-01',
    propertyImg: 'https://placehold.co/100x70/22C55E/ffffff?text=PENT',
  },
];
// ----------------------------

// --- MY RATINGS PAGE COMPONENT ---
const MyRatings = () => {
  const { user } = useAuth();
  const userRatings = mockRatingsData.filter(r => r.reviewerId === user.userId);
  const mainHeadingStyle =
    'text-4xl md:text-5xl font-extrabold text-secondary text-center mb-4';
  const highlightStyle = 'text-primary';
  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c', // Sage Green
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      // Replace with actual API call to delete rating
      console.log(`Deleting rating ID: ${id}`);
      toast.success('Rating successfully deleted!');
      // Refresh state/data here
    }
  };

  const handleUpdate = rating => {
    toast.info(`Updating review for: ${rating.propertyName}`);
    console.log('Opening update modal for rating:', rating);
  };

  if (userRatings.length === 0) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 text-center">
        <h2 className={mainHeadingStyle}>
          My <span className={highlightStyle}>Ratings</span>
        </h2>
        <div className="alert alert-warning shadow-lg mt-12 max-w-lg mx-auto">
          <IconStar className="w-6 h-6" />
          <span>You haven't submitted any reviews yet.</span>
        </div>
        <p className="mt-6 text-lg text-gray-600">
          Find a property you've interacted with and share your feedback!
        </p>
        <Link to="/properties" className="btn btn-primary mt-6">
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <Heading
        title={'My Ratings'}
        highlight={'& Feedback'}
        subtitle={
          'Manage all your submitted reviews for properties on HomeNest.'
        }
      ></Heading>

      <div className="space-y-8 max-w-4xl mx-auto">
        {userRatings.map(rating => (
          <RatingCard
            key={rating.id}
            rating={rating}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
