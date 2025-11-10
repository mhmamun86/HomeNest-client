import React from 'react';

const MyListingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-4">
      <div className="bg-gray-300 h-48 w-full rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
      <div className="flex justify-between gap-2">
        <div className="h-4 w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default MyListingSkeleton;
