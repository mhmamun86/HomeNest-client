import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchFeaturedListing = async () => {
  const res = await api.get('/listing');
  return res.status === 200 ? res.data : [];
};

export const fetchMyListing = async email => {
  try {
    const result = await api.get(`/my-listing?email=${email}`);
    return result.status === 200 ? result.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const insertListing = async data => {
  try {
    const res = await api.post('/listing', data);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
