import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchFeaturedListing = async () => {
  try {
    const res = await api.get('/featured-listing');
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchRatings = async id => {
  try {
    const result = await api.get(`/ratings/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

export const getPriceRange = async () => {
  const { data } = await api.get('/price-range');
  return data;
};

// get all property with search functionality and pagination support
export const getFilteredListings = async filters => {
  try {
    const params = new URLSearchParams();
    params.append('_start', filters._start);
    params.append('_limit', 9);
    if (filters.category && filters.category !== 'All')
      params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.propertyName)
      params.append('propertyName', filters.propertyName);
    if (filters.sort) params.append('sort', filters.sort);

    // console.log(params.toString());
    const { data } = await api.get(`/listings?${params.toString()}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default api;
