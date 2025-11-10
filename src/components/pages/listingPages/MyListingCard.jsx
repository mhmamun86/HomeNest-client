import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import { FaCircleInfo, FaLocationDot } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteListing, updateListing } from '../../../Api/api';
import Swal from 'sweetalert2';

const MyListingCard = ({ listing }) => {
  const id = listing._id;
  const navigate = useNavigate();
  const modalRef = useRef();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const formattedPrice =
    listing.category === 'Rental'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${listing.price.toLocaleString()}`;
  const posted = new Date(listing.createdAt).toLocaleDateString();

  const [formData, setFormData] = useState({
    propertyName: listing.propertyName,
    description: listing.description || '',
    category: listing.category,
    price: listing.price,
    location: listing.location,
    imageLink: listing.imageLink,
  });

  const categories = [
    'Rent',
    'Sale',
    'Commercial',
    'Land',
    'Short-Term Rental',
  ];
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateData = useMutation({
    mutationFn: data => updateListing(id, data),
    onSuccess: (data, postData) => {
      console.log(data, postData);
      queryClient.setQueryData(['my-listing'], oldData => {
        return oldData.map(el =>
          el._id === postData._id ? { ...el, ...postData } : el
        );
      });
      if (data.data.modifiedCount) {
        toast.success('Property Updated Successfull');
        modalRef.current.close();
      }
    },
  });
  const handleFormSubmit = e => {
    e.preventDefault();
    const updatedData = {
      ...listing,
      propertyName: formData.propertyName,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
      imageLink: formData.imageLink,
    };
    updateData.mutate(updatedData);
  };

  const deleteLM = useMutation({
    mutationFn: id => deleteListing(id),
    onSuccess: (res, data) => {
      console.log(data, res);
      queryClient.setQueryData(['my-listing'], prevData => {
        return prevData.filter(item => item._id !== data);
      });
      if (data.data.deletedCount) {
        toast.error(`Successfully deleted ${listing.propertyName}`);
      }
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete "${listing.propertyName}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteLM.mutate(id);
        toast.error(`Listing "${listing.propertyName}" has been deleted.`, {
          position: 'top-center',
        });
      }
    });
  };
  return (
    <div
      className="card w-full h-full bg-base-100 shadow-xl overflow-hidden border border-gray-200"
      data-aos="fade-up"
    >
      <figure className="aspect-video w-full">
        <img
          src={listing.imageLink}
          alt={listing.propertyName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-xl text-secondary mb-1">
            {listing.propertyName}
          </h2>
          <div className="badge badge-accent text-xs font-semibold uppercase mb-3">
            {listing.category}
          </div>

          <p className="text-lg font-bold text-primary mb-2 flex items-center gap-1">
            <FaDollarSign className="w-5 h-5 text-primary" />
            {formattedPrice}
          </p>

          <div className="text-gray-600 space-y-1 text-sm mb-4">
            <p className="flex items-center">
              <FaLocationDot className="w-4 h-4 mr-1 text-primary/70" />{' '}
              {listing.location}
            </p>
            <p className="font-medium">Posted: {posted}</p>
          </div>
        </div>

        <div className="card-actions justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
          <button
            className="btn btn-sm btn-outline btn-primary hover:bg-primary transition duration-300"
            onClick={() => navigate(`/propertie-details/${listing._id}`)}
          >
            <FaCircleInfo className="w-4 h-4" /> Details
          </button>
          <button
            className="btn btn-sm btn-primary transition duration-300"
            onClick={() => modalRef.current.showModal()}
          >
            <GrUpdate className="w-4 h-4" />
            Update
          </button>
          <button
            className="btn btn-sm btn-error transition duration-300"
            onClick={handleDelete}
          >
            <RiDeleteBin5Fill className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-3xl p-0 overflow-hidden">
          <div className="bg-base-100 p-8">
            <h3 className="font-bold text-2xl text-secondary mb-1">
              Update Listing:{' '}
              <span className="text-primary">{listing.propertyName}</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Review and edit your property details below.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-accent/30 p-3 rounded-lg">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-secondary">
                      Owner Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-sm input-bordered bg-gray-100 cursor-not-allowed"
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
                    value={user.email}
                    readOnly
                    className="input input-sm input-bordered bg-gray-100 cursor-not-allowed"
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
                  value={formData.propertyName}
                  onChange={handleChange}
                  placeholder="e.g., Luxury Condo"
                  className="input input-bordered w-full focus:border-primary focus:ring-primary"
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
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the property, features, and amenities..."
                  className="textarea textarea-bordered h-24 w-full focus:border-primary focus:ring-primary"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-secondary">
                      Category
                    </span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full focus:border-primary focus:ring-primary"
                    required
                  >
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
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 550000"
                    className="input input-bordered w-full focus:border-primary focus:ring-primary"
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
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Area, or Full Address"
                    className="input input-bordered w-full focus:border-primary focus:ring-primary"
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
                  value={formData.imageLink}
                  onChange={handleChange}
                  placeholder="https://placehold.co/800x600"
                  className="input input-bordered w-full focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="modal-action mt-6 flex justify-between w-full">
                <button
                  onClick={() => modalRef.current.close()}
                  type="button"
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary font-semibold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => modalRef.current.close()}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyListingCard;
