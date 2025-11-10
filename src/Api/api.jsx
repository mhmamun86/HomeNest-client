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

export const fetchMyListing = async email => {
  try {
    const result = await api.get(`/my-listing?email=${email}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const insertListing = async data => {
  try {
    const res = await api.post('/listing', data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateListing = async (id, data) => {
  try {
    const result = await api.patch(`/my-listing/${id}`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteListing = async id => {
  try {
    const result = await api.delete(`/my-listing/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
