import React, { useEffect, useState } from 'react';
import Spinner from '../../common/Spinner';
import { FaDollarSign, FaSearch } from 'react-icons/fa';

const SearchFilter = ({
  onFilterChange,
  categoriesData,
  priceRange,
  isFetching,
  sortBy,
}) => {
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: '',
    maxPrice: '',
    location: '',
    sort: sortBy,
  });
  useEffect(() => {
    setFilters(prev => ({ ...prev, sort: sortBy }));
  }, [sortBy]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  return (
    <div className="py-12 px-4 md:px-8 bg-base-200" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={e => e.preventDefault()}
          className="bg-base-100 p-6 md:p-8 rounded-xl shadow-2xl border-t-4 border-primary/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="form-control lg:col-span-2">
              <label className="label">
                <span className="label-text font-medium text-secondary">
                  Location / Address
                </span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter city, area, or zip code"
                className="input input-bordered w-full focus:border-primary focus:ring-primary"
                onChange={handleFilterChange}
                value={filters.location}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-secondary">
                  Property Type
                </span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full focus:border-primary focus:ring-primary"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                {categoriesData.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label flex items-center gap-1">
                <span className="label-text font-medium text-secondary">
                  Min Price
                </span>{' '}
                <FaDollarSign className="w-4 h-4 text-gray-500" />
              </label>
              <input
                type="number"
                name="minPrice"
                placeholder={`Min (${priceRange?.minPrice || 0})`}
                className="input input-bordered w-full focus:border-primary focus:ring-primary"
                onChange={handleFilterChange}
                min="0"
                value={filters.minPrice}
              />
            </div>

            <div className="form-control">
              <label className="label flex items-center gap-1">
                <span className="label-text font-medium text-secondary">
                  Max Price
                </span>{' '}
                <FaDollarSign className="w-4 h-4 text-gray-500" />
              </label>
              <input
                type="number"
                name="maxPrice"
                placeholder={`Min (${priceRange?.maxPrice || 0})`}
                className="input input-bordered w-full focus:border-primary focus:ring-primary"
                onChange={handleFilterChange}
                value={filters.maxPrice}
              />
            </div>
          </div>

          <div className="mt-6 ">
            {isFetching ? (
              <label className="btn btn-primary btn-lg w-full md:w-1/3 mx-auto font-semibold transition duration-300 flex items-center gap-2">
                <span className="loading loading-spinner"></span>
                Searching....
              </label>
            ) : (
              <label className="btn btn-primary btn-lg w-full md:w-1/3 mx-auto font-semibold transition duration-300 flex items-center gap-2">
                <FaSearch className="w-5 h-5" />
                Search Listings
              </label>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;
