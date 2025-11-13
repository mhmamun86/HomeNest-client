import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useFormatePrice } from '@/Hooks/useFormatePrice';
import useTitle from '@/Hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { IoIosMailOpen } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router';
import Rating from '../ratingPages/Rating';
import { useFormateDate } from '@/Hooks/useFormateDate';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const secureApi = useAxiosSecure();
  const detailTextStyle = 'text-lg text-secondary font-semibold';
  const { data: property, isLoading } = useQuery({
    queryKey: ['listing-details'],
    queryFn: async () => {
      try {
        const result = await secureApi.get(`/listing/${id}`);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useTitle(property?.propertyName || 'Properties');
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-3 text-lg text-base-300">
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
        <p className="text-xl text-base-300 mt-4">
          The listing you are looking for does not exist or may have been sold.
        </p>
        <button
          className="btn btn-primary btn-lg mt-10"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-base-200 min-h-screen">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] md:grid-cols-1 max-w-11/12 mx-auto">
        <div className=" bg-base-200 p-4 rounded-lg shadow-sm overflow-hidden lg:self-start">
          <h1 className="text-xl md:text-2xl font-bold text-neutral mb-4 leading-snug">
            {property.propertyName}
            <span className="text-xs font-semibold bg-red-600 text-white px-2 py-0.5 ml-2 rounded">
              {property.category}
            </span>
          </h1>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="h-96 bg-gray-100 flex items-center justify-center text-neutral font-medium text-lg">
              <img
                className="h-full object-cover"
                src={property.imageLink}
                alt={property.propertyName}
              />
            </div>
          </div>

          <div
            className=" md:p-4 md:border md:border-gray-100 rounded-lg card-content "
            data-aos="fade-down"
          >
            <div className="flex flex-wrap flex-col gap-x-6 gap-y-3 text-lg font-medium text-base-300 mt-4  pb-4 mb-4">
              <p className="flex gap-2 items-center text-2xl font-bold text-green-600 ">
                <h2 className="text-neutral text-xl">Price: </h2>{' '}
                {useFormatePrice(property)}
              </p>
              <p className="flex gap-2 items-center">
                <h2 className="text-neutral font-bold">Location:</h2>
                {property.location}
              </p>
            </div>

            <div className=" py-3 mb-6 border-y border-gray-200 ">
              <h2 className="text-2xl font-bold text-secondary ">
                Description
              </h2>
              <p className="text-base-300 leading-relaxed text-base">
                {property.description}
              </p>
            </div>

            <div
              className="lg:col-span-2 py-3 border-b border-gray-100"
              data-aos="fade-down"
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
                  <p className="text-sm font-medium text-gray-500">
                    Posted Date
                  </p>
                  <p className={detailTextStyle + ' flex items-center'}>
                    <FaCalendarDays className="w-5 h-5 mr-1 text-primary/80" />{' '}
                    {useFormateDate(property)}
                  </p>
                </div>

                <div className="max-w-full">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p
                    className={`${detailTextStyle} break-words whitespace-normal`}
                  >
                    {property.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Area</p>
                  <p className={detailTextStyle}>
                    {(Math.floor(Math.random() * 1000) + 1500).toLocaleString()}{' '}
                    sqft
                  </p>
                </div>
              </div>
            </div>
            <div className="share-section text-center py-4 border-b border-gray-100">
              <p className="text-base-300 mb-3">Share this ad</p>
              <div className="social-links flex justify-center space-x-4">
                <span className="icon bg-blue-700 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80">
                  f
                </span>
                <span className="icon bg-blue-400 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80">
                  X
                </span>
                <span className="icon bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80">
                  W
                </span>
              </div>
            </div>
            <div>
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

        <div className="sidebar space-y-6">
          <div className=" bg-base-200 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-neutral text-md mb-4 border-b pb-2">
              Property Owner Details
            </h3>

            <div className=" flex flex-col items-center text-center">
              <div className=" w-16 mb-2 rounded-full">
                <img
                  className="rounded-full"
                  src={`https://i.pravatar.cc/150?u=${property._id}`}
                  alt={property.name}
                />
              </div>
              <p className="company-name font-bold text-neutral">
                {property.name}
              </p>

              <div className="phone-display bg-success-50 border border-green-300 p-3 rounded-lg w-full mb-4">
                <p className="text-sm text-neutral flex items-center justify-center mt-1">
                  <IoIosMailOpen className="w-4 h-4 mr-1" /> {property.email}
                </p>
              </div>
              <button className="btn w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200 text-sm">
                Contact {property.name}
              </button>
            </div>

            <Rating property={property}></Rating>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
