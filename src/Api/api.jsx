import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchFeaturedListing = async () => {
  const res = await api.get('/listing');
  return res.status === 200 ? res.data : [];
};
