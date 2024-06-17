import { useState } from "react";
import { getGeocode } from "../api/service";
import { editShop } from "../api/util";

const url = import.meta.env.VITE_BASE_URL;

const EditShopForm = ({ shopData, handleClose, refreshShopData }) => {
  const [formData, setFormData] = useState({
    name: shopData.name,
    description: shopData.description,
    address: {
      street: shopData.address.street,
      city: shopData.address.city,
      state: shopData.address.state,
      zipcode: shopData.address.zipcode,
    },
    location: shopData.location,
    ratings: shopData.ratings,
    image: shopData.image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = await getGeocode({
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zipcode: formData.address.zipcode,
      });
  
      const editedShop = {
        name: formData.name,
        description: formData.description,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipcode: formData.address.zipcode,
        },
        location,
        image: formData.image
      };
      await editShop(url,shopData._id,editedShop)
      refreshShopData();
      handleClose();
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Shop</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.address.zipcode}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShopForm;
