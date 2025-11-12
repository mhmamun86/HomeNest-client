import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import Spinner from '../../common/Spinner';
import { QueryClient, useMutation } from '@tanstack/react-query';

import useTitle from '../../../Hooks/useTitle';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const AddProperty = () => {
  useTitle('Add Property');
  const [form, setForm] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const secureApi = useAxiosSecure();
  if (loading) {
    return <Spinner></Spinner>;
  }
  const categories = [
    'Rent',
    'Sale',
    'Commercial',
    'Land',
    'Short-Term Rental',
  ];

  const insertData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.post('/listing', data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data, insertedData) => {
      // console.log(data, insertedData);
      if (data.insertedId) {
        toast.success('Property Added Successfull');
        form.target.reset();
        Swal.fire({
          title: `"${insertedData.propertyName}" Property Added Success `,
          text: 'See in my property page!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Procced',
          cancelButtonText: 'Add Another One',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/my-properties');
          }
        });
      }
    },
  });

  const handleSubmitListing = e => {
    e.preventDefault();
    setForm(e);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const finalData = {
      ...data,
      price: Number(data.price),
      createdAt: new Date().toISOString(),
    };
    insertData.mutate(finalData);
  };

  return (
    <div className="py-12 bg-base-200 min-h-screen" data-aos="fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-base-100 p-8 md:p-12 rounded-lg shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold md:text-4xl text-secondary text-center mb-2">
            Add Your <span className="text-primary">Property Listing</span>
          </h2>
          <p className="text-center text-base-300 mb-10 text-lg">
            Fill out the details below to list your property for rent or sale.
          </p>
          <form onSubmit={handleSubmitListing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-accent/30 p-4 rounded-lg">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-secondary">
                    Owner Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-secondary">
                    Owner Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-secondary">
                  Property Name
                </span>
              </label>
              <input
                type="text"
                name="propertyName"
                placeholder="e.g., Luxury Condo, Vintage Home"
                className="input input-bordered border-gray-200 text-neutral w-full focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-secondary">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a detailed description of the property, features, and amenities..."
                className="textarea border-gray-200 text-neutral textarea-bordered h-32 w-full focus:border-primary focus:ring-primary"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-secondary">
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  className="select select-bordered  border-gray-200 text-neutral w-full focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-secondary">
                    Price (USD)
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 550000 or 2500"
                  className="input input-bordered w-full focus:border-primary border-gray-200 text-neutral focus:ring-primary"
                  required
                  min="100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-secondary">
                    Location / Address
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Area, or Full Address"
                  className="input border-gray-200 text-neutral input-bordered w-full focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-secondary">
                  Property Image Link (URL)
                </span>
              </label>
              <input
                type="url"
                name="imageLink"
                placeholder="https://placehold.co/800x600"
                className="input border-gray-200 text-neutral input-bordered w-full focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div className="form-control pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full text-lg font-semibold transition duration-300"
              >
                Add Property Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
