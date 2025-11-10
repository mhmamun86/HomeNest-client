import { useQuery } from '@tanstack/react-query';
import { FaDollarSign } from 'react-icons/fa';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { IoIosMailOpen } from 'react-icons/io';
import { useParams } from 'react-router';
import { fetchListingDetails } from '../../../Api/api';
import Rating from '../ratingPages/Rating';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { data: property, isLoading } = useQuery({
    queryKey: ['listing-details'],
    queryFn: () => fetchListingDetails(id),
  });
  console.log(property);
  const detailTextStyle = 'text-lg text-secondary font-semibold';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-3 text-lg text-gray-700">
          Loading Property Details...
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20 bg-base-200 min-h-[50vh]">
        <h2 className="text-4xl font-extrabold text-secondary md:text-5xl">
          Property <span className="text-error">Not Found</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4">
          The listing you are looking for does not exist or may have been sold.
        </p>
      </div>
    );
  }

  const formattedPrice = property.category.includes('Rental')
    ? `$${property.price.toLocaleString()}/mo`
    : `$${property.price.toLocaleString()}`;

  const postedDate = new Date(property.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="py-12 bg-base-200" data-aos="fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden mb-8 border border-gray-200">
          <figure className="w-full h-[30vh] md:h-[50vh] relative">
            <img
              src={property.imageLink}
              alt={property.propertyName}
              className="w-full h-full object-cover"
              onError={e => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/1200x600/cccccc/000000?text=Image+Unavailable';
              }}
            />
            <div className="absolute top-0 left-0 bg-secondary/80 text-white p-3 rounded-br-lg font-semibold text-lg">
              {property.category}
            </div>
          </figure>
          <div className="p-6 md:p-10">
            <h1 className="text-4xl font-extrabold text-secondary md:text-5xl mb-2">
              {property.propertyName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-medium text-gray-700 mt-4 border-b pb-4 mb-4">
              <p className="flex items-center text-2xl font-bold text-primary">
                <FaDollarSign className="w-6 h-6 mr-2" /> {formattedPrice}
              </p>
              <p className="flex items-center">
                <FaLocationDot className="w-5 h-5 mr-1 text-primary/80" />{' '}
                {property.location}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-secondary mt-6 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {property.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            className="lg:col-span-1 bg-base-100 p-6 rounded-xl shadow-lg border border-primary/20 h-fit"
            data-aos="fade-left"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Posted By</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <p className={detailTextStyle}>{property.name}</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <IoIosMailOpen className="w-4 h-4 mr-1" /> {property.email}
                </p>
              </div>
            </div>
            <div className="divider my-4"></div>
            <button className="btn btn-primary w-full">
              Contact {property.name}
            </button>
          </div>
          <div
            className="lg:col-span-2 bg-base-100 p-6 rounded-xl shadow-lg border border-gray-200"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Key Information
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className={detailTextStyle}>{property.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className={detailTextStyle + ' flex items-center'}>
                  <FaDollarSign className="w-5 h-5 mr-1 text-primary/80" />{' '}
                  {property.price}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Posted Date</p>
                <p className={detailTextStyle + ' flex items-center'}>
                  <FaCalendarDays className="w-5 h-5 mr-1 text-primary/80" />{' '}
                  {postedDate}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className={detailTextStyle}>{property.location}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Area</p>
                <p className={detailTextStyle}>
                  {(Math.floor(Math.random() * 1000) + 1500).toLocaleString()}{' '}
                  sqft
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-secondary mt-8 mb-4">
              Legal Disclaimer
            </h3>
            <p className="text-sm text-gray-500 italic">
              All measurements and information are approximate and must be
              verified by the buyer/renter through personal inspection or with
              their legal representative. HomeNest takes no responsibility for
              inaccuracies.
            </p>
          </div>
        </div>
      </div>
      <Rating property={property}></Rating>
    </div>
  );
};

export default PropertyDetailsPage;
