import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import SearchFilter from './Search';
import { useQuery } from '@tanstack/react-query';
import {
  getCategories,
  getFilteredListings,
  getPriceRange,
} from '../../../Api/api';
import Spinner from '../../common/Spinner';
import PropertiesCard from './PropertiesCard';
import { AuthContext } from '../../../contexts/AuthContext';
import Heading from '../../common/Heading';
import MyListingSkeleton from '../../common/MyListingSkeleton';
import { toast } from 'react-toastify';
import useTitle from '../../../Hooks/useTitle';

const Properties = () => {
  useTitle('Properties');
  const { user } = useContext(AuthContext);
  const [sortBy, setSortBy] = useState('Default');

  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: '',
    maxPrice: '',
    location: '',
    sort: sortBy,
  });
  useEffect(() => {
    const update = { ...filters, sort: sortBy };
    setFilters(update);
  }, [sortBy]);
  const handleFilterChange = e => {
    const { value } = e.target;
    setSortBy(value);
  };

  const { data: categoriesData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: priceRange } = useQuery({
    queryKey: ['price-range'],
    queryFn: getPriceRange,
  });

  const {
    data: listings = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['listings', filters],
    queryFn: () => getFilteredListings(filters),
    onError: err => {
      toast.error(err.message || 'Something went wrong!');
    },
  });

  return (
    <div className=" max-w-7xl mx-auto bg-base-200">
      <div className="mt-10">
        <Heading
          title={'All Available'}
          highlight={'Properties'}
          subtitle={
            ' Browse the complete list of rentals, sales, and commercial listings.'
          }
        ></Heading>
        <SearchFilter
          onFilterChange={setFilters}
          categoriesData={categoriesData}
          priceRange={priceRange}
          isFetching={isFetching}
          sortBy={sortBy}
        ></SearchFilter>
      </div>

      <aside className="lg:col-span-3  mx-auto px-4 py-8 md:py-16">
        <div className="mb-8 px-4 py-2 flex flex-col md:flex-row justify-between items-center bg-base-200 rounded-xl shadow-2xl border-b-4 border-primary/100">
          <div>
            <h2 className="text-xl md:text-2xl mb-3.5 md:mb-0 text-secondary font-bold">
              Properties (<span>{listings.length}</span>)
            </h2>
          </div>
          <div className="flex items-center justify-end">
            <label className="label mr-5">
              <span className="label-text font-medium text-secondary">
                Sort By
              </span>
            </label>
            <select
              name="sort"
              className="select select-bordered w-2/3 focus:border-primary focus:ring-primary"
              defaultValue={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
        {isFetching || isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {Array.from({ length: 8 }).map((_, i) => (
              <MyListingSkeleton key={i} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 bg-base-200 min-h-[50vh]">
            <h2 className="text-4xl font-extrabold text-secondary md:text-5xl">
              No Properties <span className="text-error">Found</span>
            </h2>
            <p className="text-xl text-gray-600 my-4">
              There are no properties are added.
            </p>
            {user ? (
              <Link to="/add-property" className="btn btn-primary btn-lg">
                Add Your Property
              </Link>
            ) : (
              <div>
                <p className="text-gray-600 my-2">
                  Please login to add your propertie
                </p>{' '}
                <Link className="underline text-primary" to={'/login'}>
                  Login Here
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {listings.map(listing => (
              <PropertiesCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <div className="join">
            <button className="join-item btn btn-primary btn-outline">«</button>
            <button className="join-item btn btn-primary">Page 1</button>
            <button className="join-item btn btn-primary btn-outline">»</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Properties;
